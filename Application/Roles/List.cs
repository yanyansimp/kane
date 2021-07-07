using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Roles
{
    public class List
    {
        public class Query : IRequest<List<IdentityRole>>
        {

        }

        public class Handler : IRequestHandler<Query, List<IdentityRole>>
        {
            private readonly DataContext _context;
            private readonly RoleManager<IdentityRole> _roleManager;
            public Handler(DataContext context, RoleManager<IdentityRole> roleManager)
            {
                _roleManager = roleManager;
                _context = context;
            }

            public async Task<List<IdentityRole>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var roles = await _context.Roles.ToListAsync();

                return roles;
            }
        }
    }
}