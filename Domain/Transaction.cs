using System;
using System.Collections.Generic;


namespace Domain
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public float ContractPrice { get; set; }
        public float MonthlyAmortization { get; set; }
        public float Terms { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        // Navigation Properties
        public virtual Property Property { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Document> Documents { get; set; }

        public Guid SalesManagerId { get; set; }
        public Guid SalesAgentId { get; set; }

        
    }
}