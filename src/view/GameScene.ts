/**
* 游戏场景类
*/
class GameScene extends egret.Sprite {
	//事件：游戏结束
	public static GAME_OVER: string = "GAME_OVER";
	//移动控制器
	public mCtrl: MoveCtrl = new MoveCtrl();
	//滚屏地图
	public sankeMap: Map = new Map();
	//蛇数组:用来存放和管理所有蛇
	public snakeArr = new Array();

	//主控对象：玩家控制的蛇
	public mainSnake: SankeBasic = null;
	public mainTyp: number = 1;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
	}

	private addtoStage(): void {
		this.mainTyp = Data.INDEX;
		//显示移动控制器
		this.mCtrl.x = 100;
		this.mCtrl.y = StageUtils.ins().getHeight() - 90;
		this.addChildAt(this.mCtrl, 1);
		//设置移动速度为5
		this.mCtrl.speed = 5;

		//创建1条初始位置是200,400,长度为10的蛇
		let sP: egret.Point = new egret.Point(Config.mapWidth / 2, Config.mapHeight / 2);
		let sMc: SankeBasic = new SankeBasic(10, sP, this.mainTyp);
		this.snakeArr.push(sMc);

		//初始化滚屏地图
		this.addChildAt(this.sankeMap, 0);
		//将蛇加入滚屏地图			
		this.sankeMap.addSnake(sMc);
		this.sankeMap.setFollow(sMc);
		//设置为主控蛇
		this.mainSnake = sMc;
		//添加100个食物
		for (let i: number = 0; i < 300; i++) {
			let fd: Food = new Food(i);
			fd.x = Math.random() * Config.mapWidth;
			fd.y = Math.random() * Config.mapHeight;
			this.sankeMap.addFood(fd);
		}
		//添加10条敌人的蛇
		for (let i: number = 0; i < 15; i++) {
			let aiP: egret.Point = new egret.Point(Math.random() * 1800 + 100, Math.random() * 1800 + 100);
			let aiSk: SankeAI = new SankeAI(5, aiP);
			this.snakeArr.push(aiSk);
			this.sankeMap.addSnake(aiSk);
			aiSk.setMap(this.sankeMap);
		}

		//启动游戏判断
		this.addEventListener(egret.Event.ENTER_FRAME, this._gameEnt, this);
		//恢复主控制器
		this.mCtrl.addEventListener(MoveCtrl.CHANGE, this._cge, this);
	}

	/**重新开始 */
	public rePlayGame() {
		this.mainTyp = Data.INDEX;
		this.clearGame();
		this.addtoStage();
	}



	//清除游戏资源
	public clearGame() {
		//卸载旧资源
		this.removeEventListener(egret.Event.ENTER_FRAME, this._gameEnt, this);
		for (let s in this.snakeArr) {
			let tsk: SankeBasic = this.snakeArr[s];
			if (tsk instanceof SankeAI) {
				tsk.stopAIMove();
			}
			tsk.stopMove()
			this.sankeMap.removeSnake(tsk);
			tsk = null;
			this.snakeArr[s] = null;
		}
		this.snakeArr = [];
		this.sankeMap.clearFood();
	}
	//当移动控制器发生改变
	private _cge(e: Event) {
		//将移动速度赋给蛇对象		
		if (this.mainSnake != null) {
			this.mainSnake.setMoveSpeed(this.mCtrl.speedPoint);
		}

	}
	//吃食物判断与碰撞判断
	private _gameEnt(e: Event) {
		//食物碰撞判断
		for (let s in this.snakeArr) {
			let tsk: SankeBasic = this.snakeArr[s];
			for (let i = 0; i < this.sankeMap.foodArr.length; i++) {

				let fd: Food = this.sankeMap.foodArr[i];
				let p1: egret.Point = new egret.Point(fd.x, fd.y);

				let p2: egret.Point = new egret.Point(tsk.shetou.x, tsk.shetou.y);

				//食物与蛇头直线距离小于5，就吃掉食物
				if (egret.Point.distance(p1, p2) < 15) {
					//蛇生长
					this.snakeArr[s].eatEgg();
					//食物重新随机到别的位置						
					fd.x = Math.random() * Config.mapWidth;
					fd.y = Math.random() * Config.mapHeight;
				}
			}
			//蛇头碰撞死亡判断
			this.snakeHit(tsk);
			//蛇头出界判断
			if (tsk.shetou.x < 0 || tsk.shetou.x > Config.mapWidth || tsk.shetou.y < 0 || tsk.shetou.y > Config.mapHeight) {
				this.snakeDie(tsk);
			}
		}
	}
	//碰撞判断
	private snakeHit(tsk: SankeBasic) {
		let p1: egret.Point = new egret.Point(tsk.shetou.x, tsk.shetou.y);
		for (let t in this.snakeArr) {
			//不是自己的身体
			if (this.snakeArr[t] != tsk) {
				for (let u in this.snakeArr[t].pathArr) {
					//let tmc:DisplayObject = snakeArr[t].sheArr[u];
					//获取蛇的路径数据，来判断是否碰撞
					let p2: egret.Point = this.snakeArr[t].pathArr[u];
					if (egret.Point.distance(p1, p2) < 10) {
						//死亡处理
						this.snakeDie(tsk);
						return;
					}
				}
			}

		}
	}
	//死亡处理
	private snakeDie(tsk: SankeBasic) {
		for (let i = 0; i < this.snakeArr.length; i++) {
			//是死亡的蛇：卸载，并移出数组
			if (this.snakeArr[i] == tsk) {
				if (tsk instanceof SankeAI) {
					tsk.stopAIMove();
				}
				tsk.stopMove()
				this.sankeMap.removeSnake(tsk);
				this.snakeArr.splice(i, 1);
				//如果死亡的是玩家的蛇：结束游戏
				if (i == 0) {
					this.mCtrl.removeEventListener(MoveCtrl.CHANGE, this._cge, this);
					this.dispatchEventWith(GameScene.GAME_OVER);
				}
				break;
			}
		}
	}

	private removeStage(): void {

	}
}