using System;

namespace Domain
{
    public class Document
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}