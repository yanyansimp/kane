using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Clients
{
    public class Edit
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
            public DateTime? BirthDate { get; set; }
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                var client = await _context.Clients.FindAsync(request.Id);

                if (client == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Client = "Not Found"});

                client.LastName = request.LastName ?? client.LastName;
                client.FirstName = request.FirstName ?? client.FirstName;
                client.MiddleName = request.MiddleName ?? client.MiddleName;
                client.Suffix = request.Suffix;
                client.BirthDate = request.BirthDate ?? client.BirthDate;
                client.Gender = request.Gender ?? client.Gender;
                client.CivilStatus = request.CivilStatus ?? client.CivilStatus;
                client.Religion = request.Religion ?? client.Religion;
                client.TIN = request.TIN ?? client.TIN;
                client.ContactNumber = request.ContactNumber;
                client.ZipCode = request.ZipCode ?? client.ZipCode;
                client.Address = request.Address ?? client.Address;
                client.EducationalAttn = request.EducationalAttn ?? client.EducationalAttn;
                client.NumberOfDependents = request.NumberOfDependents ?? client.NumberOfDependents;
                client.School = request.School ?? client.School;
                client.MonthlyIncome = request.MonthlyIncome ?? client.MonthlyIncome;
                client.MonthlyHouseholdIncome = request.MonthlyHouseholdIncome ?? client.MonthlyHouseholdIncome;
                
                // Spouse
                client.SpouseLastName = request.SpouseLastName ?? client.SpouseLastName;
                client.SpouseFirstName = request.SpouseFirstName ?? client.SpouseFirstName;
                client.SpouseMiddleName = request.SpouseMiddleName ?? client.SpouseMiddleName;
                client.SpouseBirthDate = request.SpouseBirthDate ?? client.SpouseBirthDate;
                client.SpouseGender = request.SpouseGender ?? client.SpouseGender;
                client.SpouseTIN = request.SpouseTIN ?? client.SpouseTIN;
                client.SpouseNumber = request.SpouseNumber;

                // Co-Borrower
                client.CoLastName = request.CoLastName ?? client.CoLastName;
                client.CoFirstName = request.CoFirstName ?? client.CoFirstName;
                client.CoMiddleName = request.CoMiddleName ?? client.CoMiddleName;
                client.CoSuffix = request.CoSuffix;
                client.CoGender = request.CoGender ?? client.CoGender;
                client.CoTIN = request.CoTIN ?? client.CoTIN;
                client.CoNumber = request.CoNumber;

                // Attorney
                client.AtLastName = request.AtLastName ?? client.AtLastName;
                client.AtFirstName = request.AtFirstName ?? client.AtFirstName;
                client.AtMiddleName = request.AtMiddleName ?? client.AtMiddleName;
                client.AtSuffix = request.AtSuffix ?? client.AtSuffix;
                client.AtBirthDate = request.AtBirthDate ?? client.AtBirthDate;
                client.AtGender = request.AtGender ?? client.AtGender;
                client.AtTIN = request.AtTIN ?? client.AtTIN;
                client.AtNumber = request.AtNumber;
                
                // Employment
                client.Employment = request.Employment ?? client.Employment;
                client.EmploymentType = request.EmploymentType ?? client.EmploymentType;
                client.CompanyName = request.CompanyName ?? client.CompanyName;
                client.CompanyLocation = request.CompanyLocation ?? client.CompanyLocation;
                client.Industry = request.Industry ?? client.Industry;
                client.DateEmployed = request.DateEmployed ?? client.DateEmployed;
                client.Profession = request.Profession ?? client.Profession;
                client.Position = request.Position ?? client.Position;

                // Company
                client.HomeNumber = request.HomeNumber ?? client.HomeNumber;
                client.OfficeNumber = request.OfficeNumber ?? client.OfficeNumber;

                // Businesses
                // client.Businesses = request.Businesses ?? client.Businesses;

                // Documents 
                if (request.Documents != null) 
                {
                    var clientDocs = client.Documents;

                    // foreach (var item in clientDocs)
                    // {
                    //     client.Documents.Remove(item);
                    // }

                    var docs = new List<Document>();

                    foreach (var document in request.Documents)
                    {
                        docs.Add(new Document
                        {
                            Id = Guid.NewGuid(),
                            Type = document,
                            CreatedAt = DateTime.Now
                        });
                    }

                    // client.Documents = docs;
                }

                client.UpdatedAt = DateTime.Now;
                
                // Wala pa ni nahuman nigga

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }
        }
    }
}