using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties
{
    public class List
    {
        public class Query: IRequest<List<Property>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<Property>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Property>> Handle(Query request,
                CancellationToken cancellationToken)
                {
                    var property = await _context.Properties
                        .ToListAsync();

                    return property;
                }
        }
    }
}