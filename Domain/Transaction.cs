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
        public Guid PropertyTypeId { get; set; }
        public virtual PropertyType PropertyType { get; set; }
        public Guid PropertyId { get; set; }
        public virtual Property Property { get; set; }
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; }
        public string SalesManagerId { get; set; }
        public string SalesAgentId { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        
    }
}