using System;
using System.Threading.Tasks;
using System.Xml;
using Persistence;

namespace AppAction.When
{
    public class datacomarison
    {
        public static async Task<bool> Execute(XmlNode ActionNode, DataContext _context, string CurrentUserId)
        {                        
            # region datacomarison
                                                             
            try{
               
                await Task.Delay(3000);
            }
            catch(Exception ex){
                 throw new Exception( $" datacomarison {ex.Message }" );
            }
                               
            # endregion datacomarison

            return false;
            
           
        }
    }
}