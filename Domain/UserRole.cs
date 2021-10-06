using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class UserRole : IdentityUserRole<string>
    {
        public virtual AppUser AppUser { get; set; }
        public virtual Role Role { get; set; }
    }
}