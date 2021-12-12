using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Payments
{
    public class Details
    {
        public class Query : IRequest<Payment>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Payment>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Payment> Handle(Query request, CancellationToken cancellationToken)
            {
                var payment = await _context.Payments
                    .FindAsync(request.Id);

                if (payment == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });

                //var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return payment;
            }
        }
    }
}