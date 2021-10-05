using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class List
    {
        public class Query : IRequest<List<AppUserDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<AppUserDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, IMapper mapper, 
                UserManager<AppUser> userManager)
            {
                _mapper = mapper;
                _context = context;
                _userManager = userManager;
            }

            public async Task<List<AppUserDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                // var users = await _context.Users
                //     .Include(x => x.UserActivities)
                //     .ToListAsync();

                // var u = await _userManager.Users
                //     .Include(x => x.UserRoles)
                //     .ThenInclude(x => x.Role)
                //     .ToListAsync();
                
                // var ur = await _context.Users.UserRoles.

                var userRoles = await _context.UserRoles.ToListAsync();

                var users = await _context.Users
                    .ToListAsync();

                
                // _mapper.Map<List<Activity>, List<ActivityDto>>(activities);

                // var queryable = _context.Users
                //     .OrderBy(x => x.Id)
                //     .AsQueryable();

                // var users = await queryable.ToListAsync();
                
                return _mapper.Map<List<AppUser>, List<AppUserDto>>(users);
            }
        }
    }
}