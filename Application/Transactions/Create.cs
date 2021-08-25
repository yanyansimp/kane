using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public Guid SalesManagerId { get; set; }
            public Guid SalesAgentId { get; set; }
            public Guid PropertyId { get; set; }
            public Guid PropertyTypeId { get; set; }
            public Guid ClientId { get; set; }
            public Transaction Transaction { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // To be added
                //
                //
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
                var propertyType = await _context.PropertyTypes.FindAsync(request.PropertyTypeId);

                var property = await _context.Properties.FindAsync(request.PropertyId);

                var client = await _context.Clients.FindAsync(request.ClientId);

                var transaction = new Transaction
                {
                    Id = request.Id,
                    ContractPrice = request.Transaction.ContractPrice,
                    MonthlyAmortization = request.Transaction.MonthlyAmortization,
                    Terms = request.Transaction.Terms,
                    Status = "Ongoing",
                    Property = property,
                    SalesManagerId = request.SalesManagerId,
                    SalesAgentId = request.SalesAgentId,
                    CreatedAt = DateTime.Now
                };

                _context.Transactions.Add(transaction);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) 
                    return Unit.Value;
                    
                throw new Exception("Problem saving changes");

            }
        }

    }
}