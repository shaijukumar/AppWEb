using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppWebCustom;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class ApiDetails
{
    public int ActionId { get; set; }
    public int ItemId { get; set; }        
    public DataContext _context { get; set; }
    public string CurrentUserId { get; set; } 
    public AppAction appAction { get; set; }
    public AppData appData { get; set; }
    public List<AppColumnMaster> appColumns{ get; set; }

    public ApiDetails(int ActionId , int ItemId, DataContext _context, string CurrentUserId){
       this.ActionId = ActionId;
       this.ItemId = ItemId;
       this._context = _context;
       this.CurrentUserId = CurrentUserId;
    }
        
}