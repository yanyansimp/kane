using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Amenities
{
    public class List
    {
        public class Query: IRequest<List<Amenity>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<Amenity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Amenity>> Handle(Query request,
                CancellationToken cancellationToken)
                {
                    var amenity = await _context.Amenities
                        .ToListAsync();

                    return amenity;
                }
        }
    }
}