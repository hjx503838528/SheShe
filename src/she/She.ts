/**
 * 蛇节点类
 */
class She extends egret.Sprite {
	public body: egret.Bitmap;
	public type: number = 1;
	public isTou: boolean = false;

	/**
	 * @param type 类型
	 * @param isTou 是否头
	 */
	public constructor(type: number, isTou?: boolean) {
		super();
		this.type = type;
		this.isTou = isTou;
		let resName: string = this.isTou ? `tou${this.type}` : `sheshen${this.type}`;
		this.body = new egret.Bitmap();
		this.body.texture = RES.getRes(resName);
		this.addChild(this.body);
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
	}

}