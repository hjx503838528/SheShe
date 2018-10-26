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
 * 蛇基类
 */
var SankeBasic = (function (_super) {
    __extends(SankeBasic, _super);
    function SankeBasic(len, initPoint, type) {
        if (len === void 0) { len = 4; }
        if (initPoint === void 0) { initPoint = null; }
        if (type === void 0) { type = 1; }
        var _this = _super.call(this) || this;
        //成长值：根据这个值的变化，来加长蛇身
        _this.lif = 10;
        //皮肤类型
        _this.skinTyp = 1;
        _this.pathArr = new Array();
        //蛇数组
        _this.sheArr = new Array();
        _this.sheJg = 3;
        //蛇头
        _this.shetou = null;
        //速度
        _this.speedPoint = new egret.Point();
        _this.lif = len * Config.lifeSpeed;
        _this.skinTyp = type;
        for (var i = 0; i < len; i++) {
            var mc = void 0;
            if (i == 0) {
                mc = new She(_this.skinTyp, true); //蛇头
            }
            else {
                mc = new She(_this.skinTyp);
            }
            if (initPoint != null) {
                mc.x = initPoint.x;
                mc.y = initPoint.y;
            }
            _this.sheArr.push(mc);
            _this.addChild(mc);
        }
        //蛇头等于第一个关节
        _this.shetou = _this.sheArr[0];
        //启动蛇移动
        _this.addEventListener(egret.Event.ENTER_FRAME, _this._ent, _this);
        return _this;
    }
    SankeBasic.prototype._ent = function (e) {
        //计算蛇头角度
        var shetouV = LuanMath.getV(0, 0, this.speedPoint.x, this.speedPoint.y);
        this.shetou.rotation = shetouV + 90;
        this.shetou.x += this.speedPoint.x;
        this.shetou.y += this.speedPoint.y;
        var touPoint = new egret.Point(this.shetou.x, this.shetou.y);
        this.pathArr.unshift(touPoint);
        for (var i = 1; i < this.sheArr.length; i++) {
            var idx = i * this.sheJg;
            if (idx < this.pathArr.length) {
                this.sheArr[i].rotation = LuanMath.getV(this.sheArr[i].x, this.sheArr[i].y, this.pathArr[idx].x, this.pathArr[idx].y) + 90;
                this.sheArr[i].x = this.pathArr[idx].x;
                this.sheArr[i].y = this.pathArr[idx].y;
            }
        }
        if (this.pathArr.length > this.sheArr.length * this.sheJg) {
            this.pathArr.pop();
        }
    };
    //设置蛇移动的速度
    SankeBasic.prototype.setMoveSpeed = function (p) {
        this.speedPoint = p;
    };
    //蛇吃东西
    SankeBasic.prototype.eatEgg = function () {
        this.lif++;
        var tl = Math.floor(this.lif / Config.lifeSpeed);
        if (this.sheArr.length < tl) {
            //蛇成长：蛇长+1
            var mc = new She(this.skinTyp);
            mc.x = this.sheArr[this.sheArr.length - 1].x;
            mc.y = this.sheArr[this.sheArr.length - 1].y;
            this.sheArr.push(mc);
            this.addChild(mc);
        }
        Data.score = this.sheArr.length;
    };
    //蛇停止移动
    SankeBasic.prototype.stopMove = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this._ent, this);
    };
    return SankeBasic;
}(egret.Sprite));
__reflect(SankeBasic.prototype, "SankeBasic");
//# sourceMappingURL=SankeBasic.js.map