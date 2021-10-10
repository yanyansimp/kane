using System;

namespace Domain
{
    public class Property
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        // Navigation Properties
        public virtual Photo Image { get; set; }

        //public virtual ICollection<Transaction> Transactions { get; set; } // Old
        // public string PropertyTypeId { get; set; } // Old
    }
}