using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class Details
    {
        public class Query : IRequest<TransactionDto>
        {
            public Guid CliedId { get; set; }
            public Guid TransactionId { get; set; }
        }

        public class Handler : IRequestHandler<Query, TransactionDto>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<TransactionDto> Handle(Query request, 
                CancellationToken cancellationToken)
            {
                var client = await _context.Clients.FindAsync(request.CliedId);

                var transaction = client.Transactions.FirstOrDefault(t => t.Id == request.TransactionId);

                var salesManager = await _context.Users.FirstOrDefaultAsync(sm => sm.Id == transaction.SalesManagerId.ToString("D"));

                var salesAgent = await _context.Users.FirstOrDefaultAsync(sa => sa.Id == transaction.SalesAgentId.ToString("D"));

                var propertytype = await _context.PropertyTypes.FirstOrDefaultAsync(
                        x => x.Properties.Any(p => p.Id == transaction.Property.Id)
                    );

                var transactionDto = new TransactionDto
                {
                    Id = transaction.Id,
                    ClientName = $"{client.FirstName} {client.LastName} {client.Suffix}",
                    SequenceNo = transaction.SequenceNo,
                    ContractPrice = transaction.ContractPrice,
                    Balance = transaction.ContractPrice - transaction.Payments.Select(p => p.Amount).Sum(),
                    MonthlyAmortization = transaction.MonthlyAmortization,
                    Terms = transaction.Terms,
                    Status = transaction.Status,
                    CreatedAt = transaction.CreatedAt,

                    Property = transaction.Property,
                    PropertyTypeName = propertytype.Name,
                    Payments = transaction.Payments.OrderByDescending(x => x.DateOfPayment).ToList(),

                    SalesManager = salesManager != null ? new SalesManagerDto {
                        Id = salesManager.Id,
                        Name =  $"{salesManager.FirstName} {salesManager.LastName} {salesManager.Suffix}",
                        Image = salesManager.Photos.FirstOrDefault(x => x.IsMain)?.Url
                    } : null,

                    SalesAgent = salesAgent != null ? new SalesAgentDto {
                        Id = salesAgent.Id,
                        Name =  $"{salesAgent.FirstName} {salesAgent.LastName} {salesAgent.Suffix}",
                        Image = salesAgent.Photos.FirstOrDefault(x => x.IsMain)?.Url
                    } : null
                };

                return transactionDto;

            }
        }
    }
}