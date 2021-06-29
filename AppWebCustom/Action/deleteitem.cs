using System;
using System.Threading.Tasks;
using System.Xml;
using AppWebCustom.Common;
using Domain;
using Persistence;

namespace AppWebCustom.Action
{
    public class deleteitem
    {
        public static async Task<bool>  Execute(AppAction appAction, AppData appData, XmlNode actionNode, DataContext _context, ActionCommand request, string currentUserId)
        {
            try{               
                string InPutParm = XMLParm.GetAttributeValue( actionNode, "IdParm", true ) ;
                string IdParm  = XMLParm.GetRequestParmValue( request, InPutParm);
                
                if (appData == null)
                    throw new Exception("AppData Not found for ID " + IdParm);            

                _context.Remove(appData);

                return await _context.SaveChangesAsync() > 0;

            }
            catch(Exception ex){
                 throw new Exception( $" addhistory {ex.Message }" );
            }           
        }
    }
}