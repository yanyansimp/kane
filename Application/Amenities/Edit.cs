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

namespace Application.Amenities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x =>x.Name).NotEmpty();
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
                    var amenities = await _context.Amenities.FindAsync(request.Id);
                    if (amenities == null)
                        throw new RestException(HttpStatusCode.NotFound, new {amenities = "Not Found"});
                    amenities.Name = request.Name ?? amenities.Name;
                    amenities.Description = request.Description ?? amenities.Description;
                    
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success) return Unit.Value;
                    throw new Exception("Problem Saving Changes");
            }
        }

    }
}