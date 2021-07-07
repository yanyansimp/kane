using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Application.Roles
{
    public class Role 
    {
        public string Name { get; set; }
        public virtual ICollection<RoleClaim> RoleClaims { get; set; }
    }

    public class RoleClaim
    {
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
    }
}