using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;

namespace Application.Roles
{
    public class List
    {
        public class Query : IRequest<List<RoleDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<RoleDto>>
        {
            private readonly DataContext _context;
            private readonly RoleManager<IdentityRole> _roleManager;
            public Handler(DataContext context, RoleManager<IdentityRole> roleManager)
            {
                _roleManager = roleManager;
                _context = context;
            }

            public async Task<List<RoleDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var roles = await _context.Roles
                    .ToListAsync();

                List<RoleDto> roleDtos = new List<RoleDto>();

                foreach (var role in roles)
                {
                    var roleClaims = await _roleManager
                        .GetClaimsAsync(role);

                    roleDtos.Add(new RoleDto 
                    {
                        Id = role.Id,
                        Name = role.Name,
                        RoleClaims = roleClaims.Select(x => x.Value).ToList()
                    });
                }

                return roleDtos;
            }
        }
    }
}