using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.PropertyTypes
{
    public class List
    {
        public class Query : IRequest<List<PropertyType>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<PropertyType>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<PropertyType>> Handle(Query request, 
                CancellationToken cancellationToken)
            {
                var propertyType = await _context.PropertyTypes
                    .ToListAsync();

                return propertyType;
            }
        }



    }
}