using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {            
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Shaiju",
                        UserName = "bob",
                        Email = "shaiju@test.com",
                        IsActive = true 
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        IsActive = true 
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        IsActive = true 
                    }
                };

                foreach (var user in users) 
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            
            // if (!context.AppUserRoleMasters.Any())
            // {
            //     var userRoleMasters = new List<AppUserRoleMaster>
            //     {
            //         new AppUserRoleMaster
            //         {
            //             Title = "Admin",                        
            //         },
                    
            //     };

            //     context.AppUserRoleMasters.AddRange(userRoleMasters);
            //     context.SaveChanges();
            // }
        
           
        }

        
    }
}