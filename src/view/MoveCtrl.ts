/**
 * 
 */
class MoveCtrl extends egret.Sprite {
	//事件：当移动控制器发生改变，广播事件
	public static CHANGE: string = "CHANGE";
	//移动速度
	public speed: number = 0;
	//输出的x,y轴速度
	public speedPoint: egret.Point = new egret.Point(0, 0);

	public size: number = 150;
	public contorlBg: egret.Sprite;
	public contorl: egret.Sprite;
	public r: number;
	public w: number;
	public h: number;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
	}

	public addtoStage() {
		this.creatCircle();
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
	}


	public creatCircle(): void {
		this.r = this.size / 2;
		this.graphics.beginFill(0x999999, 0.8);
		this.graphics.drawCircle(0, 0, this.r);
		this.graphics.endFill();

		this.contorl = new egret.Sprite();
		this.contorl.graphics.beginFill(0xFFFF33, 1);
		this.contorl.graphics.drawCircle(0, 0, 24);
		this.contorl.graphics.endFill();
		this.addChild(this.contorl);

		this.w = this.width / 2;
		this.h = this.height / 2;
	}


	private onClick(e: egret.TouchEvent): void {
		switch (e.type) {
			case egret.TouchEvent.TOUCH_BEGIN:
				this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this);
				this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
				this._move(e);
				break;
			case egret.TouchEvent.TOUCH_MOVE:
				this._move(e);
				break;
			case egret.TouchEvent.TOUCH_END:
				this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this);
				this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
				this.contorl.x = 0;
				this.contorl.y = 0;
				break;
		}

	}


	//球跟随手指
	public _move(e: egret.TouchEvent) {
		this.contorl.x = e.stageX - this.x;
		this.contorl.y = e.stageY - this.y;
		//出界判断：控制球不能移出范围
		let po1: egret.Point = this.localToGlobal(0, 0);
		let po2: egret.Point = this.localToGlobal(this.contorl.x, this.contorl.y);
		let disX: number = po1.x - po1.x;
		let disY: number = po2.y - po2.y;
		let dis: number = egret.Point.distance(po1, po2)
		let maxDis: number = this.r - this.contorl.width / 2 - 5;
		if (dis > maxDis || e.target != this) {
			let arr: number[] = LuanMath.Vspeed(po1.x, po1.y, po2.x, po2.y, maxDis)
			this.contorl.x = arr[0];
			this.contorl.y = arr[1];
		}
		//计算速度			
		let arr2: number[] = LuanMath.Vspeed(po1.x, po1.y, po2.x, po2.y, this.speed);
		this.speedPoint.x = arr2[0];
		this.speedPoint.y = arr2[1];
		// //广播改变速度事件
		this.dispatchEventWith(MoveCtrl.CHANGE);
		// trace(speedPoint);
	}

	//移除舞台
	private removeStage(): void {
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
	}
}
