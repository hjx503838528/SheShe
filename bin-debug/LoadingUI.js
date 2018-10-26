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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.stageW = StageUtils.ins().getWidth();
        this.stageH = StageUtils.ins().getHeight();
        this.con = new egret.DisplayObjectContainer;
        this.con.x = this.stageW >> 1;
        this.con.y = this.stageH >> 1;
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 120;
        this.textField.height = 50;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.textField.x = this.stageW / 2 - this.textField.width / 2;
        this.textField.y = this.stageH / 2 - this.textField.height / 2;
        this.textField.textColor = 0x7c736a;
        var angle = 0;
        var num = 0.1;
        var dot;
        for (var i = 0; i < 10; i++) {
            dot = new egret.Shape;
            dot.graphics.beginFill(0x7c736a, num);
            dot.graphics.drawCircle(0, 0, 8);
            dot.graphics.endFill();
            dot.anchorOffsetX = -60;
            dot.anchorOffsetY = dot.height >> 1;
            dot.rotation = angle;
            this.con.addChild(dot);
            angle += 36;
            num += 0.1;
        }
        this.addChild(this.con);
        this.addEventListener(egret.Event.ENTER_FRAME, this.upLoadingData, this);
        // this.bgImg = new egret.ImageLoader();
        // this.bgImg.once(egret.Event.COMPLETE, (e: egret.Event) => {
        //     let loader: egret.ImageLoader = e.currentTarget;
        //     let bmd: egret.BitmapData = loader.data;
        //     let texture: egret.Texture = new egret.Texture();
        //     texture._setBitmapData(bmd);
        //     let bitmap = new egret.Bitmap(texture);
        //     bitmap.width = this.stageW;
        //     bitmap.height = this.stageH;
        //     this.addChildAt(bitmap, 0);
        // }, this);
        // this.bgImg.load("resource/game/bg.jpg");
        // RES.getResByUrl('resource/game/bg.jpg', (data, url) => {
        //     let bt: egret.Bitmap = new egret.Bitmap();
        //     bt.texture = data;
        //     bt.width = stageW;
        //     bt.height = stageH;
        //     this.addChildAt(bt, 0);
        // }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    LoadingUI.prototype.upLoadingData = function () {
        this.con.rotation += 36;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var progress = Math.floor((current / total) * 100);
        this.textField.text = progress + "%";
        // FBInstant.setLoadingProgress(progress);
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map