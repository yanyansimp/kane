using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Properties;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class PropertiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Property>>> List()
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