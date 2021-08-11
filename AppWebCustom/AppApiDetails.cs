using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class ApiDetails
{
    public int ActionId { get; set; }
    public string ActionUniqName { get; set; }
    public int ItemId { get; set; }            
    public string CurrentUserId { get; set; } 
    public AppAction appAction { get; set; }
    public AppData appData { get; set; }
    public List<AppColumnMaster> appColumns{ get; set; }
     public List<IdentityRole> userRolesIDList { get; set; }
    public DataContext _context { get; set; }   
    public UserManager<AppUser> _userManager { get; set; }

        
    public ApiDetails(string ActionUniqName, int ActionId , int ItemId, DataContext _context, string CurrentUserId, UserManager<AppUser> _userManager){
       this.ActionUniqName = ActionUniqName;
       this.ActionId = ActionId;
       this.ItemId = ItemId;
       this._context = _context;
       this.CurrentUserId = CurrentUserId;
       this._userManager = _userManager;
    }

    public async Task<List<IdentityRole>> GetUserRolesIDList(){

        if(userRolesIDList == null){
            AppUser user = await _userManager.FindByNameAsync(CurrentUserId);                
            var rolesNames = await _userManager.GetRolesAsync(user);
            userRolesIDList = await  _context.AspNetRoles.Where( x => rolesNames.Contains(x.Name) ).ToListAsync();
        }
        return this.userRolesIDList;
    }
        
}