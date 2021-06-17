using System;
using System.Reflection;
using System.Xml;
using Application._AppApi;

namespace Application.AppEngine
{
    public class AppParm
    {
        public static string GetRequestParmValue( TakeAction.Command request, string ParmName)
        {   
            string paremVal = string.Empty;            
            Type type = request.GetType();            
            PropertyInfo prop = type.GetProperty(ParmName); 

            if(prop != null )
            {
                paremVal = prop.GetValue(request).ToString();                                                          
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