using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Domain;
using Newtonsoft.Json;

namespace Application.User
{
    public class AppUserDto : IdentityUser
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Suffix { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string Image { get; set; }
        public string Role { get; set; }

        // public virtual ICollection<Transaction> Transactions { get; set; }
        // public virtual ICollection<Payment> Payments { get; set;}
        // public virtual ICollection<Photo> Photos { get; set; }

        // [JsonProperty("userActivities")]
        // public virtual ICollection<UserActivity> UserActivities { get; set; }
    }
}