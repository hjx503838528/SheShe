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
 * 主页
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSceneSkin";
        _this.percentHeight = 100;
        _this.percentWidth = 100;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeStage, _this);
        return _this;
    }
    HomeScene.prototype.addtoStage = function () {
        this.goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClisk, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listClick, this);
        this.setList();
    };
    HomeScene.prototype.setList = function () {
        this.list.itemRenderer = SheItem;
        this.list.dataProvider = new eui.ArrayCollection([0, 1, 2]);
    };
    HomeScene.prototype.onClisk = function (e) {
        switch (e.target) {
            case this.goBtn:
                this.setView();
                break;
        }
    };
    HomeScene.prototype.listClick = function (e) {
        Data.INDEX = e.itemIndex + 1;
        this.visible = false;
        if (!this.gameScene) {
            this.gameScene = new GameScene();
            StageUtils.ins().getUIStage().addChild(this.gameScene);
        }
        else {
            this.gameScene.visible = true;
            this.gameScene.rePlayGame();
        }
        this.gameScene.addEventListener(GameScene.GAME_OVER, this.over, this);
    };
    HomeScene.prototype.over = function () {
        var _this = this;
        if (!this.gameOver) {
            this.gameOver = new GameOver();
            StageUtils.ins().getUIStage().addChild(this.gameOver);
            this.gameOver.rePlayBtn.addEventListener(GameOver.CLICK, function (e) {
                _this.gameScene.rePlayGame();
                _this.gameOver.visible = false;
            }, this);
            this.gameOver.homeBtn.addEventListener(GameOver.CLICK, function (e) {
                _this.gameOver.visible = false;
                _this.gameScene.visible = false;
                _this.visible = true;
                _this.setView();
            }, this);
        }
        else {
            this.gameOver.visible = true;
            this.gameOver.setData();
        }
    };
    //设置视图
    HomeScene.prototype.setView = function () {
        this.skinCon.visible = !this.isSelect;
        this.goBtn.visible = this.isSelect;
        this.titleCon.visible = this.isSelect;
        this.isSelect = !this.isSelect;
    };
    //移除
    HomeScene.prototype.removeStage = function () {
        this.goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClisk, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.listClick, this);
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
//# sourceMappingURL=HomeScene.js.map