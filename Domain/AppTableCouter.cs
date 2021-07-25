using System.ComponentModel.DataAnnotations;
namespace Domain
{
    public class AppTableCouter
    {
        [Key]
        public int TableId { get; set; }
        public long counter { get; set; }
        
    }
}