using System.Collections.Generic;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace AppWebCustom
{
    public class ActionCommand : IRequest<Dictionary<string, List<object>>>
    {
        public int ActionId { get; set; }
        public string ActionUniqName { get; set; }
        public int ItemId { get; set; }  
        public string RequestType { get; set; }                          
        public string ReturnFlow { get; set; }                    
        public string Parm1 { get; set; }
        public string Parm2 { get; set; }
        public string Parm3 { get; set; }
        public string Parm4 { get; set; }
        public string Parm5 { get; set; }
        public string Parm6 { get; set; }            
        public string Parm7 { get; set; }
        public string Parm8 { get; set; }
        public string Parm9 { get; set; }
        public string Parm10 { get; set; }        
        public ICollection<IFormFile> FileList { get; set; }    
        public bool ReturnActions { get; set; }      
    }
}