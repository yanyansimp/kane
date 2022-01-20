using System;

namespace Application.Clients.Dtos
{
    // Dto for List of Clients in Reservation
    public class ClientDto
    {
        public Guid Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Suffix { get; set; }
        public string ContactNumber { get; set; }
        public string CivilStatus { get; set; }
        public string Employment { get; set; }
        public string Document { get; set; }

        // public ICollection<Document> Documents { get; set; }
    }

    public class TransactionDto
    {
        public Guid Id { get; set; }
        public int SequenceNo { get; set; }
        public float ContractPrice { get; set; }
        public float MonthlyAmortization { get; set; }
        public float Terms { get; set; }
        public string Status { get; set; }

        public string PropertyType { get; set; }
    }
}