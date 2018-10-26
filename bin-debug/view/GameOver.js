var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏结束棉被
 */
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameOverSkin";
        _this.left = _this.right = _this.top = _this.bottom = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeStage, _this);
        return _this;
    }
    GameOver.prototype.addtoStage = function () {
        this.rePlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.setData();
    };
    GameOver.prototype.setData = function () {
        this.lenTxt.text = "" + Data.score;
    };
    GameOver.prototype.onClick = function (e) {
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
    };
    //移除
    GameOver.prototype.removeStage = function () {
        this.rePlayBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.homeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    GameOver.CLICK = "click";
    return GameOver;
}(eui.Component));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map