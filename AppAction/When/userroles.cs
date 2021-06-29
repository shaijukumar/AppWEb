using System.Threading.Tasks;
using System.Xml;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace AppAction.When
{
    public class userroles
    {
        
        public static async Task<bool> Execute(XmlNode ActionNode, DataContext _context, string CurrentUserId)
        {                        
             # region userroles
             
            int roleId =0;
            if( !int.TryParse(ActionNode.InnerText, out roleId) ){
                throw new Exception( "Invalid roleId when -> userroles " );
            }                         
            
            try{
               
                return await _context.AppUserRoles
                .Where( x => x.UserId == CurrentUserId && x.AppUserRoleMasterId ==  roleId ).CountAsync() > 0; 
            }
            catch(Exception ex){
                 throw new Exception( $"userroles {ex.Message }" );
            }
                               
            # endregion userroles
            
           
        }
    }
}