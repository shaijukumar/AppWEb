using System;
using System.Threading.Tasks;
using System.Xml;
using AppWebCustom.Action;
using Domain;
using Persistence;

namespace AppWebCustom
{
    public class CustomActions
    {        
        public static async  Task<bool> Execute(AppAction appAction, AppData appData, XmlNode actionNode, DataContext _context, ActionCommand request, string currentUserId)
        {  
            bool res = false;

            string itemName = actionNode.Name.ToLower();

            try{
                switch(itemName){

                    case "appdata":
                        res = await appdata.Execute(appAction, appData, actionNode, _context, request, currentUserId);                                                 
                        break;
                    case "addhistory":
                        res = await addhistory.Execute(appAction, appData, actionNode, _context, request, currentUserId);
                        break;     
                    case "deleteitem":
                        res = await deleteitem.Execute(appAction, appData, actionNode, _context, request, currentUserId);
                        break;                 
                    default:
                        return false;
                }
            }
            catch(Exception ex){
                 throw new Exception( $"Error while checking when -> {ex.Message }" );
            }

            return res;
        }
    }
}