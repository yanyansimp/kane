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
    public class Create 
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

            // public string TransactionId { get; set; }
            // public string ReceivedById { get; set; }
           
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // RuleFor(x => x.ORNumber).NotEmpty();
                RuleFor(x => x.Amount).NotEmpty();
                // RuleFor(x => x.ModeOfPayment).NotEmpty();
                // RuleFor(x => x.DateOfPayment).NotEmpty();
                // RuleFor(x => x.CheckNo).NotEmpty();
                // RuleFor(x => x.BankName).NotEmpty();
                // RuleFor(x => x.Branch).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                
                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new {User = "Not Found"});

                var transaction = await _context.Transactions
                    .SingleOrDefaultAsync(t => t.Id == request.Id || t.SequenceNo == request.TransactionSequenceNo);

                if (transaction == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Transaction = "Not Found"});

                    // throw new RestException(HttpStatusCode.NotFound, new {Transaction = "Not Found"});
                
                var payments = await _context.Payments.ToListAsync();

                // var sequenceNo = lastPayment != null ? lastPayment.SequenceNo : 0;
                var sequenceNo = payments.Count == 0 ? 1 : payments.Max(p => p.SequenceNo) + 1;

                var payment = new Payment
                {
                    Id = request.Id,
                    SequenceNo = sequenceNo,
                    ORNumber = request.ORNumber,
                    TypeOfPayment = request.TypeOfPayment,
                    ModeOfPayment = request.ModeOfPayment,
                    DateOfPayment = request.DateOfPayment.AddDays(1),
                    CheckNo = request.ModeOfPayment == "Cheque" ? request.CheckNo : "",
                    BankName = request.ModeOfPayment == "Cheque" ? request.BankName : "",
                    Branch = request.ModeOfPayment == "Cheque" ? request.Branch : "",
                    Amount = request.Amount,
                    CreatedAt = DateTime.Now
                };

                float totalAmount = 0.0f;

                foreach (var pyment in transaction.Payments)
                {
                    totalAmount += pyment.Amount;
                }

                if ((totalAmount + request.Amount) == transaction.ContractPrice)
                    transaction.Status = "Completed";

                transaction.Payments.Add(payment);

                user.Payments.Add(payment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}