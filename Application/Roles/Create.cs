using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Roles
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Name { get; set; }

            public List<string> Claims { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly RoleManager<IdentityRole> _roleManager;


            public Handler(DataContext context, RoleManager<IdentityRole> roleManager)
            {
                _roleManager = roleManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                if (await _roleManager.RoleExistsAsync(request.Name))
                    throw new RestException(HttpStatusCode.BadRequest, new { Role = "Role already exists" });

                var result = await _roleManager
                    .CreateAsync(new IdentityRole { Name = request.Name });

                var role = await _roleManager.FindByNameAsync(request.Name);

                foreach (var claim in request.Claims)
                {
                    var claimResult = await _roleManager.AddClaimAsync(role, new Claim(claim, claim));
                } 

                if (result.Succeeded) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }

            
        }
    }
}