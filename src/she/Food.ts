/**
 * 食物
 */
class Food extends egret.Sprite {
	public food: egret.Bitmap;
	public index: number = 1;

	public constructor(i: number) {
		super();
		this.index = i % 5 + 1;
		this.food = new egret.Bitmap();
		this.food.texture = RES.getRes(`food${this.index}`);
		this.addChild(this.food);
	}



}