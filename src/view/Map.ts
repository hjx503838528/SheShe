
/**
 * 地图类
 */
class Map extends egret.Sprite {
	//所有蛇
	public snakeArray: Array<any> = new Array();
	//镜头跟随的蛇
	public cameraFollow: SankeBasic = null;
	//所有食物
	public foodArr: Array<any> = new Array();
	//
	public constructor() {
		super();
		this.setMap();
	}

	public setMap(): void {
		this.graphics.beginFill(0xFCF9F9, 1);
		this.graphics.drawRect(0, 0, Config.mapWidth, Config.mapHeight);
		this.graphics.endFill();
	}


	//将一条蛇添加进地图
	public addSnake(sk: SankeBasic) {
		this.addChild(sk);
		this.snakeArray.push(sk);
	}
	//将一条蛇移出地图
	public removeSnake(sk: SankeBasic) {
		for (var i = 0; i < this.snakeArray.length; i++) {
			if (this.snakeArray[i] == sk) {
				this.removeChild(this.snakeArray[i]);
				this.snakeArray.splice(i, 1);
				return;
			}
		}
	}
	//设置镜头跟随的蛇
	public setFollow(sk: SankeBasic) {
		this.cameraFollow = sk;
		// 启动镜头跟随
		this.addEventListener(egret.Event.ENTER_FRAME, this._cameraEnt, this);
	}
	//镜头跟随
	private _cameraEnt(e: Event) {
		if (this.cameraFollow != null) {
			//跟随的蛇对象不为Null,就开始让镜头跟随蛇头移动
			this.x = -this.cameraFollow.shetou.x + StageUtils.ins().getWidth() / 2;
			this.y = -this.cameraFollow.shetou.y + StageUtils.ins().getHeight() / 2;
		}
	}
	//添加一个食物
	public addFood(food: Food) {
		//食物永远显示在最底层
		this.addChildAt(food, 0);
		this.foodArr.push(food);
	}
	//移除一个食物
	public removeFood(food: Food) {

	}
	//清除所有食物
	public clearFood() {
		for (var s in this.foodArr) {
			this.removeChildAt(this.foodArr[s]);
			this.foodArr[s] = null;
		}
		this.foodArr = [];
	}
}
