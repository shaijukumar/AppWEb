using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Xml;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace AppWebCustom.Common
{
    public class Config
    {
        
        public static async Task<string> GetCongfigAsync( string ConfigType, string ConfigName, DataContext _context, bool ThrowException )
        {   
            string val = string.Empty;  

            try{     

               var ty = await _context.AppConfigTypes
                    .Where(x => x.Title == ConfigType ).FirstOrDefaultAsync();

                // Type type = request.GetType();            
                // PropertyInfo prop = type.GetProperty(ParmName); 

                // if(prop != null )
                // {
                //     paremVal = prop.GetValue(request).ToString();                                                          
                // }
            }
            catch(Exception ex){
                if(ThrowException){
                    throw new Exception( $"Invalid Config {ConfigName}. {ex.Message} ");
                }
            }

            return val;
        }

        
    }
}