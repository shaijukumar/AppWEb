using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Xml;
using AppWebCustom.Common;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace AppWebCustom.Action
{
    public class notification
    {
        /*
        
        <Notification NoOfReminders="1" Site="true" Email="true" >
            <To><UserRoles>BackOfficeChecker</UserRoles></To>
            <EmailCC><UserRoles>BackOfficeMaker</UserRoles></EmailCC>
            <Subject>New Customer submitted for approval - ##CustomerName##</Subject>
            <Body Template="BodyTemplateId">New Customer submitted for approval ###Temaple##</Body>	  
        </Notification>
        
        <!--Birthday Notification-->
        <Notification NoOfReminders="INF" Site="true" Email="true" Frequency="Yearly" StartTimeParm="Parm2" >
            <To><UserRoles>BackOfficeChecker</UserRoles></To>
            <EmailCC><UserRoles>BackOfficeMaker</UserRoles></EmailCC>
            <Subject>New Customer submitted for approval - ##CustomerName##</Subject>
            <Body Template="BodyTemplateId">New Customer submitted for approval ###Temaple##</Body>	  </Notification>

        1. If NoOfReminders <= 1  also unlimited
                set Status = false,NoOfReminders = 0
            Else 
                set    Update NextReminderTime
                        //Status = true, 
                        NoOfReminders = NoOfReminders -1
        2.create item in NotificationsMaster
        3. Add entry into Notifications table

        */
        public static async Task<bool>  Execute(ApiDetails ad, XmlNode actionNode, DataContext _context, ActionCommand request, string currentUserId)
        {
            try{             
                await Task.Delay(10); 

                string NoOfReminders = XMLParm.GetAttributeValue( actionNode, "NoOfReminders", false ) ;
                string SiteNoti = XMLParm.GetAttributeValue( actionNode, "Site", false ) ;
                string EmailNoti = XMLParm.GetAttributeValue( actionNode, "Email", false ) ;
                string Frequency = XMLParm.GetAttributeValue( actionNode, "Frequency", false ) ;
                string StartTimeParm = XMLParm.GetAttributeValue( actionNode, "StartTimeParm", false ) ;
                string Subject = string.Empty;
                string Body = string.Empty;

                

                foreach (XmlNode node in actionNode.ChildNodes)
                {
                    if (node.Name.ToLower() == "subject"){                  
                        Subject = await UpdateTemplateData(ad, node.InnerText);
                    }

                    if (node.Name.ToLower() == "body"){
                        string Template = XMLParm.GetAttributeValue( actionNode, "Template", false ) ;
                        Body =  node.InnerText;
                    }

                    if (node.Name.ToLower() == "to")
                    { 
                        foreach (XmlNode toNode in node.ChildNodes)
                        {
                            if (toNode.Name.ToLower() == "userroles"){
                                string role = toNode.InnerText;
                            }
                        }
                    }  
                    if (node.Name.ToLower() == "EmailCC")
                    { 
                        foreach (XmlNode toNode in node.ChildNodes)
                        {
                            if (toNode.Name.ToLower() == "userroles"){
                                string role = toNode.InnerText;
                            }
                        }
                    }                 
                }

                 // actionNode.ChildNodes.get

                 

                  var appHistory = new AppNotificationsMaster{  
                        // Subject
                        // Body
                        // NextReminderTime
                        // NoOfReminders
                        // Frequency
                        // Type
                        // DataId
                        // ToUsers
                        // CCUsers
                        // ToGroups
                        // CCGroups

                    // AppDataId = appData.Id,
                    // Action  = ActParm,
                    // FromStage  = appData.StatusId,
                    // ToStage  = appAction.ToStatusId,
                    // ActionBy  = currentUserId,
                    // DateTime  = DateTime.Now,
                    // Comment = CmdVal

                    /*
                        Subject
                        Body
                        NextReminderTime
                        NoOfReminders
                        Frequency
                        Type
                        DataId
                        ToUsers
                        CCUsers
                        ToGroups
                        CCGroups
                    */
                };   

                // _context.AppHistorys.Add(appHistory);
                // var success = await _context.SaveChangesAsync() > 0;

                // string InPutParm = XMLParm.GetAttributeValue( actionNode, "IdParm", true ) ;
                // string IdParm  = XMLParm.GetRequestParmValue( request, InPutParm);
                
                // if (appData == null)
                //     throw new Exception("AppData Not found for ID " + IdParm);            

                // _context.Remove(appData);

                // return await _context.SaveChangesAsync() > 0;

            }
            catch(Exception ex){
                 throw new Exception( $" addhistory {ex.Message }" );
            }         

            return true;  
        }

        public static async Task<string> UpdateTemplateData(ApiDetails ad, string text){

            if(ad.appColumns == null){
                ad.appColumns = await ad._context.AppColumnMasters
                    .Where(x => x.TableID == ad.appAction.TableId  ).ToListAsync();
            }

            //ad.appData
            Type appDataType = ad.appData.GetType();

            foreach( var col in ad.appColumns){

                PropertyInfo ap1 = appDataType.GetProperty(col.AppDataFiled);
                var v = ap1.GetValue(ad.appData).ToString();
                text = text.Replace( $"##{col.Title}##" , ap1.GetValue(ad.appData).ToString() );
            }


            return text;
        }
    
    }
}