using System;
using System.Linq;
using System.Threading.Tasks;
using Application._AppApi;
using Application.Errors;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application._AppApi.TakeAction;

namespace Application.AppEngine
{
    
    public class GetApiDetails
    {
         public static async Task<ApiDetails> Execute( int ActionId, int ItemId, DataContext _context, string CurrentUserId, UserManager<AppUser> _userManager)
         {     
             ApiDetails apiDetails = new ApiDetails(ActionId, ItemId, _context, CurrentUserId, _userManager );
             apiDetails.appData = new AppData();

             # region Get action details from db

             apiDetails.appAction = await _context.AppActions
                    .Where(x => x.Id == ActionId  ).FirstOrDefaultAsync();

            if ( apiDetails.appAction == null )
                throw new Exception("invalid Action");

            # endregion Get action details from db

            # region check FromStatus 

            if(  apiDetails.appAction.ActionType == "Action" )
            {
                if(ItemId != 0){
                    apiDetails.appData = await _context.AppDatas
                        .Where(x => x.Id ==  ItemId).FirstOrDefaultAsync(); 

                    if( apiDetails.appData == null ){
                        throw new Exception("Invalid ItemId");
                    }    

                    if( apiDetails.appAction.FromStatusList.Count == 0 && !apiDetails.appAction.FromStatusList.Any( s => s.Id ==  apiDetails.appData.StatusId)  ){
                        throw new Exception("Invalid from status");
                    }                    
                }
                else if(!apiDetails.appAction.InitStatus){
                    throw new Exception("Invalid from status");
                }
            }                

            # endregion check FromStatus

            # region check when

            if (!await ApiAppWhen.Execute(apiDetails.appAction, _context, CurrentUserId )){
                throw new Exception("Unauthorized");
            }

            # endregion check when


            return apiDetails;
         }
    }
}