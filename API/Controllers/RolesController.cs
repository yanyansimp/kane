using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Roles;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers
{
    public class RolesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<IdentityRole>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateRole(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}