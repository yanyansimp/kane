using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Transactions
{
    public class Edit
    {
        public class Command : IRequest
        {
            public DateTime CreatedAt { get; set; }
            public Guid ClientId { get; set; }
            public Guid TransactionId { get; set; }
            public Guid SalesManagerId { get; set; }
            public Guid SalesAgentId { get; set; }
            public Guid PropertyId { get; set; }
            public Guid NewPropertyId { get; set; }
            public float ContractPrice { get; set; }
            public float MonthlyAmortization { get; set; }
            public float Terms { get; set; }
            public string Status { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // Butangi second layer sa validation badi
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
                //handler logic
                var transaction = await _context.Transactions.FindAsync(request.TransactionId);

                if (transaction == null)
                    throw new RestException(HttpStatusCode.NotFound, new {transaction = "Not Found"});
                
                var property = await _context.Properties.FindAsync(request.PropertyId);

                if (property == null)
                    throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });

                if (request.NewPropertyId != null)
                {
                    property.Status = "Available";

                    var newProperty = await _context.Properties.FindAsync(request.NewPropertyId);

                    if (newProperty == null)
                        throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });

                    if (newProperty.Status == "Available")
                    {
                        transaction.Property = newProperty;
                        newProperty.Status = "Reserved";
                    }
                }

                transaction.CreatedAt =  
                    request.CreatedAt != null ? request.CreatedAt.AddDays(1) : transaction.CreatedAt;
                    
                transaction.ContractPrice = 
                    request.ContractPrice != transaction.ContractPrice ? request.ContractPrice : transaction.ContractPrice;
                
                transaction.MonthlyAmortization = 
                    request.MonthlyAmortization != transaction.MonthlyAmortization ? request.MonthlyAmortization : transaction.MonthlyAmortization;

                transaction.Terms = 
                    request.Terms != transaction.Terms ? request.Terms : transaction.Terms;

                transaction.Status = request.Status ?? transaction.Status;
                // transaction.SalesManagerId = request.SalesManagerId ?? transaction.SalesManagerId;
                // transaction.Network = request.Network ?? transaction.Network;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}