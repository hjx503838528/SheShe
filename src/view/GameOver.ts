/**
 * 游戏结束棉被
 */
class GameOver extends eui.Component {
	public static CLICK: string = "click";
	public lenTxt: eui.Label;
	public rePlayBtn: eui.Button;
	public homeBtn: eui.Button;
	public rankBtn: eui.Button;

	public constructor() {
		super();
		this.skinName = "GameOverSkin";
		this.left = this.right = this.top = this.bottom = 0;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
	}

	private addtoStage(): void {
		this.rePlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.setData();
	}

	public setData(): void {
		this.lenTxt.text = `${Data.score}`;
	}

	public onClick(e: egret.TouchEvent): void {
		switch (e.target) {
			case this.rePlayBtn:
				this.rePlayBtn.dispatchEventWith(GameOver.CLICK);
				break;
			case this.homeBtn:
				this.homeBtn.dispatchEventWith(GameOver.CLICK);
				break;
			case this.rankBtn:
				this.dispatchEventWith(GameOver.CLICK);
				break;
		}
	}

	//移除
	private removeStage(): void {
		this.rePlayBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.homeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
}