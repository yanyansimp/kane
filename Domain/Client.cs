using System;
using System.Collections.Generic;

namespace Domain
{
    public class Client
    {
        public Guid Id { get; set; }
        public int? SequenceNo { get; set; }
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
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        // Navigation Properties
        public virtual ICollection<Business> Businesses { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }

    }
}