using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.TransactionTypes;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [AllowAnonymous]
    public class TransactionTypesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<TransactionType>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

    }
}