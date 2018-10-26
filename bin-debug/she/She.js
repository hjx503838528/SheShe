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
 * 蛇节点类
 */
var She = (function (_super) {
    __extends(She, _super);
    /**
     * @param type 类型
     * @param isTou 是否头
     */
    function She(type, isTou) {
        var _this = _super.call(this) || this;
        _this.type = 1;
        _this.isTou = false;
        _this.type = type;
        _this.isTou = isTou;
        var resName = _this.isTou ? "tou" + _this.type : "sheshen" + _this.type;
        _this.body = new egret.Bitmap();
        _this.body.texture = RES.getRes(resName);
        _this.addChild(_this.body);
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        return _this;
    }
    return She;
}(egret.Sprite));
__reflect(She.prototype, "She");
//# sourceMappingURL=She.js.map