using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.LandingPhotos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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
                var landingPhoto = await _context.LandingPhotos.FindAsync(request.Id);

                if(landingPhoto == null)
                    throw new RestException(HttpStatusCode.NotFound, new {landingPhoto = "Not Found"});

                _context.Remove(landingPhoto);
                
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}