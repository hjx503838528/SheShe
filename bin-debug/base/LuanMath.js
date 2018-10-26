var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 方向工具
 */
var LuanMath = (function () {
    function LuanMath() {
    }
    LuanMath._V = function (myx, myy, mdx, mdy) {
        return Math.atan2(mdy - myy, mdx - myx);
    };
    LuanMath.getV = function (myx, myy, mdx, mdy) {
        return this._V(myx, myy, mdx, mdy) / Math.PI * 180;
    };
    LuanMath.Vspeed = function (myx, myy, mdx, mdy, speed) {
        if (speed === void 0) { speed = 1; }
        var arr = [];
        arr[0] = Math.cos(this._V(myx, myy, mdx, mdy)) * speed;
        arr[1] = Math.sin(this._V(myx, myy, mdx, mdy)) * speed;
        return arr;
    };
    LuanMath.VspeedObj = function (a, b, speed) {
        if (speed === void 0) { speed = 0; }
        return this.Vspeed(a.x, a.y, b.x, b.y, speed);
    };
    //通过角度(180-180)获得x和y的速度
    LuanMath.getVbackSpeed = function (v, speed) {
        if (speed === void 0) { speed = 1; }
        var arr = new Array();
        var hu = v / 180 * Math.PI;
        arr[0] = Math.cos(hu) * speed;
        arr[1] = Math.sin(hu) * speed;
        return arr;
    };
    return LuanMath;
}());
__reflect(LuanMath.prototype, "LuanMath");
//# sourceMappingURL=LuanMath.js.map