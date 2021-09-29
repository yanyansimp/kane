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

namespace Application.Properties
{
    public class Create
    {
        
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string Location { get; set; }
            public string Status { get; set; }
            public Guid PropertyTypeId { get; set; }
            public Photo Image { get; set; }
            
        }
       
       
    

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
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
                var property = new Property
                {
                    Id = request.Id,
                    Name = request.Name,
                    Description = request.Description,
                    Location = request.Location,
                    Image = new Photo {
                        Id =  request.Image.Id,
                        Url = request.Image.Url,
                        IsMain = true
                    },
                    Status = request.Status,
                };

                // Find PropertyType that the Property belongs 
                var propertyType = await _context.PropertyTypes.FindAsync(request.PropertyTypeId);
                
                // Check if the PropertyType is null/empty 
                if (propertyType == null)
                    throw new RestException(HttpStatusCode.NotFound, new {PrpertyType = "Not Found"});

                // If PropertyType is not null/empty, add the Property to the PropertyType
                propertyType.Properties.Add(property);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}