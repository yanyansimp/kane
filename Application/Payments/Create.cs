using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;


namespace Application.Payments
{
    public class Create 
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string ORNumber { get; set; }
            public string ModeOfPayment { get; set; }
            public DateTime DateOfPayment { get; set; }
            public string CheckNo { get; set; }
            public string BankName { get; set; }
            public string Branch { get; set; }
            public string InPaymentOf { get; set; }
            public float Amount { get; set; }
            public float Total {get; set;}
            public Guid TransactionTypeId { get; set; } 
            public Guid TransactionId { get; set; }     
            public string ReceivedById { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ORNumber).NotEmpty();
                RuleFor(x => x.ModeOfPayment).NotEmpty();
                RuleFor(x => x.DateOfPayment).NotEmpty();
                RuleFor(x => x.CheckNo).NotEmpty();
                RuleFor(x => x.BankName).NotEmpty();
                RuleFor(x => x.Branch).NotEmpty();
                RuleFor(x => x.InPaymentOf).NotEmpty();
                RuleFor(x => x.Amount).NotEmpty();
                RuleFor(x => x.Total).NotEmpty();
                RuleFor(x => x.TransactionTypeId).NotEmpty();
                RuleFor(x => x.TransactionId).NotEmpty();
                RuleFor(x => x.ReceivedById).NotEmpty();
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

                var transactionType = await _context.TransactionTypes.FindAsync(request.TransactionTypeId);
                if (transactionType == null )  
                    throw new RestException(HttpStatusCode.NotFound, new {transactionType = "Not Found Transaction Type"});
                
                var transaction = await _context.Transactions.FindAsync(request.TransactionId);
                if (transaction == null)
                    throw new RestException(HttpStatusCode.NotFound, new{ transaction = "Not Found Transaction"});
                
                var received = await _context.Users.SingleOrDefaultAsync(x => 
                        x.Id == _userAccessor.GetCurrentUsername());
                if (received == null)
                    throw new RestException(HttpStatusCode.NotFound, new{ received = "Not Found User"});
                
                
                var payment = new Payment
                {
                    Id = request.Id,
                    ORNumber = request.ORNumber,
                    ModeOfPayment = request.ModeOfPayment,
                    DateOfPayment = request.DateOfPayment,
                    CheckNo = request.CheckNo,
                    BankName = request.BankName,
                    Branch = request.Branch,
                    InPaymentOf = request.InPaymentOf,
                    Amount = request.Amount,
                    // Transaction = transaction,
                    // AppUser = received,
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