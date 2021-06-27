using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using Application._AppApi;
using Domain;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;

namespace Application.AppEngine
{
    public class ApiQuery
    {
        public static async Task<Dictionary<string, List<object>>> ExecuteQuery(AppAction appAction, AppData appData, DataContext _context, TakeAction.Command request )
        {
            List<object> tableData = new List<object>();
            var row = new Dictionary<string, object>();
          
            #region init variables

            string SqlSelct = " * ";    
            bool retAttach = false;
            bool retHist = false;

            string SqlWhere = string.Empty;

            #endregion init variables

            #region Get column details

            var colList = await _context.AppColumnMasters
                .Where(x => x.TableID ==  appAction.TableId ).ToListAsync();

            #endregion Get column details

            #region Parse Action 

             if( !string.IsNullOrEmpty(appAction.ActionXml)){

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

                try
                {
                    XmlNode selectNode = xmlDoc.SelectSingleNode("/ActionList/Select");

                    try{
                        if (selectNode.Attributes["history"] != null && selectNode.Attributes["history"].Value == "true" )
                        {
                            retAttach = true;
                        }
                    }catch{ }

                    try{
                        if (selectNode.Attributes["attachment"] != null && selectNode.Attributes["attachment"].Value == "true")
                        {
                            retHist = true;
                        }
                    }catch{ }
                }
                catch{ }
               

                //  ExecuteAction   
                XmlNodeList qryNode = xmlDoc.GetElementsByTagName("Where");
                SqlWhere = GetSqlFromAction(qryNode.Item(0).FirstChild, colList, request);          
            
            }

            


            #endregion Parse Action 
             
            #region Update where

            if( string.IsNullOrEmpty(SqlWhere))
            {
                SqlWhere = " where ( TableId  = " + appAction.TableId + " )";
            }
            else
            {
                SqlWhere = " where ( TableId  = " + appAction.TableId + " )" + " and  " + SqlWhere;
            }

             #endregion Update where

            #region Query AppDatas

            var appDataList = await _context.AppDatas
                .FromSqlRaw( "SELECT " + SqlSelct + " FROM AppDatas " + SqlWhere )
                .ToListAsync();

            #endregion Query AppDatas

            #region Genreate and return Output
             
            foreach(AppData dataRow in appDataList){ 

                row = new Dictionary<string, object>();
                row.Add("Id", dataRow.Id.ToString() );

                //row = new Dictionary<string, object>();
                row.Add("StatusId", dataRow.StatusId.ToString() );

                foreach(AppColumnMaster col in colList){  
                    if(col.Type == AppColumnType.Attachment){
                        var appAttachments = await _context.AppAttachments
                            .Where( a => a.AppDataId ==  dataRow.Id && a.AppDataColumn == col.Id)
                            .ToListAsync();
                         row.Add(col.Title, appAttachments);
                    } 
                    else{
                         row.Add(col.Title,
                            dataRow.GetType().GetRuntimeProperty(col.AppDataFiled)?.GetValue(dataRow) ); 
                    }
                } 

                if(retHist){
                    var appAttach = await _context.AppHistorys
                        .Where(x => x.AppDataId ==  dataRow.Id ).ToListAsync(); 
                    if(appAttach != null){
                       row.Add("AppHistory", appAttach);
                    }
                }
               
                tableData.Add(row);
            }

            Dictionary<string, List<object>> result = new Dictionary<string, List<object> >();

            result.Add("Result" + (result.Count+1).ToString() , tableData );                                   

            return result; //JsonConvert.SerializeObject(result);

            #endregion Genreate and return Output
           
        }
    
    
        public static string GetSqlFromAction(XmlNode item, List<AppColumnMaster> colList, TakeAction.Command request)
        {
            string result = string.Empty;

            string itemName = item.Name.ToLower();
            if (itemName == "and" || itemName == "or")
            {
                string res = " ( ##LEFT_COND## " + itemName + " ##RIGHT_COND## ) ";
                res = res.Replace("##LEFT_COND##" , GetSqlFromAction(item.ChildNodes[0], colList, request) );
                res = res.Replace("##RIGHT_COND##", GetSqlFromAction(item.ChildNodes[1], colList, request) );
            
                return res;
            }
            else if (itemName == "datacomarison")
            {
                string res = string.Empty;
                string Filed =  AppParm.GetAttributeValue( item, "Filed", true ) ; 

                var dbCol = new AppColumnMaster();

                # region Get col details from db

                string Type = string.Empty; 
                if(Filed == "Id" || Filed == "StatusId" )
                {                   
                    Type =AppColumnType.Number; 
                } 
                else if( Filed == "CreatedBy" || Filed == "ModifiedBy" )
                {
                    Type =AppColumnType.Text; 
                }
                else if(  Filed == "CreatedOn" ||  Filed == "ModifiedOn")
                {
                    Type =AppColumnType.DateTime; 
                }
                else
                {
                    dbCol = colList.Find( x => x.Id == Int32.Parse(Filed)  );
                    Filed =  dbCol.AppDataFiled;
                    Type = dbCol.Type; 
                } 

                # endregion Get col details

                //Update db field name
               
                //Update db field type
                

                //Update Operation Attribute value
                string Operation = AppParm.GetAttributeValue( item, "Operation", true ) ;

                if (Operation.ToLower() == "in")
                {
                    XmlNodeList values = item.FirstChild.ChildNodes;
                    foreach (XmlNode val in values)
                    {
                        string Value = val.InnerText;                             

                        if (dbCol.Type.Equals( AppColumnType.Text )) //Text filed
                        {
                            Value = "'" + Value + "'";
                        }

                        if (!string.IsNullOrEmpty(res))
                        {
                            res += " ,";
                        }
                        res += Value;
                    }

                    if (!string.IsNullOrEmpty(res))
                    {
                        res = Filed + " in (" + res + " ) ";
                    }
                }
                else 
                { 
                    string opr = AppApiOperations.GetOperator(item.Attributes["Operation"].Value.ToLower());                                      
                                       
                    string Value = AppParm.GetAttributeValue( item, "Value", false ) ; 
                    if(string.IsNullOrEmpty(Value)){
                        string ValueParm = AppParm.GetAttributeValue( item, "ValueParm", true ) ;
                        Value = AppParm.GetRequestParmValue( request, ValueParm);   
                    }
                       
                    if (Type.Equals(AppColumnType.Text))
                    {
                        Value = "'" + Value + "'";
                    }
                    res = Filed + " " + opr + " " + Value;
                }

                return res;
            }           
            return result;
        }        
    }
}