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

namespace Application.PropertyTypes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string Location { get; set; }
            public Photo Image { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x =>x.Name).NotEmpty();
                RuleFor(x =>x.Description).NotEmpty();
                RuleFor(x =>x.Location).NotEmpty();
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
                    var propertyType = await _context.PropertyTypes.FindAsync(request.Id);

                    if (propertyType == null)
                        throw new RestException(HttpStatusCode.NotFound, new {propertyType = "Not Found"});

                    var image = await _context.Photos.FindAsync(propertyType.Image.Id);
                    _photoAccessor.DeletePhoto(propertyType.Image.Id);
                    _context.Remove(image);

                    propertyType.Name = request.Name ?? propertyType.Name;
                    propertyType.Description = request.Description ?? propertyType.Description;
                    propertyType.Location = request.Location ?? propertyType.Location;
                    propertyType.Image = new Photo {
                            Id =  request.Image.Id ?? propertyType.Image.Id,
                            Url = request.Image.Url ?? propertyType.Image.Url,
                            IsMain = true
                    };

                    var success = await _context.SaveChangesAsync() > 0;

                    if (success) return Unit.Value;

                    throw new Exception("Problem Saving Changes");
            }
        }

    }
}