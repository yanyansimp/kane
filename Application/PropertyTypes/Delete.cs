using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.PropertyTypes
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
                var propertyType = await _context.PropertyTypes.FindAsync(request.Id);

                if(propertyType == null)
                    throw new RestException(HttpStatusCode.NotFound, new {propertyType = "Not Found"});

                _context.Remove(propertyType);
                
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}