using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                var client = await _context.Clients.FindAsync(request.Id);

                if (client == null)
                    throw new RestException(HttpStatusCode.NotFound, new {property = "Not Found"});
                
                if (client.Transactions != null)
                {
                    foreach (var tran in client.Transactions)
                    {
                        var property = await _context.Properties.FindAsync(tran.Property.Id);

                        if (property != null) {
                            property.Status = "Available";
                        }

                    }
                }

                // Temporary approach in deleting documents
                // Temporary nga murag ma permanent
                if (client.Documents != null)
                {
                    foreach (var doc in client.Documents)
                    {
                        _context.Remove(doc);
                    }
                }

                if (client.Businesses != null)
                {
                    foreach (var bus in client.Businesses)
                    {
                        _context.Remove(bus);
                    }
                }
                
                _context.Remove(client);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }
        }
    }
}