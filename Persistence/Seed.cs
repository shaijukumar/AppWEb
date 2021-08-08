using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {            
            if (!context.AppConfigTypes.Any()){
                var configTyps = new List<AppConfigType>{
                    new AppConfigType{
                        Title = "ApplicationConfig",
                        Description = "Application Config"
                    },
                    new AppConfigType{
                        Title = "ActionTypes",
                        Description = "Action Types"
                    },
                    new AppConfigType{
                        Title = "Countries",
                        Description = "Countries List"
                    },
                    new AppConfigType{
                        Title = "EmiratesUAE",
                        Description = "UAE UAEEmirates"
                    }
                };

                context.AppConfigTypes.AddRange(configTyps);
                context.SaveChanges();
            }

             if (!context.AppConfigs.Any()){
                
                var configTyps = new List<AppConfig>();

                var ty = await context.AppConfigTypes
                    .Where(x => x.Title == "ApplicationConfig" ).FirstOrDefaultAsync();

                if(ty != null )
                {

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "ApplicationURL",
                        Det1 = "http://localhost:3000",
                         Order = 1                   
                    }); 

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "AttachmentPath",
                        Det1 = @"C:\Attachments",
                         Order = 2                       
                    });                                                   
                }
                
                ty = await context.AppConfigTypes
                    .Where(x => x.Title == "ActionTypes" ).FirstOrDefaultAsync();

                if(ty != null )
                {
                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Action",
                        Order = 1                    
                    }); 

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Query",                      
                         Order = 2                       
                    });                                                   
                }

                ty = await context.AppConfigTypes
                    .Where(x => x.Title == "EmiratesUAE" ).FirstOrDefaultAsync();

                if(ty != null )
                {
                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Abu Dhabi",
                        Order = 1                    
                    }); 

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Ajman",                      
                         Order = 2                       
                    });  

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Dubai",
                        Order = 3                   
                    }); 

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Fujairah",                      
                         Order = 4                       
                    });

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Ras Al Khaimah",
                        Order = 5                    
                    }); 

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Sharjah",                      
                         Order = 6                       
                    }); 

                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "Umm Al Quwain",                      
                         Order = 7                       
                    }); 
                }

                ty = await context.AppConfigTypes
                    .Where(x => x.Title == "Countries" ).FirstOrDefaultAsync();

                if(ty != null )
                {
                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "India",
                        Order = 1                    
                    }); 
                    configTyps.Add( new AppConfig{
                        ConfigTypeId = ty.Id,
                        Title = "United Arab Emirates",                      
                         Order = 2                       
                    });                                                   
                }

                context.AppConfigs.AddRange(configTyps);
                context.SaveChanges();
            }

            
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Admin",
                        UserName = "admin",
                        Email = "admin@test.com",
                        IsActive = true 
                    },
                    new AppUser
                    {
                        DisplayName = "Test1",
                        UserName = "test1",
                        Email = "test1@test.com",
                        IsActive = true 
                    },
                    new AppUser
                    {
                        DisplayName = "Test2",
                        UserName = "test2",
                        Email = "test2@test.com",
                        IsActive = true 
                    },
                    new AppUser
                    {
                        DisplayName = "Test3",
                        UserName = "test3",
                        Email = "test3@test.com",
                        IsActive = true 
                    }
                };

                foreach (var user in users) 
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            
            

            if (!roleManager.Roles.Any())
            {
                 if (!await roleManager.RoleExistsAsync( "Admin")) {
                    var role = new IdentityRole();    
                    role.Name = "Admin";    
                    await roleManager.CreateAsync(role);   

                    var user = await context.Users.FirstOrDefaultAsync( u => u.UserName == "admin"  );                     
                    if (user != null){
                      await userManager.AddToRoleAsync(user, "Admin" );

                      var success = await context.SaveChangesAsync() > 0;

                    }                                                                                               
                } 

                 if (!await roleManager.RoleExistsAsync( "All Users")) {
                    var role = new IdentityRole();    
                    role.Name = "All Users";    
                    await roleManager.CreateAsync(role);   

                    var user = await context.Users.FirstOrDefaultAsync( u => u.UserName == "admin"  );                     
                    if (user != null){
                      await userManager.AddToRoleAsync(user, "All Users" );
                    }
                    user = await context.Users.FirstOrDefaultAsync( u => u.UserName == "test1"  );                     
                    if (user != null){
                      await userManager.AddToRoleAsync(user, "All Users" );
                    } 
                    user = await context.Users.FirstOrDefaultAsync( u => u.UserName == "test2"  );                     
                    if (user != null){
                      await userManager.AddToRoleAsync(user, "All Users" );
                    } 
                    user = await context.Users.FirstOrDefaultAsync( u => u.UserName == "test3"  );                     
                    if (user != null){
                      await userManager.AddToRoleAsync(user, "All Users" );
                    }
                } 
            }

            
            // if (!context.AppNavigations.Any()){
                
            //    var role = await roleManager.FindByNameAsync("Admin");

            //     var items = new List<AppNavigation>{
            //         new AppNavigation{
            //             Order = 1,
            //             Title = "Home",
            //             Path = "/UserProfile",
            //             Icon = "home",
            //             Role = role
            //         },
                    
            //     };

            //     context.AppNavigations.AddRange(items);
            //     context.SaveChanges();
            // }                   
        }

        
    }
}