using System.Threading.Tasks;
using System.Xml;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using Microsoft.AspNetCore.Identity;
using Domain;
using System.Collections.Generic;

namespace AppWebCustom.When
{
    public class userroles
    {
        
        public static async Task<bool> Execute(XmlNode ActionNode, DataContext _context, string CurrentUserId, UserManager<AppUser> _userManager)
        {                        
             # region userroles
             
            // int roleId =0;
            // if( !int.TryParse(ActionNode.InnerText, out roleId) ){
            //     throw new Exception( "Invalid roleId when -> userroles " );
            // }                         
            
            // try{
               
            //     return await _context.AppUserRoles
            //         .Where( x => x.UserId == CurrentUserId && x.AppUserRoleMasterId ==  roleId ).CountAsync() > 0; 
            // }
            // catch(Exception ex){
            //      throw new Exception( $"userroles {ex.Message }" );
            // }

            string roleId = ActionNode.InnerText;
            if(string.IsNullOrEmpty(roleId)){
                throw new Exception( "Invalid roleId when -> userroles " );
            }

            AppUser user = await _userManager.FindByNameAsync(CurrentUserId);                            
            var role = await  _context.AspNetRoles
                            .Where( x => x.Id == roleId.Trim() )
                            .FirstOrDefaultAsync();

            if(user == null){
                 throw new Exception( "Invalid roleId when -> userroles " );
            }

            return await _userManager.IsInRoleAsync(user, role.Name);
                                           
            # endregion userroles
            
           
        }
    }
}