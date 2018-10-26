
/**
 * 蛇基类
 */
class SankeBasic extends egret.Sprite {
	//成长值：根据这个值的变化，来加长蛇身
	public lif: number = 10;
	//皮肤类型
	public skinTyp: number = 1;
	public pathArr = new Array();
	//蛇数组
	public sheArr = new Array();
	public sheJg: number = 3;
	//蛇头
	public shetou: egret.Sprite = null;
	//速度
	public speedPoint: egret.Point = new egret.Point();

	public constructor(len: number = 4, initPoint: egret.Point = null, type: number = 1) {
		super();
		this.lif = len * Config.lifeSpeed;
		this.skinTyp = type;
		for (let i: number = 0; i < len; i++) {
			let mc: egret.Sprite;
			if (i == 0) {
				mc = new She(this.skinTyp, true);//蛇头
			} else {
				mc = new She(this.skinTyp);
			}

			if (initPoint != null) {
				mc.x = initPoint.x;
				mc.y = initPoint.y;
			}
			this.sheArr.push(mc);
			this.addChild(mc);
		}
		//蛇头等于第一个关节
		this.shetou = this.sheArr[0];

		//启动蛇移动
		this.addEventListener(egret.Event.ENTER_FRAME, this._ent, this)
	}

	private _ent(e) {
		//计算蛇头角度
		let shetouV: number = LuanMath.getV(0, 0, this.speedPoint.x, this.speedPoint.y);
		this.shetou.rotation = shetouV + 90;
		this.shetou.x += this.speedPoint.x;
		this.shetou.y += this.speedPoint.y;
		let touPoint: egret.Point = new egret.Point(this.shetou.x, this.shetou.y)
		this.pathArr.unshift(touPoint)
		for (let i = 1; i < this.sheArr.length; i++) {
			let idx: number = i * this.sheJg;
			if (idx < this.pathArr.length) {
				this.sheArr[i].rotation = LuanMath.getV(this.sheArr[i].x, this.sheArr[i].y, this.pathArr[idx].x, this.pathArr[idx].y) + 90;
				this.sheArr[i].x = this.pathArr[idx].x;
				this.sheArr[i].y = this.pathArr[idx].y;
			}
		}
		if (this.pathArr.length > this.sheArr.length * this.sheJg) {
			this.pathArr.pop();
		}
	}

	//设置蛇移动的速度
	public setMoveSpeed(p: egret.Point) {
		this.speedPoint = p;
	}

	//蛇吃东西
	public eatEgg() {
		this.lif++;
		let tl: number = Math.floor(this.lif / Config.lifeSpeed);
		if (this.sheArr.length < tl) {
			//蛇成长：蛇长+1
			let mc: She = new She(this.skinTyp);
			mc.x = this.sheArr[this.sheArr.length - 1].x;
			mc.y = this.sheArr[this.sheArr.length - 1].y;
			this.sheArr.push(mc);
			this.addChild(mc)
		}
		Data.score = this.sheArr.length;
	}

	//蛇停止移动
	public stopMove() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this._ent, this)
	}
}



