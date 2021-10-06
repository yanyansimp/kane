using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class AddPhoto
    {
        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }

        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor) // , IUserAccessor userAccessor, 
            {
                _photoAccessor = photoAccessor;
            }

            public async Task<Photo> Handle(Command request,CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (photo != null) return photo;

                await _context.Photos.FindAsync(photoUploadResult.PublicId);

                throw new Exception("Problem saving changes");
            }
        }
    }
}