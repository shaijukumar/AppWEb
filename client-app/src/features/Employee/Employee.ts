export interface IEmployee {
	Id: number
	FirstName: string
	// CIF: number
	// StatusId: number
	// ApprovalComment: string
	// InitAttachment?: IAttachmentDetails[];
	// FlowAttachment?: IAttachmentDetails[];
	// AppHistory : History[]
}

export class Employee implements IEmployee {
	Id: number = 0;
	FirstName: string = '';
	// CIF: number = 0;
	// StatusId: number = 0;
	// ApprovalComment:  string = '';
	// InitAttachment: IAttachmentDetails[] = [];
	// FlowAttachment: IAttachmentDetails[] = [];
	// AppHistory : History[] = [];
	
  constructor(init?: IEmployee) {
    Object.assign(this, init);
  }
}