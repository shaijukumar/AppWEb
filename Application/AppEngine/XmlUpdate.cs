using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppEngine
{
    static class XmlUpdate
    {        
        public static async Task<string> UpdateRole(string strXml, DataContext _context, bool UpdateId, string grps)
        {          
             string strGroups = string.Empty; 
            List<string> groups = new List<string>();
            string[] grpsArr = grps.Split(",");

            foreach( string gName in  grpsArr){
                if(!string.IsNullOrEmpty(gName)){
                    if(UpdateId)
                    {  
                        var role = await  _context.AspNetRoles
                            .Where( x => x.Name == gName.Trim() )
                            .FirstOrDefaultAsync();
                        if(role != null){
                            groups.Add(role.Id);
                        }                                                                                              
                    }
                    else{
                            var role = await  _context.AspNetRoles
                            .Where( x => x.Id == gName.Trim() )
                            .FirstOrDefaultAsync();
                        if(role != null){
                            groups.Add(role.Name);
                        }  
                    }                                                                                                
                    strGroups = string.Join( ",", groups.ToArray() ) ; 
                }                           
            }                         
           return strGroups;  
        }
        public static async Task<string> UpdateXml(string strXml, DataContext _context, bool UpdateId)
        {  
            if(string.IsNullOrEmpty(strXml)){
                return strXml;
            }
            
            strXml = HttpUtility.UrlDecode(strXml);
            XDocument xmlDoc = new XDocument();         
            try
            {
               xmlDoc = XDocument.Parse(strXml);
            }
            catch (Exception ex)
            {
                throw new Exception("Invalid qury XML. " + ex.Message);
            }
            

            foreach (XElement node in xmlDoc.Descendants())
            {                
                if (node.Name == "UserRoles")
                {        
                    node.Value = await UpdateRole(strXml, _context, UpdateId, node.Value);                                                     
                    // string s = node.Value;
                    // string rs = string.Empty;
                    // string[] roleList = s.Split(",");
                    // foreach (string r in roleList)
                    // {
                    //     if (!string.IsNullOrEmpty(rs))
                    //     {
                    //         rs += ", ";
                    //     }
                    //     if(UpdateId){
                    //         var tableData = await _context.AppUserRoleMasters
                    //             .Where( x => x.Title == r).FirstOrDefaultAsync();

                    //         try{
                    //             rs += tableData.Id;
                    //         }
                    //         catch (Exception ex)
                    //         {
                    //             throw new Exception("User Group " + r + " not found" + ex.Message);
                    //         }
                            
                    //     }
                    //     else{
                    //         var tableData = await _context.AppUserRoleMasters
                    //             .Where( x => x.Id == Int32.Parse(r) ).FirstOrDefaultAsync();
                            
                    //         try{
                    //             rs += tableData.Title;
                    //         }
                    //         catch (Exception ex)
                    //         {
                    //             throw new Exception("User Group id " + r + " not found" + ex.Message);
                    //         }
                    //     }                                               
                    // }
                    // node.Value = rs;
                }



                foreach (XAttribute att in node.Attributes())
                {       
                              
                    if(att.Name == "Filed")
                    {
                        if(att.Value == "Id" || att.Value == "StatusId" || att.Value == "CreatedBy" || att.Value == "CreatedOn" || att.Value == "ModifiedBy"|| att.Value == "ModifiedOn")
                        {
                            //no change
                        }   
                        else if(UpdateId)
                        {
                            var tableData = await _context.AppColumnMasters
                                .Where( x => x.Title == att.Value).FirstOrDefaultAsync();

                            if( tableData == null  ){
                                throw new Exception("Filed " + att.Value + " not found" );
                            }

                            try{
                                    att.Value = tableData.Id.ToString();
                            }
                            catch (Exception ex)
                            {
                                throw new Exception("Filed " + att.Value + " not found." + ex.Message  );
                            }
                        }
                        else
                        {
                            var tableData = await _context.AppColumnMasters
                                .Where( x => x.Id == Int32.Parse(att.Value)).FirstOrDefaultAsync();

                            if( tableData == null  ){
                                throw new Exception("Filed " + att.Value + " not found" );
                            }

                            try{
                                att.Value = tableData.Title;
                            }
                            catch (Exception ex)
                            {
                                throw new Exception("Filed " + att.Value + " not found. " + ex.Message );
                            }
                        }                        
                    }
                    else if(att.Name == "UserRolesToCheck"){

                        att.Value = await UpdateRole(strXml, _context, UpdateId, att.Value);
                        // var grps = att.Value;
                        // string strGroups = string.Empty;
                        // List<string> groups = new List<string>();
                        // string[] grpsArr = grps.Split(",");

                        // foreach( string gName in  grpsArr){
                        //     if(!string.IsNullOrEmpty(gName)){
                        //         if(UpdateId)
                        //         {  
                        //             var role = await  _context.AspNetRoles
                        //                 .Where( x => x.Name == gName.Trim() )
                        //                 .FirstOrDefaultAsync();
                        //             if(role != null){
                        //                 groups.Add(role.Id);
                        //             }                                                                                              
                        //         }
                        //         else{
                        //              var role = await  _context.AspNetRoles
                        //                 .Where( x => x.Id == gName.Trim() )
                        //                 .FirstOrDefaultAsync();
                        //             if(role != null){
                        //                 groups.Add(role.Name);
                        //             }  
                        //         }                                                                                                
                        //         strGroups = string.Join( ",", groups.ToArray() ) ; 
                        //     }                           
                        // }                         
                        // att.Value = strGroups;                        
                    }                  
                }
            }
            
            StringWriter sw = new StringWriter();
            XmlTextWriter xw = new XmlTextWriter(sw);
            xmlDoc.WriteTo(xw);
            return PrettyXml(sw.ToString());
        }
        public static string PrettyXml(string xml)
        {
            var stringBuilder = new StringBuilder();

            var element = XElement.Parse(xml);

            var settings = new XmlWriterSettings();
            settings.OmitXmlDeclaration = true;
            settings.Indent = true;
            settings.NewLineOnAttributes = true;

            using (var xmlWriter = XmlWriter.Create(stringBuilder, settings))
            {
                element.Save(xmlWriter);
            }

            return stringBuilder.ToString();
        }
    }
}