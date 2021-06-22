using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppData
    {
        [Key]
      	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	  	public int Id { get; set; }
        public int TableId { get; set; }
        public int StatusId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string Txt1 { get; set; }
        public string Txt2 { get; set; }
        public string Txt3 { get; set; }
        public string Txt4 { get; set; }
        public string Txt5 { get; set; }
        public string Txt6 { get; set; }
        public string Txt7 { get; set; }
        public string Txt8 { get; set; }
        public string Txt9 { get; set; }
        public string Txt10 { get; set; }
        public string Txt11 { get; set; }
        public string Txt12 { get; set; }
        public string Txt13 { get; set; }
        public string Txt14 { get; set; }
        public string Txt15 { get; set; }
        public string Txt16 { get; set; }
        public string Txt17 { get; set; }
        public string Txt18 { get; set; }
        public string Txt19 { get; set; }
        public string Txt20 { get; set; }
        public string Txt21 { get; set; }
        public string Txt22 { get; set; }
        public string Txt23 { get; set; }
        public string Txt24 { get; set; }
        public string Txt25 { get; set; }
        public int Num1 { get; set; }
        public int Num2 { get; set; }
        public int Num3 { get; set; }
        public int Num4 { get; set; }
        public int Num5 { get; set; }
        public int Num6 { get; set; }
        public int Num7 { get; set; }
        public int Num8 { get; set; }
        public int Num9 { get; set; }
        public int Num10 { get; set; }
        public float Float1 { get; set; }
        public float Float2 { get; set; }
        public float Float3 { get; set; }
        public float Float4 { get; set; }
        public float Float5 { get; set; }
        public float Float6 { get; set; }
        public float Float7 { get; set; }
        public float Float8 { get; set; }
        public float Float9 { get; set; }
        public float Float10 { get; set; }
        public bool Bool1 { get; set; }
        public bool Bool2 { get; set; }
        public bool Bool3 { get; set; }
        public bool Bool4 { get; set; }
        public bool Bool5 { get; set; }
        public bool Bool6 { get; set; }
        public bool Bool7 { get; set; }
        public bool Bool8 { get; set; }
        public bool Bool9 { get; set; }
        public bool Bool10 { get; set; }
        public DateTime DateTime1 { get; set; }
        public DateTime DateTime2 { get; set; }
        public DateTime DateTime3 { get; set; }
        public DateTime DateTime4 { get; set; }
        public DateTime DateTime5 { get; set; }
        public DateTime DateTime6 { get; set; }
        public DateTime DateTime7 { get; set; }
        public DateTime DateTime8 { get; set; }
        public DateTime DateTime9 { get; set; }
        public DateTime DateTime10 { get; set; }        
        public DateTime DateTime11 { get; set; }
        public DateTime DateTime12 { get; set; }
        public DateTime DateTime13 { get; set; }
        public DateTime DateTime14 { get; set; }
        public DateTime DateTime15 { get; set; }
        public int Config1 { get; set; }
        public int Config2 { get; set; }
        public int Config3 { get; set; }
        public int Config4 { get; set; }
        public int Config5 { get; set; }
        public int Config6 { get; set; }
        public int Config7 { get; set; }
        public int Config8 { get; set; }
        public int Config9 { get; set; }
        public int Config10 { get; set; }
        public int Attachment1 { get; set; }
        public int Attachment2 { get; set; }        
        public int Attachment3 { get; set; }
        public int Attachment4 { get; set; }
        public int Attachment5 { get; set; }
    }
}