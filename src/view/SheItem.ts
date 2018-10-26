/**
 * 蛇
 */
class SheItem extends eui.ItemRenderer {
	public bg: eui.Rect;
	public topRect: eui.Rect;
	public leftRect: eui.Rect;
	public rightRect: eui.Rect;
	public bottomRect: eui.Rect;
	public sheCon: eui.Group;
	public shen4: eui.Image;
	public shen3: eui.Image;
	public shen2: eui.Image;
	public shen1: eui.Image;
	public touImg: eui.Image;


	public constructor() {
		super();
		this.skinName = "SheItemSkin";
	}

	public dataChanged(): void {
		let data: number = this.data;
		let index: number = this.itemIndex + 1;
		this.touImg.source = `tou${index}`;
		this.shen1.source = this.shen2.source = this.shen3.source = this.shen4.source = `sheshen${index}`;

	}


}