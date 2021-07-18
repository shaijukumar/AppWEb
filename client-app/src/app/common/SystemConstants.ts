export class SystemConstant {
	Id : string = '';
	value: string = '';	
	descriptyion: string = '';
}

export const ColumnDataType : SystemConstant[] = 
[  
    {Id : "1", value : 'Text', descriptyion : 'Text'}, 
    {Id : "2", value : 'Number', descriptyion : 'Number'},
    {Id : "3", value : 'Float', descriptyion : 'Float'},
    {Id : "4", value : 'Bool', descriptyion : 'Bool'}, 
    {Id : "5", value : 'DateTime', descriptyion : 'DateTime'}, 
    {Id : "6", value : 'Config', descriptyion : 'Config'},
    {Id : "7", value : 'Attachment', descriptyion : 'Attachment'},
    {Id : "8", value : 'LongNumber', descriptyion : 'Long Number'},
    {Id : "9", value : 'Users', descriptyion : 'User List'},
    {Id : "10", value : 'Groups', descriptyion : 'Group List'},
]

export const ColumnAttachmentType : SystemConstant[] = 
[  
    {Id : "1", value : 'Create Edit Delete', descriptyion : 'Create/Edit/Delete'}, 
    {Id : "2", value : 'NoDelete', descriptyion : 'NoDelete'}, 
    {Id : "3", value : 'CreaterOnlyDelete', descriptyion : 'CreaterOnlyDelete'},
]