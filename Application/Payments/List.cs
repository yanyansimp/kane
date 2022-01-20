using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Payments.Dtos;
using Persistence;
using System.Linq;

namespace Application.Payments
{
    public class List
    {
        public class Query : IRequest<List<PaymentDto>>
        {
            public Query(string keyWord)
            {
                KeyWord = keyWord;
            }

            public string KeyWord { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<PaymentDto>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<PaymentDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {

                // var payments = await _context.Payments
                //     .AsNoTracking()
                //     .ToListAsync();

                var clients = request.KeyWord != null ?
                    await _context.Clients
                        .Where(x => 
                            x.LastName.Contains(request.KeyWord) ||
                            x.FirstName.Contains(request.KeyWord) ||
                            x.MiddleName.Contains(request.KeyWord)).ToListAsync() 
                        :
                    await _context.Clients
                        .ToListAsync();

                // var payments = await (from payment in _context.Payments
                //     join client in _context.Clients on payment.ClientId equals client.Id
                //     select new PaymentDto 
                //         {
                //             Id = payment.Id
                //         }
                //     )
                //     .AsNoTracking()
                //     .ToListAsync();

                // var payments = await clients.Transactions
                //     .Select(p => p.Payments
                    
                //     ).ToListAsync();

                // var payments = await clients
                //     .Select(t => t.Transactions)
                //     .ToListAsync();

                List<PaymentDto> payments = new List<PaymentDto>();

                foreach (var client in clients)
                {
                    if (client.Transactions != null) 
                    {
                        foreach (var transaction in client.Transactions)
                        {
                            var propertytype = await _context.PropertyTypes
                                .FirstOrDefaultAsync(
                                    x => x.Properties
                                        .Any(pp => pp.Id == transaction.Property.Id)
                                );

                            var totalpayment = transaction.Payments
                                .Select(a => a.Amount).Sum();

                            foreach (var payment in transaction.Payments)
                            {
                                payments.Add(new PaymentDto 
                                {
                                    Id = payment.Id,
                                    SequenceNo = payment.SequenceNo,
                                    ARNumber = payment.ORNumber,
                                    Name = $"{client.LastName}, {client.FirstName}",
                                    PropertyName = $"{propertytype.Name} - {transaction.Property.Name}",
                                    ContractPrice = transaction.ContractPrice,
                                    Balance = transaction.ContractPrice - totalpayment,
                                    AmountPaid = payment.Amount,
                                    Type = payment.TypeOfPayment,
                                    Mode = payment.ModeOfPayment,
                                    Date = payment.DateOfPayment
                                });
                            }
                        }
                    }
                }
                
                var p = payments
                    .OrderByDescending(x => x.Date)
                    .Take(15)
                    .ToList();

                return p;
            }
        }
    }
}