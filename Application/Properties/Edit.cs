using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Properties
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string Location { get; set; }
            public string Status { get; set; }
            public Photo Image { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x =>x.Name).NotEmpty();
                RuleFor(x =>x.Description).NotEmpty();
                RuleFor(x =>x.Location).NotEmpty();
                RuleFor(x =>x.Status).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command>
        {
             private readonly DataContext _context;
             private readonly IPhotoAccessor _photoAccessor;
             public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }
            
            public async Task<Unit> Handle(Command request, 
                CancellationToken cancellationToken)
                {
                    var property = await _context.Properties.FindAsync(request.Id);
                    if (property == null)
                        throw new RestException(HttpStatusCode.NotFound, new {property = "Not Found"});
                    var image = await _context.Photos.FindAsync(property.Image.Id);
                    _photoAccessor.DeletePhoto(property.Image.Id);
                    _context.Remove(image);
                    property.Name = request.Name ?? property.Name;
                    property.Description = request.Description ?? property.Description;
                    property.Location = request.Location ?? property.Location;
                    property.Status = request.Status ?? property.Status;
                    property.Image = new Photo {
                            Id =  request.Image.Id ?? property.Image.Id,
                            Url = request.Image.Url ?? property.Image.Url,
                            IsMain = true
                        };
                    
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success) return Unit.Value;
                    throw new Exception("Problem Saving Changes");
            }
        }

    }
}