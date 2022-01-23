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

                
                var clients = request.KeyWord != null ?
                    await _context.Clients
                        .Where(x => 
                            x.LastName.Contains(request.KeyWord) ||
                            x.FirstName.Contains(request.KeyWord) ||
                            x.MiddleName.Contains(request.KeyWord))
                        .ToListAsync() 
                        :
                    await _context.Clients
                        .OrderByDescending(x => x.CreatedAt)
                        //.Take(15)
                        .ToListAsync();


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
                
                var p = request.KeyWord != null ?
                        payments
                            .OrderByDescending(x => x.Date)
                            .ToList()
                            :
                        payments
                            .OrderByDescending(x => x.Date)
                            .Take(15)
                            .ToList();

                return p;
            }
        }
    }
}