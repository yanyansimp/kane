using System;
using System.Collections.Generic;
using Domain;

namespace Application.Transactions
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public string PropertyTypeName { get; set; }
        public string ClientName { get; set; }
        public int SequenceNo { get; set; }
        public float ContractPrice { get; set; }
        public float Balance { get; set; }
        public float MonthlyAmortization { get; set; }
        public float Terms { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public Property Property { get; set; }
        public ICollection<Payment> Payments { get; set; }

        public SalesManagerDto SalesManager { get; set; }
        public SalesAgentDto SalesAgent { get; set; }
    }

    public class SalesManagerDto 
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }

    public class SalesAgentDto 
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }
}