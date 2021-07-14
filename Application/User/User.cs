using System.Collections.Generic;
using Application.Roles;

namespace Application.User
{
    public class User
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public string Role { get; set; }
        public ICollection<string> RoleClaims { get; set; }

        // public Role Role { get; set; }

    }
}