using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Clients
{
    public class Details
    {
        public class Query : IRequest<Client>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Client>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Client> Handle(Query request, CancellationToken cancellationToken)
            {
                var client = await _context.Clients.FindAsync(request.Id);

                if (client.Transactions != null)
                {
                    foreach (var transaction in client.Transactions)
                    {
                        var propertytype = _context.PropertyTypes
                            .FirstOrDefault(
                                x => x.Properties
                                    .Any(pp => pp.Id == transaction.Property.Id)
                            );

                        transaction.Property.Name = $"{propertytype.Name} - { transaction.Property.Name}";
                    }
                }

                if (client == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Client = "Not Found" });
                
                return client;
            }
        }
    }
}