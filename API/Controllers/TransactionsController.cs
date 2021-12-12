using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Transactions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TransactionsController : BaseController
    {


        [HttpGet("{clientId}/{transactionId}")]
        public async Task<ActionResult<TransactionDto>> Details(Guid clientId, Guid transactionId)
        {
            return await Mediator.Send(new Details.Query{CliedId = clientId, TransactionId = transactionId});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{clientId}")]
        public async Task<ActionResult<Unit>> Edit(Guid clientId, Edit.Command command)
        {
            command.ClientId = clientId;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }

    }
}