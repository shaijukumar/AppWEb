using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppUserRole
    {
      [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public int Id { get; set; }
      public string UserId { get; set; }
      public int AppUserRoleMasterId { get; set; }
      //public virtual AppUser user { get; set; }
      //public virtual AppUserRoleMaster role { get; set; }
    }
}

















