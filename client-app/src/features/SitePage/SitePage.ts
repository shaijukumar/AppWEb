import { IPageTag, PageTag } from "../PageTag/PageTag";

export interface ISitePage {
	Id: string
	Title: string
	CatId: string
	//PageTag: IPageTag[]
	Tags: string
	URLTitle: string
	PageHtml: string
}

export class SitePage implements ISitePage {
	Id: string = '';
	Title: string = '';
	CatId: string = '';
	//PageTag: IPageTag[] = [];
	Tags: string = '';
	TagList: IPageTag[] = [];
	URLTitle: string = '';
	PageHtml: string = '';
  
  constructor(init?: ISitePage) {
    Object.assign(this, init);
	this.TagList =  []; 
  }
}
 
