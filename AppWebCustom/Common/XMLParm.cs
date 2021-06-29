using System;
using System.Reflection;
using System.Xml;

namespace AppWebCustom.Common
{
    public class XMLParm
    {
        public static string GetRequestParmValue( ActionCommand request, string ParmName, bool ThrowException=true )
        {   
            string paremVal = string.Empty;  

            try{          
            Type type = request.GetType();            
            PropertyInfo prop = type.GetProperty(ParmName); 

            if(prop != null )
            {
                paremVal = prop.GetValue(request).ToString();                                                          
            }
            }
            catch(Exception ex){
                if(ThrowException){
                    throw new Exception( $"Invalid attribure value {ParmName}. {ex.Message} ");
                }
            }

            return paremVal;
        }

         public static string GetAttributeValue( XmlNode  Item, string AtteName, bool ThrowException=true  )
         {
            string AttValue = string.Empty;
            
            
             if(  Item.Attributes[AtteName] != null)
             {
                 AttValue = Item.Attributes[AtteName].Value;                  
             }
             

             if(string.IsNullOrEmpty(AttValue) && ThrowException)
             {
                  throw new Exception( "Invalid attribure " + AtteName + " for " + Item.Name );
             }

            return AttValue;
         }
    }
}