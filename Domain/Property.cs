using System;

namespace Domain
{
    public class Property
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public virtual Photo Image { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

    }
}