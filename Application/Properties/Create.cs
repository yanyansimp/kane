using System;
using System.Threading;
using System.Threading.Tasks;
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
            public string name { get; set; }
            public string Description { get; set; }
            public string Location { get; set; }
            public string Status { get; set; }
            
        }
       
    

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
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
                    name = request.name,
                    Description = request.Description,
                    Location = request.Location,
                    Image = new Photo{
                        Id = request.Id.ToString(),
                        Url = "https://www.camella.com.ph/wp-content/uploads/2020/06/Website_Camella-Homes-Series_Cara-592x444.jpg",
                        IsMain = true
                    },
                    Status = request.Status,
                    

                };
                _context.Properties.Add(property);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}