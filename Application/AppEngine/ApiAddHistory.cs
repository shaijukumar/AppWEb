using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Domain;
using Persistence;

namespace Application.AppEngine
{
    public class ApiAddHistory
    {
        public static async Task<bool> Execute(
            DataContext _context, 
            string Action,
            int FromStage,
            int ToStage,
            string CurrentUserId, 
            string Comment,                
            [Optional]string Details1,
            [Optional]string Details2,
            [Optional]string Details3,
            [Optional]string Details4,
            [Optional]string Details5
            )
        {
            bool res = true;

            


            var appHistory = new AppHistory
            {
                Action  = Action,
                FromStage  = FromStage,
                ToStage  = ToStage,
                ActionBy  = CurrentUserId,
                DateTime  = DateTime.Now,                           
            };

            if(string.IsNullOrEmpty(Comment)){
                appHistory.Comment  = Comment;
            }           

            if(string.IsNullOrEmpty(Details1)){
                appHistory.Details1  = Details1;
            }
            if(string.IsNullOrEmpty(Details1)){
                appHistory.Details2  = Details2;
            }
            if(string.IsNullOrEmpty(Details1)){
                appHistory.Details3  = Details3;
            }
            if(string.IsNullOrEmpty(Details1)){
                appHistory.Details4  = Details4;
            }
            if(string.IsNullOrEmpty(Details1)){
                appHistory.Details5  = Details5;
            }

            _context.AppHistorys.Add(appHistory);
            var success = await _context.SaveChangesAsync() > 0;


            return res;


        }
    }
}