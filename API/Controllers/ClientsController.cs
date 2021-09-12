using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Clients;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ClientsController : BaseController
    {
        [HttpGet]
        public async Task<List<Client>> List(string keyWord)
        {
            return await Mediator.Send(new List.Query(keyWord));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}