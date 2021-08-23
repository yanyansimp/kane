using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Payments
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            // public string ORNumber { get; set; }
            public float Amount { get; set; }
            public string ModeOfPayment { get; set; }
            // public DateTime DateOfPayment { get; set; }
            public string CheckNo { get; set; }
            public string BankName { get; set; }
            public string Branch { get; set; }
            // public string TransactionId { get; set; }
            // public string ReceivedById { get; set; }
           
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // RuleFor(x => x.ORNumber).NotEmpty();
                RuleFor(x => x.Amount).NotEmpty();
                RuleFor(x => x.ModeOfPayment).NotEmpty();
                // RuleFor(x => x.DateOfPayment).NotEmpty();
                // RuleFor(x => x.CheckNo).NotEmpty();
                // RuleFor(x => x.BankName).NotEmpty();
                // RuleFor(x => x.Branch).NotEmpty();

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
                var payment = new Payment
                {
                    Id = request.Id,
                    // ORNumber = request.ORNumber,
                    ModeOfPayment = request.ModeOfPayment,
                    // DateOfPayment = request.DateOfPayment,
                    CheckNo = request.CheckNo,
                    BankName = request.BankName,
                    Branch = request.Branch,
                    CreatedAt = DateTime.Now
                };

                _context.Payments.Add(payment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}