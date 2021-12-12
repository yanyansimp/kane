using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Application.Errors;

namespace Application.Payments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid TransactionId { get; set; }
            public int TransactionSequenceNo { get; set; }
            public Guid Id { get; set; }
            public string ORNumber { get; set; }
            public float Amount { get; set; }
            public string TypeOfPayment { get; set; }
            public string ModeOfPayment { get; set; }
            public DateTime DateOfPayment { get; set; }
            public string CheckNo { get; set; }
            public string BankName { get; set; }
            public string Branch { get; set; }
            public string InPaymentOf { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // Add Validation
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                //handler logic
                var payment = await _context.Payments.FindAsync(request.Id);

                if (payment == null)
                    throw new RestException(HttpStatusCode.NotFound, new {payment = "Not Found"});

                payment.ORNumber = request.ORNumber ?? payment.ORNumber;
                payment.TypeOfPayment = request.TypeOfPayment ?? payment.TypeOfPayment;
                payment.ModeOfPayment = request.ModeOfPayment ?? payment.ModeOfPayment;
                payment.DateOfPayment = request.DateOfPayment != null ?
                    request.DateOfPayment : payment.DateOfPayment;
                payment.CheckNo = request.CheckNo ?? payment.CheckNo;
                payment.BankName = request.BankName ?? payment.BankName;
                payment.Branch = request.Branch ?? payment.Branch;
                payment.Amount = request.Amount > -1 ? request.Amount : payment.Amount;
                payment.UpdatedAt = DateTime.Now;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

        }
    }
}