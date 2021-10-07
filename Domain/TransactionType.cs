using System;
using System.Collections.Generic;

namespace Domain
{
    public class TransactionType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        // public virtual ICollection<Transaction> Transactions { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}