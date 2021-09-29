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

namespace Application.LandingPhotos
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string IsMain { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x =>x.Name).NotEmpty();
                RuleFor(x =>x.Description).NotEmpty();
                RuleFor(x => x.IsMain).NotEmpty();
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
                    var landingPhoto = await _context.LandingPhotos.FindAsync(request.Id);

                    if (landingPhoto == null)
                        throw new RestException(HttpStatusCode.NotFound, new {landingPhoto = "Not Found"});

                    landingPhoto.Name = request.Name ?? landingPhoto.Name;
                    landingPhoto.Description = request.Description ?? landingPhoto.Description;
                    landingPhoto.IsMain = request.IsMain ?? landingPhoto.IsMain;

                    var success = await _context.SaveChangesAsync() > 0;

                    if (success) return Unit.Value;

                    throw new Exception("Problem Saving Changes");
            }
        }

    }
}