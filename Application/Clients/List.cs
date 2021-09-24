using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;


namespace Application.Clients
{
    public class List
    {
        public class Query : IRequest<List<Client>>
        {
            public Query(string keyWord)
            {
                KeyWord = keyWord;
            }

            public string KeyWord { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Client>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Client>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var queryable = _context.Clients
                    // .OrderByDescending(x => x.Transactions.FirstOrDefault().SequenceNo)
                    .OrderByDescending(x => x.Transactions.Select(t => t.SequenceNo).FirstOrDefault())
                    // .Take(10)
                    .AsQueryable();
                    // .Reverse();

                var clients = await queryable
                    // .Skip(Math.Max(0, queryable.Count() - 5)).Take(5)
                    // .Take(10)
                    .ToListAsync();

                if (clients == null)
                    throw new RestException(HttpStatusCode.NotFound, new { person = "Not Found" });

                return clients;
            }
        }
    }
}