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
 * 带有AI的蛇
 */
var SankeAI = (function (_super) {
    __extends(SankeAI, _super);
    function SankeAI(n, initP) {
        if (n === void 0) { n = 4; }
        if (initP === void 0) { initP = null; }
        var _this = _super.call(this, n, initP) || this;
        _this.mapObject = null;
        //AI
        _this.AImode = 0;
        _this.mbFood = null;
        _this.foodPoint = new egret.Point();
        return _this;
    }
    //设置地图对象：有了地图对象，才会启动AI
    SankeAI.prototype.setMap = function (mp) {
        this.mapObject = mp;
        this.startMove();
    };
    SankeAI.prototype.startMove = function () {
        this.AImode = 1;
        this.addEventListener(egret.Event.ENTER_FRAME, this._AIEnt, this);
    };
    SankeAI.prototype.stopAIMove = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this._AIEnt, this);
    };
    SankeAI.prototype._AIEnt = function (e) {
        switch (this.AImode) {
            case 0:
                break;
            case 1:
                //方向移动判断
                //在地图随机一个食物目标
                var max = this.mapObject.foodArr.length;
                if (max > 0) {
                    var rd = Math.floor(Math.random() * max);
                    this.mbFood = this.mapObject.foodArr[rd];
                    this.foodPoint.x = this.mbFood.x;
                    this.foodPoint.y = this.mbFood.y;
                    this.AImode = 2;
                }
                break;
            case 2:
                //移动					
                var sArr = LuanMath.Vspeed(this.shetou.x, this.shetou.y, this.foodPoint.x, this.foodPoint.y, 5);
                var sPoint = new egret.Point(sArr[0], sArr[1]);
                this.setMoveSpeed(sPoint);
                //如果吃到目标食物：切换为1
                if (this.foodPoint.x != this.mbFood.x || this.foodPoint.y != this.mbFood.y) {
                    this.AImode = 1;
                }
                //躲避障碍AI：暂无
                break;
        }
    };
    return SankeAI;
}(SankeBasic));
__reflect(SankeAI.prototype, "SankeAI");
//# sourceMappingURL=SankeAI.js.map