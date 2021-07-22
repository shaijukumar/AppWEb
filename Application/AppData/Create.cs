using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using System.Web;
using System.Xml;
using System.Dynamic;
using System.Reflection;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;
using System.Xml.Linq;
using System.Collections.Generic;

namespace Application._AppData
{
    public class Create
    {
        public class Command : IRequest<AppDataDto>
        {
            public string Query { get; set; }            
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Query).NotEmpty();								
            }
        }

        public class Handler : IRequestHandler<Command, AppDataDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;

            }

            public async Task<AppDataDto> Handle(Command request, CancellationToken cancellationToken)
            {      
                 XmlDocument xmlDoc = new XmlDocument();  
                 string qry = HttpUtility.UrlDecode(request.Query);
                 try{                   
                    xmlDoc.LoadXml(qry);                                       
                 }
                catch(Exception ex){
                    throw new Exception("Invalid qury XML. " + ex.Message );
                }

                XElement xml = new XElement("Result");
                AppData appData= new AppData();
                //appData.fie = "222";
                Type type = appData.GetType();
                
                string action = string.Empty;
                string table = string.Empty;
                string id = string.Empty;
                
                XmlNodeList AppDataNode = xmlDoc.GetElementsByTagName("AppData");
                XmlNode appDataNode = AppDataNode.Item(0);

                if(appDataNode.Name.ToLower() == "appdata")
                {
                    action = GetAttribureValue(appDataNode.Attributes, "action");
                    table = GetAttribureValue(appDataNode.Attributes, "table");
                    id = GetAttribureValue(appDataNode.Attributes, "id");
 
                    var tableData = await _context.AppTableMasters
                        .Where(x => x.Title == table ).FirstOrDefaultAsync();

                    if(tableData == null)
                    {
                        throw new Exception("Invalid table name");
                    }

                    int tableID = tableData.Id;

                    //Get column details
                    var colList = await _context.AppColumnMasters
                        .Where(x => x.TableID ==  tableID ).ToListAsync();



                    if(!string.IsNullOrEmpty(id)  ){ 

                        appData = await _context.AppDatas
                            .FindAsync( new Guid(id));

                        if (appData == null){
                            throw new RestException(HttpStatusCode.NotFound, new { AppUserRole = "Not found" });
                        }
                    }
                                                           
                    
                    foreach (XmlNode node in appDataNode.ChildNodes)
                    {
                        if(action.ToLower() == "new" || action.ToLower() == "update"  )
                        {
                            if (node.Name.ToLower() == "set")
                            {                                
                                foreach (XmlNode set in node.ChildNodes)
                                {
                                    string SetFiled = GetAttribureValue(set.Attributes, "Field");
                                    string FiledVal = set.InnerText;

                                    var dbCol = colList.Find( x => x.Title == SetFiled );
                                    PropertyInfo prop = type.GetProperty(dbCol.AppDataFiled);  

                                    if( dbCol.Type == "1" ){ //Text                                           
                                        prop.SetValue (appData, FiledVal, null);
                                    } 
                                    else if( dbCol.Type == "2" ){ //Int
                                        int dataVal;
                                        try{
                                            dataVal =  Int32.Parse(FiledVal); 
                                        }
                                        catch(Exception ex){
                                            throw new Exception("Invalid data filed " + SetFiled + ". " + ex.Message);
                                        }                                            
                                        prop.SetValue (appData, dataVal, null);
                                    }   
                                    else if( dbCol.Type == "3" ){ //Float
                                        float dataVal;
                                        try{                                                
                                            dataVal  = float.Parse( FiledVal);
                                        }
                                        catch(Exception ex){
                                            throw new Exception("Invalid data filed " + SetFiled + ". " + ex.Message);
                                        }                                            
                                        prop.SetValue (appData, dataVal, null);
                                    } 
                                    else if( dbCol.Type == "4" ){ //Bool
                                        bool dataVal;
                                        try{                                                
                                            dataVal  = bool.Parse( FiledVal);
                                        }
                                        catch(Exception ex){
                                            throw new Exception("Invalid data filed " + SetFiled + ". " + ex.Message);
                                        }                                            
                                        prop.SetValue (appData, dataVal, null);
                                    }
                                    // else if( dbCol.Type == "5" ){ //DateTime
                                    //     bool dataVal;
                                    //     try{                                                
                                    //         dataVal  = DateTime.Parse( FiledVal);
                                    //     }
                                    //     catch(Exception ex){
                                    //         throw new Exception("Invalid data filed " + SetFiled + ". " + ex.Message);
                                    //     }                                            
                                    //     prop.SetValue (appData, dataVal, null);
                                    // }                                                                                                                                                 
                                }                                
                            }
                        } 
                        else if(action.ToLower() == "query"  )
                        {
                            if (node.Name.ToLower() == "query")
                            {
                                foreach (XmlNode set in node.ChildNodes)
                                {
                                }                                
                            }
                        }
                    }

                    var success = false; 
                    if(action.ToLower() == "query" ){
                                                
                        if( !string.IsNullOrEmpty(id) )
                        {
                            XElement data = new XElement("Data");
                            data.Add(new XAttribute("Id", id));
                            foreach(AppColumnMaster col in colList){
                                data.Add(new XElement("item",
                                new XAttribute( "Field", col.Title ),
                                appData.GetType().GetRuntimeProperty(col.AppDataFiled)?.GetValue(appData) ));
                            }

                            xml.Add(new XElement("Data",
                                new XAttribute("Table", table),
                                data));                             
                        }   
                        else{
                            XmlNodeList qryNode = xmlDoc.GetElementsByTagName("Query");
                            string sql = ExecuteQuery(qryNode.Item(0).FirstChild, colList);

                            var appDataList = await _context.AppDatas
                                .FromSqlRaw( "SELECT * FROM AppDatas where  " + sql)
                                .ToListAsync(); 
                            
                             XElement DataList = new XElement("DataList");   
                             DataList.Add(new XAttribute("Table", table));  

                            foreach(var d in appDataList){     
                                XElement data = new XElement("Data");                               
                                data.Add(new XAttribute("Id", d.Id));

                                foreach(AppColumnMaster col in colList){
                                    data.Add(new XElement("item",
                                    new XAttribute( "Field", col.Title ),
                                    d.GetType().GetRuntimeProperty(col.AppDataFiled)?.GetValue(d) ));
                                }  

                                DataList.Add(data);                              
                          }                          
                          xml.Add(DataList); 
                        }                    
                    }  
                    else if(action.ToLower() == "new" ){

                        var dataVal = tableData.Id;
                        PropertyInfo prop = type.GetProperty("TableId"); 
                        prop.SetValue(appData, dataVal, null);

                        _context.AppDatas.Add(appData);
                        success = await _context.SaveChangesAsync() > 0;    
                    }
                    else if(action.ToLower() == "update" ){                                       
                        success = await _context.SaveChangesAsync() > 0;
                    }
                    if(action.ToLower() == "delete" ){
                        _context.Remove(appData);
                        success = await _context.SaveChangesAsync() > 0;
                    }
                }
                                                
                xml.Add(new XAttribute("Status", "Success"), new XAttribute("Table", "Customer"));
                           
                //if (success)
                {
                    var  toReturn = new AppDataDto();
                    toReturn.Col = xml.ToString();
                    toReturn.Val = "123";
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
            }

            private string GetAttribureValue(XmlAttributeCollection AttCol, string AttName)
            {           
                string AttValue = string.Empty;
                foreach (XmlAttribute att in AttCol)
                {
                    if (att.Name.ToLower() == AttName.ToLower())
                    {
                        AttValue = att.Value;
                    }
                }
                return AttValue;
            }

            public string ExecuteQuery(XmlNode item, List<AppColumnMaster> colList)
            {
                string result = string.Empty;

                string itemName = item.Name.ToLower();
                if (itemName == "and" || itemName == "or")
                {
                    string res = " ( ##LEFT_COND## " + itemName + " ##RIGHT_COND## ) ";
                    res = res.Replace("##LEFT_COND##" , ExecuteQuery(item.ChildNodes[0], colList) );
                    res = res.Replace("##RIGHT_COND##", ExecuteQuery(item.ChildNodes[1], colList) );
                
                    return res;
                }
                else if (itemName == "datacomarison")
                {
                    string res = string.Empty;
                    string Filed = item.Attributes["Field"].Value;
                    var dbCol = colList.Find( x => x.Title == Filed );
                    Filed = dbCol.AppDataFiled;


                    string Type = item.Attributes["Type"].Value.ToLower();
                                
                    if (item.Attributes["Operation"].Value.ToLower() == "in")
                    {
                        XmlNodeList values = item.FirstChild.ChildNodes;
                        foreach (XmlNode val in values)
                        {
                            string Value = val.InnerText;
                            if (Type.Equals("text"))
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
                        string opr = string.Empty;
                        switch ((item.Attributes["Operation"].Value.ToLower()))
                        {
                            case "eq":
                                opr = "=";
                                break;
                            case "ne":
                                opr = "!=";
                                break;
                            case "lt":
                                opr = ">";
                                break;
                            case "le":
                                opr = ">=";
                                break;
                            case "gt":
                                opr = "<";
                                break;
                            case "ge":
                                opr = ">=";
                                break;
                            default:
                                opr = "=";
                                break;
                        }

                        string Value = item.Attributes["Value"].Value;
                        if (Type.Equals("text"))
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
}
