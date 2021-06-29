using System;
using System.Threading.Tasks;
using System.Xml;
using AppWebCustom.Common;
using Domain;
using Persistence;

namespace AppWebCustom.Action
{
    public class addhistory
    {
        public static async Task<bool>  Execute(AppAction appAction, AppData appData, XmlNode actionNode, DataContext _context, ActionCommand request, string currentUserId)
        {
            try{               
                string ActParm = XMLParm.GetAttributeValue( actionNode, "Action", true ) ;
                string CmdParm = XMLParm.GetAttributeValue( actionNode, "CommentParm", false ) ;
                string CmdVal  = XMLParm.GetRequestParmValue( request, CmdParm, false);

                var appHistory = new AppHistory{                                
                    AppDataId = appData.Id,
                    Action  = ActParm,
                    FromStage  = appData.StatusId,
                    ToStage  = appAction.ToStatusId,
                    ActionBy  = currentUserId,
                    DateTime  = DateTime.Now,
                    Comment = CmdVal
                };                             
                _context.AppHistorys.Add(appHistory);
                var success = await _context.SaveChangesAsync() > 0;
            }
            catch(Exception ex){
                 throw new Exception( $" addhistory {ex.Message }" );
            }

            return true;
        }
    }
}