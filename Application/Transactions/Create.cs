using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class Create : IRequest
    {
        public Guid Id { get; set; }
        public Guid PropertyId { get; set; }
        public Guid PropertyTypeId { get; set; }
        public Guid ClientId { get; set; }
        public float ContractPrice { get; set; }
    }
}