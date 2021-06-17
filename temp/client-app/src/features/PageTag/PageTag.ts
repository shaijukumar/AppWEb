export interface IPageTag {
	Id: string
	Title: string
}

export class PageTag implements IPageTag {
	Id: string = '';
	Title: string = '';
  
  constructor(init?: IPageTag) {
    Object.assign(this, init);
  }
}

