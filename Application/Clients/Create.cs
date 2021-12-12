using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Clients
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public DateTime CreatedAt { get; set; }

            // Transaction Details
            public Guid SalesManagerId { get; set; }
            public Guid SalesAgentId { get; set; }
            public Guid PropertyId { get; set; }
            public Guid PropertyTypeId { get; set; }
            public float ContractPrice { get; set; }
            public float MonthlyAmortization { get; set; }
            public float Terms { get; set; }
            public string Status { get; set; }


            // Personal Info
            public string LastName { get; set; }
            public string FirstName { get; set; }
            public string MiddleName { get; set; }
            public string Suffix { get; set; }
            public DateTime BirthDate { get; set; }
            public string Gender { get; set; }
            public string CivilStatus { get; set; }
            public string Religion { get; set; }
            public string TIN { get; set; }
            public string ContactNumber { get; set; }
            public string ZipCode { get; set; }
            public string Address { get; set; }
            public string Nationality { get; set; }
            public string EducationalAttn { get; set; }
            public string NumberOfDependents { get; set; }
            public string School { get; set; }
            public string MonthlyIncome { get; set; }
            public string MonthlyHouseholdIncome { get; set; }

            // Spouse Details
            public string SpouseLastName { get; set; }
            public string SpouseFirstName { get; set; }
            public string SpouseMiddleName { get; set; }
            public DateTime? SpouseBirthDate { get; set; }
            public string SpouseGender { get; set; }
            public string SpouseTIN { get; set; }
            public string SpouseNumber { get; set; }

            // Co-Borrower Details
            public string CoLastName { get; set; }
            public string CoFirstName { get; set; }
            public string CoMiddleName { get; set; }
            public string CoSuffix { get; set; }
            public DateTime? CoBirthDate { get; set; }
            public string CoGender { get; set; }
            public string CoTIN { get; set; }
            public string CoNumber { get; set; }

            // Atty In-Fact's Details
            public string AtLastName { get; set; }
            public string AtFirstName { get; set; }
            public string AtMiddleName { get; set; }
            public string AtSuffix { get; set; }
            public DateTime? AtBirthDate { get; set; }
            public string AtGender { get; set; }
            public string AtTIN { get; set; }
            public string AtNumber { get; set; }

            // Work Details
            public string Employment { get; set; }
            public string EmploymentType { get; set; }
            public string CompanyName { get; set; }
            public string CompanyLocation { get; set; }
            public string Industry { get; set; }
            public string DateEmployed { get; set; }
            public string Profession { get; set; }
            public string Position { get; set; }

            public string HomeNumber { get; set; }
            public string OfficeNumber { get; set; }
            public List<string> Documents { get; set; }
            public List<Business> Businesses { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // Validation
                // To be added
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
                var client = new Client
                {
                    Id = request.Id,
                    LastName = request.LastName,
                    FirstName = request.FirstName,
                    MiddleName = request.MiddleName,
                    Suffix = request.Suffix,
                    BirthDate = request.BirthDate.AddDays(1),
                    Gender = request.Gender,
                    CivilStatus = request.CivilStatus,
                    Religion = request.Religion,
                    TIN = request.TIN,
                    ContactNumber = request.ContactNumber,
                    ZipCode = request.ZipCode,
                    Address = request.Address,
                    Nationality = request.Nationality,
                    EducationalAttn = request.EducationalAttn,
                    School = request.School,

                    SpouseLastName = request.SpouseLastName,
                    SpouseFirstName = request.SpouseFirstName,
                    SpouseMiddleName = request.SpouseMiddleName,
                    SpouseBirthDate = request.SpouseBirthDate,
                    SpouseGender = request.SpouseGender,
                    SpouseTIN = request.SpouseTIN,
                    SpouseNumber = request.SpouseNumber,

                    CoLastName = request.CoLastName,
                    CoFirstName = request.CoFirstName,
                    CoMiddleName = request.CoMiddleName,
                    CoSuffix = request.CoSuffix,
                    CoBirthDate = request.CoBirthDate,
                    CoGender = request.CoGender,
                    CoTIN = request.CoTIN,
                    CoNumber = request.CoNumber,

                    AtLastName = request.AtLastName,
                    AtFirstName = request.AtFirstName,
                    AtMiddleName = request.AtMiddleName,
                    AtSuffix = request.AtSuffix,
                    AtBirthDate = request.AtBirthDate,
                    AtGender = request.AtGender,
                    AtTIN = request.AtTIN,
                    AtNumber = request.AtNumber,

                    Employment = request.Employment,
                    EmploymentType = request.EmploymentType,
                    CompanyName = request.CompanyName,
                    CompanyLocation = request.CompanyLocation,
                    Industry = request.Industry,
                    DateEmployed = request.DateEmployed,
                    Profession = request.Profession,
                    Position = request.Position,

                    Businesses = request.Businesses,
                    Transactions = new List<Transaction>(),
                    Documents = new List<Document>()
                };

                var property =
                    await _context.Properties.FindAsync(request.PropertyId);

                if (property == null)
                    throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });

                if (property.Status == "Available")
                {
                    var transactions = await _context.Transactions
                        .AsNoTracking()
                        .ToListAsync();

                    // var lastTransaction = await _context.Transactions.LastOrDefaultAsync();
                    var seqNo = transactions.Count == 0 ? 1 : transactions.Max(t => t.SequenceNo) + 1;

                    var transaction = new Transaction
                    {
                        Id = Guid.NewGuid(),
                        SequenceNo = seqNo,
                        ContractPrice = request.ContractPrice,
                        MonthlyAmortization = request.MonthlyAmortization,
                        Terms = request.Terms,
                        Status = "On Going",
                        Property = property,
                        SalesAgentId = request.SalesAgentId,
                        SalesManagerId = request.SalesManagerId,
                        CreatedAt = request.CreatedAt.AddDays(1) // Temporary
                    };

                    property.Status = "Reserved";

                    // Add Documents if available
                    if (request.Documents != null)
                    {
                        foreach (var document in request.Documents)
                        {
                            client.Documents.Add(new Document 
                            {
                                Id = Guid.NewGuid(),
                                Type = document,
                                CreatedAt = DateTime.Now
                            });
                        }
                    }

                    var user = await _context.Users.SingleOrDefaultAsync(x => 
                        x.UserName == _userAccessor.GetCurrentUsername());

                    client.Transactions.Add(transaction);

                    user.Transactions.Add(transaction);
                }

                _context.Clients.Add(client);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}