using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppStatusList
    {
      public AppStatusList()
      {
        this.ActionList = new HashSet<AppAction>();
      }

      [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public int Id { get; set; }
      public string Title { get; set; }
      public int Order { get; set; }	
      public int TableId { get; set; }
      public virtual ICollection<AppAction> ActionList { get; set; }      
    }
}

















