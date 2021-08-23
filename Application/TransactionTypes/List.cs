using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TransactionTypes
{
    public class List
    {
        public class Query: IRequest<List<TransactionType>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<TransactionType>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<TransactionType>> Handle(Query request,
                CancellationToken cancellationToken)
                {
                    var TransactionType = await _context.TransactionTypes
                        .ToListAsync();

                    return TransactionType;
                }
        }
    }
}