export interface IPageTag {
	Id : string
	value: string
	label: string
}

export class PageTag implements IPageTag {
	Id : string = '';
	value: string = '';	
	label: string = '';
  
  constructor(init?: IPageTag) {
    Object.assign(this, init);
  }
}