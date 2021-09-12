using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;

namespace Application.LandingPhotos
{
    public class List
    {
        public class Query : IRequest<List<LandingPhoto>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<LandingPhoto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<LandingPhoto>> Handle(Query request, 
                CancellationToken cancellationToken)
            {
                var landingPhoto = await _context.LandingPhotos
                    .ToListAsync();
                return landingPhoto;
            }
        }



    }
}