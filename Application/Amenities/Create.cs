using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Amenities
{
    public class Create
    {
        
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public Guid PropertyTypeId { get; set; }
            
        }
       
       
    

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.PropertyTypeId).NotEmpty();
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
                var amenity = new Amenity
                {
                    Id = request.Id,
                    Name = request.Name,
                    Description = request.Description,
                };

                // Find PropertyType that the Property belongs 
                var propertyType = await _context.PropertyTypes.FindAsync(request.PropertyTypeId);
                
                // Check if the PropertyType is null/empty 
                if (propertyType == null)
                    throw new RestException(HttpStatusCode.NotFound, new {PrpertyType = "Not Found"});

                // If PropertyType is not null/empty, add the Property to the PropertyType
                propertyType.Amenities.Add(amenity);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}