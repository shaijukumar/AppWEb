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
        //Config.GetCongfigAsync("ApplicationConfig", "AttachmentPath" );
        public static async Task<string> GetCongfigAsync( string ConfigType, string ConfigName, DataContext _context, bool ThrowException )
        {   
            string val = string.Empty;  

            try{     

               var ty = await _context.AppConfigTypes
                    .Where(x => x.Title == ConfigType ).FirstOrDefaultAsync();

                if(ty == null )
                {
                    throw new Exception( $"Invalid Config type {ConfigType}.");                                                        
                }

                 var con = await _context.AppConfigs
                    .Where(x => x.Title == ConfigName ).FirstOrDefaultAsync();

                if(con == null )
                {
                    throw new Exception( $"Invalid Config Name {ConfigName}.");                                                        
                }

                return con.Det1;

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