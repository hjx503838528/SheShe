/**
 * 主页
 */
class HomeScene extends eui.Component {
	public mainBtn: eui.Group;
	public titleCon: eui.Group;
	public goBtn: eui.Image;
	public skinCon: eui.Group;
	public list: eui.List;
	public isSelect: boolean;
	public gameScene: GameScene;//场景
	public gameOver: GameOver;//结束面板

	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
		this.percentHeight = 100;
		this.percentWidth = 100;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
	}

	public addtoStage(): void {
		this.goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClisk, this);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listClick, this);
		this.setList();

	}

	private setList(): void {
		this.list.itemRenderer = SheItem;
		this.list.dataProvider = new eui.ArrayCollection([0, 1, 2]);
	}

	private onClisk(e: egret.TouchEvent): void {
		switch (e.target) {
			case this.goBtn:
				this.setView();
				break;
		}
	}

	private listClick(e: eui.ItemTapEvent): void {
		Data.INDEX = e.itemIndex + 1;
		this.visible = false;
		if (!this.gameScene) {
			this.gameScene = new GameScene();
			StageUtils.ins().getUIStage().addChild(this.gameScene);
		} else {
			this.gameScene.visible = true;
			this.gameScene.rePlayGame();
		}
		this.gameScene.addEventListener(GameScene.GAME_OVER, this.over, this);
	}

	private over(): void {
		if (!this.gameOver) {
			this.gameOver = new GameOver();
			StageUtils.ins().getUIStage().addChild(this.gameOver);
			this.gameOver.rePlayBtn.addEventListener(GameOver.CLICK, (e: egret.TouchEvent) => {
				this.gameScene.rePlayGame();
				this.gameOver.visible = false;
			}, this);
			this.gameOver.homeBtn.addEventListener(GameOver.CLICK, (e: egret.TouchEvent) => {
				this.gameOver.visible = false;
				this.gameScene.visible = false;
				this.visible = true;
				this.setView();
			}, this);
		} else {
			this.gameOver.visible = true;
			this.gameOver.setData();
		}
	}

	//设置视图
	public setView(): void {
		this.skinCon.visible = !this.isSelect;
		this.goBtn.visible = this.isSelect;
		this.titleCon.visible = this.isSelect;
		this.isSelect = !this.isSelect;
	}


	//移除
	public removeStage(): void {
		this.goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClisk, this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listClick, this);
	}

}