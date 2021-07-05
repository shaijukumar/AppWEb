using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Xml;
using AppWebCustom.Common;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections;
using System.Collections.Generic;

namespace AppWebCustom.Action
{
     
    public class notification
    {
        /*
        
        <Notification NoOfReminders="1" Site="true" Email="true" Url="AppApiItemEdit/##ID##" Type="1,2" >
            <To><UserRoles>BackOfficeChecker</UserRoles></To>
            <EmailCC><UserRoles>BackOfficeMaker</UserRoles></EmailCC>
            <Subject>New Customer submitted for approval - ##CustomerName##</Subject>
            <Body Template="CustomerApproval">New Customer submitted for approval ###Temaple##</Body>	  
        </Notification>
        
        <!--Birthday Notification-->
        <Notification NoOfReminders="INF" Site="true" Email="true" Frequency="Yearly" StartTimeParm="Parm2" Type="1,2"  >
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
                
                # region init variables

                int NoOfReminders =  0;
                Int32.TryParse( XMLParm.GetAttributeValue( actionNode, "NoOfReminders", false ), out NoOfReminders );

                // int Frequency = 0;
                // Int32.TryParse( XMLParm.GetAttributeValue( actionNode, "Frequency", false ), out Frequency );
                string Frequency = XMLParm.GetAttributeValue( actionNode, "Frequency", false ) ;
               
                
                //string Type = XMLParm.GetAttributeValue( actionNode, "Type", false ) ;
                string SiteNoti = XMLParm.GetAttributeValue( actionNode, "Site", false ) ;
                string EmailNoti = XMLParm.GetAttributeValue( actionNode, "Email", false ) ;
                string AppPath = XMLParm.GetAttributeValue( actionNode, "Url", false ) ;
;
                string StartTimeParm = XMLParm.GetAttributeValue( actionNode, "StartTimeParm", false ) ;

                string Subject = string.Empty;
                string Body = string.Empty;
                string AppUrl = string.Empty;

                string ToEmailList = string.Empty;
                string ToUserList = string.Empty;
                string ToGroupList = string.Empty;

                string CCEmailList = string.Empty;
                string CCGroupList = string.Empty;
                string CCUserList = string.Empty;

                List<AppNotifications> appNotiList = new List<AppNotifications>();
                 
                # endregion

                # region NotificationType

                string Type = string.Empty;
                ///1- Site notification, 2. Email, 3. SMS
                if(EmailNoti == "true"){
                    Type = StringConcat("2", Type);
                }
                if(SiteNoti == "true"){
                   Type = StringConcat("1", Type);
                }
              
                #endregion

                 # region AppPath

                if(!string.IsNullOrEmpty(AppPath)){
                    AppPath = AppPath.Replace("##ID##", ad.appData.Id.ToString());

                    var config = await ad._context.AppConfigs.Include( x => x.ConfigType)
                        .Where(x => x.Title == "ApplicationURL" && x.ConfigType.Title == "ApplicationConfig").FirstOrDefaultAsync();

                    if(config != null ){
                        AppUrl = config.Det1 + AppPath;
                    }                                                           
                }

                # endregion 
                
                
                foreach (XmlNode node in actionNode.ChildNodes)
                {
                    if (node.Name.ToLower() == "subject"){   
                        Subject = await UpdateTemplateData(ad, string.Empty, AppUrl, node.InnerText);                                       
                    }

                    if (node.Name.ToLower() == "body"){
                        string Template = XMLParm.GetAttributeValue( node, "Template", false ) ;        
                        Body = await UpdateTemplateData(ad, Template, AppUrl, node.InnerText);
                    }

                    if (node.Name.ToLower() == "to")
                    { 
                        var userDet = await GetUserDetails(node, _context, appNotiList);
                        ToEmailList += userDet.EmailList;
                        ToUserList += userDet.UserId;
                        ToGroupList += userDet.GroupId;
                    }  
                    if (node.Name.ToLower() == "emailcc")
                    { 
                        var userDet = await GetUserDetails(node, _context);
                        CCEmailList += userDet.EmailList;
                        CCUserList += userDet.UserId;
                        CCGroupList += userDet.GroupId;
                    }                 
                }

                # region NextReminderTime

                DateTime NextReminderTime  =  DateTime.Now;
                if(NoOfReminders >1){
                    //day/month/year
                    if(Frequency == NotiFrequency.Daily){

                    }
                }

                #endregion

                var appNotiMgr = new AppNotificationsMaster{  
                    AppPath = AppPath,
                    Subject = Subject,
                    Body = Body,
                    NextReminderTime = NextReminderTime,
                    NoOfReminders = NoOfReminders,
                    Frequency = Frequency,
                    Type = Type,
                    DataId = ad.appData.Id,
                    ToUsers = ToUserList,
                    CCUsers = CCUserList,
                    ToGroups = ToGroupList,
                    CCGroups = CCGroupList
                };  

                _context.AppNotificationsMasters.Add(appNotiMgr);
                var success = await _context.SaveChangesAsync() > 0; 

                if(success){
                    foreach(var noti in appNotiList){
                        noti.NotificationsMasterId = appNotiMgr.Id;
                         _context.AppNotificationss.Add(noti);                         
                    }
                    await _context.SaveChangesAsync(); 
                }
                


            }
            catch(Exception ex){
                 throw new Exception( $" add notification {ex.Message }" );
            }         

            return true;  
        }

       public class NotiUserDetails{
            public string EmailList { get; set; }
            public string UserList { get; set; }
            public string UserId { get; set; }
            public string GroupId { get; set; }
                        
            public NotiUserDetails(){
                EmailList = string.Empty;
                UserList = string.Empty;
            }
        }

        public class NotiFrequency
        {
            public const string Daily = "daily";
            public const string Monthly = "monthly";
            public const string Yearly = "yearly";
        }

        public static async Task<NotiUserDetails> GetUserDetails(XmlNode Node,  DataContext _context,  List<AppNotifications> appNotiList = null){            
            
            var obj = new NotiUserDetails();

            foreach (XmlNode UserNode in Node)
            {
                string Id = UserNode.InnerText;

                if(UserNode.Name == "UserRoles"){

                    var idNum = Int32.Parse(Id);

                    var roleUsers = await _context.AppUserRoles
                        .Where(x => x.AppUserRoleMasterId ==  idNum ).ToListAsync();

                    if(roleUsers != null){

                        obj.GroupId = Id + ";";
                        foreach(var role in roleUsers){
                            var user = await _context.Users.FirstOrDefaultAsync( u => u.UserName == role.UserId ); 
                            obj.EmailList += user.Email + ";";
                            obj.UserList += user.UserName + ";";

                            if(appNotiList != null){
                                appNotiList.Add( new AppNotifications{
                                    UserId = user.UserName,
                                    ReadStatus = false
                                });
                            }
                        } 

                    }

                    
                }
                else if(UserNode.Name == "User"){
                    var user = await _context.Users.FirstOrDefaultAsync( u => u.UserName == Id );  
                    if(user != null){
                        obj.EmailList += user.Email + ";";
                        obj.UserList += user.UserName + ";";
                        obj.UserId = Id + ";";

                        if(appNotiList != null){
                            appNotiList.Add( new AppNotifications{
                                UserId = user.UserName,
                                ReadStatus = false
                            });
                        }
                    }
                }                                            
            }
            return obj;
         }

        public static async Task<string> UpdateTemplateData(ApiDetails ad, string templateName, string AppUrl, string text){

            # region get column details

            if(ad.appColumns == null){
                ad.appColumns = await ad._context.AppColumnMasters
                    .Where(x => x.TableID == ad.appAction.TableId  ).ToListAsync();
            }

            # endregion

            # region URL

            if( !string.IsNullOrEmpty(AppUrl) ){
                text = text.Replace( "##AppLinkURL##" , AppUrl );
            }
             # endregion

            # region Get Template

            string template = string.Empty;

            if( !string.IsNullOrEmpty(templateName) ){

                var appTemp = await ad._context.AppNitificationTemplates
                    .Where(x => x.Title == templateName  ).FirstOrDefaultAsync();

                if(appTemp != null){
                    template = appTemp.Template;
                }
            }

            # endregion

            # region Replace column details

            Type appDataType = ad.appData.GetType();

            foreach( var col in ad.appColumns){
                PropertyInfo ap1 = appDataType.GetProperty(col.AppDataFiled);               
                try{
                     text = text.Replace( $"##{col.Title}##" , ap1.GetValue(ad.appData).ToString() );
                }
                catch{}

                if( !string.IsNullOrEmpty(templateName) ){
                    try{
                        template = template.Replace( $"##{col.Title}##" , ap1.GetValue(ad.appData).ToString() );
                        if( !string.IsNullOrEmpty(AppUrl) ){
                            template = template.Replace( "##AppLinkURL##" , AppUrl );
                        }
                    }
                    catch{}                    
                }
            }

            text = text.Replace( "###Temaple##" , template );

            # endregion

            return text;
        }
        
        public static string StringConcat(string inStr, string outStr ){
            if(!string.IsNullOrEmpty(outStr)){
                outStr += ";";
            }
            else{
                outStr = string.Empty;
            }
            outStr += inStr;
            return outStr;
        }
    }
}