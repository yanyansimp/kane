using System.Collections.Generic;
using System.Security.Claims;

namespace Application.Roles
{
    public class RoleDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<string> RoleClaims { get; set; }
    }

    public class RoleClaimDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}