using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, 
            RoleManager<IdentityRole> roleManager)
        {

            if (!roleManager.Roles.Any())
            {
                var newRole = new IdentityRole {
                        Id = "586f8343-4c35-4d0a-844e-e593c95a6fab",
                        Name = "Admin",
                        NormalizedName = "ADMIN"
                    };
                
                var roleClaims = new List<String>
                {
                    "Dashboard", "Full Dashboard",
                    "Calendar", "Full Calendar",
                    "Reservation", "Full Reservation",
                    "Payment", "Full Payment",
                    "Property", "Full Property",
                    "User", "Full User",
                    "Report", "Full Report",
                    "Settings", "Full Settings"
                };

                await roleManager.CreateAsync(newRole);

                var role = await roleManager.FindByNameAsync(newRole.Name);

                foreach (var claim in roleClaims)
                {
                    await roleManager.AddClaimAsync(role, new Claim(claim, claim));
                }

                // await roleManager.AddClaimAsync(role, new Claim("Dashboard", "Dashboard"));
                // await roleManager.AddClaimAsync(role, new Claim("User", "User"));

            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                        DisplayName = "Super Admin",
                        UserName = "superadmin",
                        Email = "superadmin@test.com"
                    },
                    new AppUser
                    {
                        Id = "a079714e-5871-47de-9cc8-ebdb7d573d98",
                        DisplayName = "Admin",
                        UserName = "admin",
                        Email = "admin@test.com"
                    },
                    // new AppUser
                    // {
                    //     Id = "b76373d6-8081-4eff-957d-86c4572ac65d",
                    //     DisplayName = "Tom",
                    //     UserName = "tom",
                    //     Email = "tom@test.com"
                    // },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");

                    var newUser = await userManager.FindByEmailAsync(user.Email);

                    await userManager.AddToRoleAsync(newUser, "Admin");
                }

            }

            

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "Culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a079714e-5871-47de-9cc8-ebdb7d573d98",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                            new UserActivity
                            {
                                AppUserId = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "Music",
                        City = "London",
                        Venue = "Wembly Stadium",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a079714e-5871-47de-9cc8-ebdb7d573d98",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new UserActivity
                            {
                                AppUserId = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "Food",
                        City = "London",
                        Venue = "Jamies Italian",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a079714e-5871-47de-9cc8-ebdb7d573d98",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserActivity
                            {
                                AppUserId = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a079714e-5871-47de-9cc8-ebdb7d573d98",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                            new UserActivity
                            {
                                AppUserId = "b76373d6-8081-4eff-957d-86c4572ac65d",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "Culture",
                        City = "London",
                        Venue = "British Museum",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b76373d6-8081-4eff-957d-86c4572ac65d",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                            new UserActivity
                            {
                                AppUserId = "a079714e-5871-47de-9cc8-ebdb7d573d98",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "Music",
                        City = "London",
                        Venue = "O2 Arena",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                            new UserActivity
                            {
                                AppUserId = "a079714e-5871-47de-9cc8-ebdb7d573d98",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Category = "Travel",
                        City = "Berlin",
                        Venue = "All",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                            new UserActivity
                            {
                                AppUserId = "b76373d6-8081-4eff-957d-86c4572ac65d",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a079714e-5871-47de-9cc8-ebdb7d573d98",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "e6c4edd4-ac56-4c57-8f03-370fb25c6d9f",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}