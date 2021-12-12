using System;
using System.Collections.Generic;
using System.Linq;
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

namespace Application.Transactions
{
    public class Create
    {
        public class Command : IRequest
        {
            public DateTime CreatedAt { get; set; }
            public Guid SalesManagerId { get; set; }
            public Guid SalesAgentId { get; set; }
            public Guid PropertyId { get; set; }
            public Guid PropertyTypeId { get; set; }
            public Guid ClientId { get; set; }
            public float ContractPrice { get; set; }
            public float MonthlyAmortization { get; set; }
            public float Terms { get; set; }
            public string Status { get; set; }
            public string Network { get; set; }

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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
                    CancellationToken cancellationToken)
            {
                // var propertyType = await _context.PropertyTypes.FindAsync(request.PropertyTypeId);

                // Check if Client Exists
                var client = await _context.Clients.FindAsync(request.ClientId);

                if (client == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Client = "Not Found" });

                // Gets the current User
                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                // Check if Property Exists
                var property = await _context.Properties.FindAsync(request.PropertyId);

                if (property == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Property = "Not Found" });
                
                if (property.Status == "Available")
                {
                    var transactions = await _context.Transactions
                        .AsNoTracking()
                        .ToListAsync();
                    
                    // Get Last Transaction Number
                    var seqNo = transactions.Count == 0 ? 1 : transactions.Max(t => t.SequenceNo) + 1;

                    var transaction = new Transaction
                    {
                        Id = Guid.NewGuid(),
                        SequenceNo = seqNo,
                        ContractPrice = request.ContractPrice,
                        MonthlyAmortization = request.MonthlyAmortization,
                        Terms = request.Terms,
                        Status = "On Going",
                        Property = property,
                        SalesManagerId = request.SalesManagerId,
                        SalesAgentId = request.SalesAgentId,
                        CreatedAt = request.CreatedAt.AddDays(1),
                        // Network = request.Network
                    };

                    // Change Property status to Reserved
                    if (property.Status == "Available")
                        property.Status = "Reserved";

                    //
                    client.Transactions.Add(transaction);

                    //
                    user.Transactions.Add(transaction);

                    // _context.Transactions.Add(transaction);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }
        }

    }
}