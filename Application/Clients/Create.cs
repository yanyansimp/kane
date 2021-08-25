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

namespace Application.Clients
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string LastName { get; set; }
            public string FirstName { get; set; }
            public string MiddleName { get; set; }
            public string Suffix { get; set; }
            public DateTime BirthDate { get; set; }
            public string Tin { get; set; }
            public string ContactNumber { get; set; }
            public string Address { get; set; }
            public string Gender { get; set; }
            public string Nationality { get; set; }
            public string CivilStatus { get; set; }
            public string EducationalAttn { get; set; }
            public string School { get; set; }
            public string Religion { get; set; }
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
                var client = new Client
                {
                    Id = request.Id,
                    LastName = request.LastName,
                    FirstName = request.FirstName,
                    MiddleName = request.MiddleName,
                    Suffix = request.Suffix,
                    BirthDate = request.BirthDate,
                    TIN = request.Tin,
                    ContactNumber = request.ContactNumber,
                    Address = request.Address,
                    Gender = request.Gender,
                    Nationality = request.Nationality,
                    CivilStatus = request.CivilStatus,
                    EducationalAttn = request.EducationalAttn,
                    School = request.School,
                    Religion = request.Religion,
                    Businesses = request.Businesses
                };

                _context.Clients.Add(client);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}