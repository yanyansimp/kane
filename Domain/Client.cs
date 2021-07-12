using System;
using System.Collections.Generic;

namespace Domain
{
    public class Client
    {
        public Guid Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Suffix { get; set; }
        public DateTime BirthDate { get; set; }
        public string TIN { get; set; }
        public string ContactNumber { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string CivilStatus { get; set; }
        public string NumberOfDependents { get; set; }
        public string EducationalAttn { get; set; }
        public string School { get; set; }
        public string Religion { get; set; }
        public string HomeNumber { get; set; }
        public string OfficeNumber { get; set; }
        public string MonthlyIncome { get; set; }
        public string MonthlyHouseholdIncome { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public virtual ICollection<Transaction> Transactions { get; set; }

    }
}