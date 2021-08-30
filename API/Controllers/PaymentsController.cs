using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Payments;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using System;


namespace API.Controllers
{
    [AllowAnonymous]
    public class PaymentsController : BaseController
    {
        
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}