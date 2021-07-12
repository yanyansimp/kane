using System;
using System.Collections.Generic;

namespace Domain
{
    public class Payment
    {
        public Guid Id { get; set; }
        public string ORNumber { get; set; }
        public float Amount { get; set; }
        public string ModeOfPayment { get; set; }
        public DateTime DateOfPayment { get; set; }
        public Guid TransactionId { get; set; }
        public virtual Transaction Transaction { get; set; }
        public string ReceivedById { get; set; }
        public virtual AppUser AppUser { get; set; }
        // public virtual ICollection<AppUser> ReceivedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

    }
}