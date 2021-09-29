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

                var salesAgent = await _context.Users.FirstOrDefaultAsync(sa => sa.Id == transaction.SalesManagerId.ToString("D"));

                var transactionDto = new TransactionDto
                {
                    Id = transaction.Id,
                    PropertyTypeName = "Regatta East Valley",
                    ClientName = $"{client.FirstName} {client.MiddleName.Substring(0, 1)}. {client.LastName} {client.Suffix}",
                    SequenceNo = transaction.SequenceNo,
                    ContractPrice = transaction.ContractPrice,
                    Balance = transaction.ContractPrice - transaction.Payments.Select(p => p.Amount).Sum(),
                    MonthlyAmortization = transaction.MonthlyAmortization,
                    Terms = transaction.Terms,
                    Status = transaction.Status,
                    CreatedAt = transaction.CreatedAt,

                    Property = transaction.Property,
                    Payments = transaction.Payments,

                    SalesManager = salesManager != null ? new SalesManagerDto {
                        Id = salesManager.Id,
                        Name =  $"{salesManager.FirstName} {salesManager.MiddleName.Substring(0, 1)}. {salesManager.LastName} {salesManager.Suffix}",
                        Image = salesManager.Photos.FirstOrDefault(x => x.IsMain)?.Url
                    } : null,

                    SalesAgent = salesAgent != null ? new SalesAgentDto {
                        Id = salesAgent.Id,
                        Name =  $"{salesAgent.FirstName} {salesAgent.MiddleName.Substring(0, 1)}. {salesAgent.LastName} {salesAgent.Suffix}",
                        Image = salesAgent.Photos.FirstOrDefault(x => x.IsMain)?.Url
                    } : null
                };

                return transactionDto;

            }
        }
    }
}