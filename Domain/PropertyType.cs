using System;
using System.Collections.Generic;

namespace Domain
{
    public class PropertyType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public virtual Photo Image { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public virtual ICollection<Amenity> Amenities { get; set; }

        // Navigation Properties
        public virtual ICollection<Property> Properties { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        // public object Amenities { get; set; }
        public virtual ICollection<Amenity> Amenities { get; set; }
        // public virtual ICollection<Transaction> Transactions { get; set; } // Old

    }
}