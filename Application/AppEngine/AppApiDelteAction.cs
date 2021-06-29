using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml;
using Application._AppApi;
using Domain;
using Persistence;
using AppWebCustom;

namespace Application.AppEngine
{
    public class AppApiDelteAction
    {
        // public static async Task<Dictionary<string, List<object>>> Execute(AppAction appAction, AppData appData, XmlNode actionNode, DataContext _context, ActionCommand request)
        // {
        //     Dictionary<string, List<object>> result = new Dictionary<string, List<object> >();
                        
        //     string InPutParm = AppParm.GetAttributeValue( actionNode, "IdParm", true ) ;
        //     string IdParm  = AppParm.GetRequestParmValue( request, InPutParm);
            
        //     // var appData = await _context.AppDatas
        //     //     .FindAsync(Int32.Parse(IdParm));

        //     if (appData == null)
        //         throw new Exception("AppData Not found for ID " + IdParm);            

        //     _context.Remove(appData);

        //     var success = await _context.SaveChangesAsync() > 0;

        //     List<object> actionResult = new List<object>();
        //     if (success) {
        //         actionResult.Add("Deleted, Id : " +  IdParm);                
        //     }
        //     else{
        //         actionResult.Add("Error in delete, Id : " +  IdParm);
        //     }                         
        //     result.Add("Result"+ (result.Count+1).ToString(), actionResult );    

        //     return result;      
        // }
    }
}