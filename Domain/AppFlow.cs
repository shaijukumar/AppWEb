using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Domain
{
    public class AppFlow
    {
      [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public int Id { get; set; }
      public string Title { get; set; }
      public int TableId { get; set; }            
      public virtual AppTableMaster Table { get; set; } 
    }
}

















