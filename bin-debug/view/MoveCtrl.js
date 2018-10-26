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
 *
 */
var MoveCtrl = (function (_super) {
    __extends(MoveCtrl, _super);
    function MoveCtrl() {
        var _this = _super.call(this) || this;
        //移动速度
        _this.speed = 0;
        //输出的x,y轴速度
        _this.speedPoint = new egret.Point(0, 0);
        _this.size = 150;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeStage, _this);
        return _this;
    }
    MoveCtrl.prototype.addtoStage = function () {
        this.creatCircle();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
    };
    MoveCtrl.prototype.creatCircle = function () {
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
    };
    MoveCtrl.prototype.onClick = function (e) {
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
    };
    //球跟随手指
    MoveCtrl.prototype._move = function (e) {
        this.contorl.x = e.stageX - this.x;
        this.contorl.y = e.stageY - this.y;
        //出界判断：控制球不能移出范围
        var po1 = this.localToGlobal(0, 0);
        var po2 = this.localToGlobal(this.contorl.x, this.contorl.y);
        var disX = po1.x - po1.x;
        var disY = po2.y - po2.y;
        var dis = egret.Point.distance(po1, po2);
        var maxDis = this.r - this.contorl.width / 2 - 5;
        if (dis > maxDis || e.target != this) {
            var arr = LuanMath.Vspeed(po1.x, po1.y, po2.x, po2.y, maxDis);
            this.contorl.x = arr[0];
            this.contorl.y = arr[1];
        }
        //计算速度			
        var arr2 = LuanMath.Vspeed(po1.x, po1.y, po2.x, po2.y, this.speed);
        this.speedPoint.x = arr2[0];
        this.speedPoint.y = arr2[1];
        // //广播改变速度事件
        this.dispatchEventWith(MoveCtrl.CHANGE);
        // trace(speedPoint);
    };
    //移除舞台
    MoveCtrl.prototype.removeStage = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClick, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    //事件：当移动控制器发生改变，广播事件
    MoveCtrl.CHANGE = "CHANGE";
    return MoveCtrl;
}(egret.Sprite));
__reflect(MoveCtrl.prototype, "MoveCtrl");
//# sourceMappingURL=MoveCtrl.js.map