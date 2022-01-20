using System;

namespace Application.Payments.Dtos
{
    public class PaymentDto
    {
        public Guid Id { get; set; }
        public int? SequenceNo { get; set; }
        public string ARNumber { get; set; }
        public string Name { get; set; }
        public string PropertyName { get; set; }
        public float ContractPrice { get; set; }
        public float Balance { get; set; }
        public float AmountPaid { get; set; }
        public string Type { get; set; }
        public string Mode { get; set; }
        public DateTime Date { get; set; }
    }
}