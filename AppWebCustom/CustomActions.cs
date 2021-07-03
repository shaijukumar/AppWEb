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
        public static async  Task<bool> Execute(ApiDetails ad, XmlNode actionNode, DataContext _context, ActionCommand request, string currentUserId)
        {  
            bool res = false;            

            string itemName = actionNode.Name.ToLower();

            try{
                switch(itemName){

                    case "appdata":
                        res = await appdata.Execute(ad, actionNode, _context, request, currentUserId);                                                 
                        break;
                    // case "addhistory":
                    //     res = await addhistory.Execute(appAction, appData, actionNode, _context, request, currentUserId);
                    //     break;     
                    case "deleteitem":
                        res = await deleteitem.Execute(ad, actionNode, _context, request, currentUserId);
                        break;
                    case "notification":
                        res = await notification.Execute(ad, actionNode, _context, request, currentUserId);
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