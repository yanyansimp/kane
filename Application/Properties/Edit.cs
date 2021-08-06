using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
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
            // public string Image { get; set; }
            public string Status { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x =>x.Name).NotEmpty();
                RuleFor(x =>x.Description).NotEmpty();
                RuleFor(x =>x.Location).NotEmpty();
                // RuleFor(x =>x.Image).NotEmpty();
                RuleFor(x =>x.Status).NotEmpty();
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
                    var property = await _context.Properties.FindAsync(request.Id);

                    if (property == null)
                        throw new RestException(HttpStatusCode.NotFound, new {property = "Not Found"});

                    property.Name = request.Name ?? property.Name;
                    property.Description = request.Description ?? property.Description;
                    property.Location = request.Location ?? property.Location;
                    property.Status = request.Status ?? property.Status;

                    var success = await _context.SaveChangesAsync() > 0;

                    if (success) return Unit.Value;

                    throw new Exception("Problem Saving Changes");
            }
        }

    }
}