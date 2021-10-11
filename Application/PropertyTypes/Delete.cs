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
                var propertyType = await _context.PropertyTypes.FindAsync(request.Id);

                var image = await _context.Photos.FindAsync(propertyType.Image.Id);

                if(propertyType == null)
                    throw new RestException(HttpStatusCode.NotFound, new {propertyType = "Not Found"});

                var result = _photoAccessor.DeletePhoto(propertyType.Image.Id);

                _context.Remove(image);
                _context.Remove(propertyType);
                
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}