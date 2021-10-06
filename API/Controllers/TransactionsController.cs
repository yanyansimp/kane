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
    }
}