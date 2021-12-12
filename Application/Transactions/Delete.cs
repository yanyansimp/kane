using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;


namespace Application.Transactions
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
                // handler logic
                var transaction = await _context.Transactions.FindAsync(request.Id);

                if(transaction == null)
                    throw new RestException(HttpStatusCode.NotFound, new {transaction = "Not Found"});

                var property = await _context.Properties.FindAsync(transaction.Property.Id);

                if(property == null)
                    throw new RestException(HttpStatusCode.NotFound, new {property = "Not Found"});
                
                property.Status = "Available";
                
                _context.Remove(transaction);
                
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}