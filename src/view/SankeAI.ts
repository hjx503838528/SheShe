

/**
 * 带有AI的蛇
 */
class SankeAI extends SankeBasic {
	public mapObject: Map = null;
	public constructor(n: number = 4, initP: egret.Point = null) {
		super(n, initP);

	}
	//设置地图对象：有了地图对象，才会启动AI
	public setMap(mp: Map) {
		this.mapObject = mp;
		this.startMove();
	}
	public startMove() {
		this.AImode = 1;
		this.addEventListener(egret.Event.ENTER_FRAME, this._AIEnt, this);
	}
	public stopAIMove() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this._AIEnt, this);
	}
	//AI
	private AImode: number = 0;
	private mbFood: egret.DisplayObject = null;
	private foodPoint: egret.Point = new egret.Point();
	private _AIEnt(e: Event) {
		switch (this.AImode) {
			case 0:
				break;
			case 1:
				//方向移动判断
				//在地图随机一个食物目标
				var max: number = this.mapObject.foodArr.length;
				if (max > 0) {
					var rd: number = Math.floor(Math.random() * max);
					this.mbFood = this.mapObject.foodArr[rd];
					this.foodPoint.x = this.mbFood.x;
					this.foodPoint.y = this.mbFood.y;
					this.AImode = 2;
				}

				break;
			case 2:
				//移动					
				var sArr = LuanMath.Vspeed(this.shetou.x, this.shetou.y, this.foodPoint.x, this.foodPoint.y, 5);
				var sPoint: egret.Point = new egret.Point(sArr[0], sArr[1]);
				this.setMoveSpeed(sPoint);
				//如果吃到目标食物：切换为1
				if (this.foodPoint.x != this.mbFood.x || this.foodPoint.y != this.mbFood.y) {
					this.AImode = 1;
				}
				//躲避障碍AI：暂无
				break;
		}
	}
}

