using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
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
            // public string Image { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x =>x.Name).NotEmpty();
                RuleFor(x =>x.Description).NotEmpty();
                RuleFor(x =>x.Location).NotEmpty();
                // RuleFor(x =>x.Image).NotEmpty();
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
                    var propertyType = await _context.PropertyTypes.FindAsync(request.Id);

                    if (propertyType == null)
                        throw new RestException(HttpStatusCode.NotFound, new {propertyType = "Not Found"});

                    propertyType.Name = request.Name ?? propertyType.Name;
                    propertyType.Description = request.Description ?? propertyType.Description;
                    propertyType.Location = request.Location ?? propertyType.Location;

                    var success = await _context.SaveChangesAsync() > 0;

                    if (success) return Unit.Value;

                    throw new Exception("Problem Saving Changes");
            }
        }

    }
}