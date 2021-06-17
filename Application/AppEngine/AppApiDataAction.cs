using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Xml;
using Application._AppApi;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Persistence;

namespace Application.AppEngine
{
    public class AppApiDataAction
    {
        public static async Task<Dictionary<string, List<object>>> Execute(string DataSource, AppAction appAction, AppData appData, XmlNode actionNode, DataContext _context, TakeAction.Command request, string currentUserId)
        {
            #region init variables

            //string result = string.Empty;            
            List<object> actionResult = new List<object>(); 
            
            #endregion init variables


            if(DataSource == "InPutParm" ){
                
                #region Get InPutParm

                string InPutParm = AppParm.GetAttributeValue( actionNode, "InPutParm", true ) ;
                string paremData  = AppParm.GetRequestParmValue( request, InPutParm);

                if(string.IsNullOrEmpty(paremData))
                {
                    throw new Exception("AppData parm is missing");
                }

                #endregion InPutParm

                #region get columns fron db

                var appColumns = await _context.AppColumnMasters
                    .Where(x => x.TableID == appAction.TableId  ).ToListAsync();

                #endregion get columns fron db


                #region parse data input                
                
                var appDataInPut = new AppData();

                Type appDataType = appData.GetType();
                 
                try
                {
                    JObject jObject = JObject.Parse(paremData);
                    foreach(object obj in jObject){
                        string key = ((System.Collections.Generic.KeyValuePair<string, Newtonsoft.Json.Linq.JToken>)obj).Key.ToString();
                        string value = ((System.Collections.Generic.KeyValuePair<string, Newtonsoft.Json.Linq.JToken>)obj).Value.ToString();

                        if( key == "Id" || key == "StatusId"){
                            PropertyInfo ap1 = appDataType.GetProperty(key);
                            ap1.SetValue (appData, Int32.Parse(value), null);                            
                        }
                        else{
                            var col = appColumns.FindLast( x => x.Title == key );
                            PropertyInfo ap1 = appDataType.GetProperty(col.AppDataFiled);
                            if(  col.Type == AppColumnType.Float ){
                                ap1.SetValue (appData,  float.Parse(value), null);
                            }
                            else if( col.Type == AppColumnType.Number ){
                                ap1.SetValue (appData,  Int32.Parse(value), null);
                            }
                            else{
                                ap1.SetValue (appData,  value, null);
                            }
                            
                        }
                                                                                                                       
                    }
                    appDataInPut = jObject.ToObject<AppData>();
                }
                catch(Exception ex){
                    throw new Exception("invalid Parm" + ex.Message );
                }

                #endregion parse data input

                               

                #region set appData values for each columns
                
                // foreach(var col in appColumns){
                //     PropertyInfo ap1 = appDataType.GetProperty(col.AppDataFiled);
                //     ap1.SetValue (appData,  ap1.GetValue(appDataInPut), null); 
                // }

                appData.ModifiedBy = currentUserId;
                appData.ModifiedOn = DateTime.Now;

                #endregion set appData values for each columns

                


            }
            else if(DataSource == "StatusUpdate" ){

            }

            #region Create/Update   

            if( string.IsNullOrEmpty(appData.Id.ToString()) || appData.Id == 0 )
            {
                #region Create 

                appData.TableId = appAction.TableId;
                appData.StatusId = appAction.ToStatusId;
                appData.CreatedBy = currentUserId;                                               
                appData.CreatedOn = DateTime.Now;                                    

                _context.AppDatas.Add(appData);
                //var success = await _context.SaveChangesAsync() > 0;
                await _context.SaveChangesAsync();
                
                actionResult.Add(appData);

                //result = JsonConvert.SerializeObject(appData);  

                #endregion Create
            }
            else
            {       
                #region  Update

                appData.StatusId = appAction.ToStatusId;
                var success = await _context.SaveChangesAsync() > 0; 

                actionResult.Add(appData);
                    
                #endregion Update                                   
            }

            #endregion Create/Update
                       
            Dictionary<string, List<object>> result = new Dictionary<string, List<object> >();
            result.Add("Result"+ (result.Count+1).ToString(), actionResult );

            return result;

        }
    }
}