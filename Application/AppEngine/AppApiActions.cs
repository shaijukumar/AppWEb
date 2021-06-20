using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml;
using Application._AppApi;
using Domain;
using Newtonsoft.Json.Linq;
using Persistence;

namespace Application.AppEngine
{
    public class AppApiActions
    { 
        public static async Task<Dictionary<string, List<object>>> ExecuteAction(AppAction appAction, AppData appData, DataContext _context, TakeAction.Command request, string currentUserId  )
        {            
            //AppData appData = new AppData(); 
            var res = new  AppApiDto();
            res.Id = request.ActionId; //Int32.Parse( request.ActionId);
             Dictionary<string, List<object>> result = new Dictionary<string, List<object> >();

            #region Parse Action 

            if( !string.IsNullOrEmpty(appAction.ActionXml))
            {
                #region Load XML

                XmlDocument xmlDoc = new XmlDocument();            
                try
                {
                    xmlDoc.LoadXml(appAction.ActionXml);
                }
                catch (Exception ex)
                {
                    throw new Exception( "invalid ActionXml" + ex.Message );
                }

                #endregion Load XML
                
                bool udateStatus = true;
                XmlNodeList actionListNode = xmlDoc.GetElementsByTagName("ActionList");
                if(actionListNode.Count > 0)
                {
                    //Foreach actions in ActionList
                    foreach (XmlNode actionNode in actionListNode.Item(0).ChildNodes)
                    {
                        if( actionNode.Name == "AppData")
                        {
                           result = await AppApiDataAction.Execute( "InPutParm", appAction, appData, actionNode, _context, request, currentUserId );
                           udateStatus = false;
                        }

                        if( actionNode.Name == "DeleteItem")
                        {
                           result = await AppApiDelteAction.Execute( appAction, appData, actionNode, _context, request );
                           udateStatus = false;
                        }
                    }
                }

                //Update date if no data, only status change
                if(udateStatus){
                    result = await AppApiDataAction.Execute( "updateStatus", appAction, appData, null, _context, request, currentUserId );
                }
            } 

            #endregion Parse Action 
                        
            return result;
        }
    }
}