using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LandingPhotos
{
    public class Create
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
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.IsMain).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var landingPhoto = new LandingPhoto
                {
                    Id = request.Id,
                    Name = request.Name,
                    Description = request.Description,
                    Url = "https://www.camella.com.ph/wp-content/uploads/2020/06/Website_Camella-Homes-Series_Cara-592x444.jpg",
                    IsMain = request.IsMain
                };

                _context.LandingPhotos.Add(landingPhoto);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}