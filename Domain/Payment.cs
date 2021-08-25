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
        public string CheckNo { get; set; }
        public string BankName { get; set; }
        public string Branch { get; set; }
        public string InPaymentOf { get; set; }
<<<<<<< HEAD
        public float Total {get; set;}
        public Guid TransactionTypeId { get; set; }
        public virtual TransactionType TransactionType { get; set; }
        public Guid TransactionId { get; set; }
        public virtual Transaction Transaction { get; set; }
        public string ReceivedById { get; set; }
        public virtual AppUser AppUser { get; set; }
        // public virtual ICollection<AppUser> ReceivedBy { get; set; }
=======
>>>>>>> 9d19d15bf029e72dd3fe5c7374fc61541e4c14ec
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        // public Guid TransactionTypeId { get; set; }
        // public virtual TransactionType TransactionType { get; set; }
        // public Guid TransactionId { get; set; }
        // public virtual Transaction Transaction { get; set; }
        // public string ReceivedById { get; set; }
        // public virtual AppUser AppUser { get; set; }

    }
}