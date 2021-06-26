using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Application._AppApi
{
    public class AppApiDto
    {
      public int Id { get; set; }      
      public Dictionary<string, List<object>> Result { get; set; }
      public FileContentResult file { get; set; }
                       
    }
}
