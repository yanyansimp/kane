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

namespace Application.Properties
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
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                // handler logic
                var property = await _context.Properties.FindAsync(request.Id);

                if(property == null)
                    throw new RestException(HttpStatusCode.NotFound, new {property = "Not Found"});

                if (property.Status.ToLower() == "reserved")
                {
                    
                }
                
                if (property.Image != null) 
                {
                    var image = await _context.Photos.FindAsync(property.Image.Id);

                    var result = _photoAccessor.DeletePhoto(property.Image.Id);

                    _context.Remove(image);
                }

                _context.Remove(property);
                
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}