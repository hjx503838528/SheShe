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
 * 食物
 */
var Food = (function (_super) {
    __extends(Food, _super);
    function Food(i) {
        var _this = _super.call(this) || this;
        _this.index = 1;
        _this.index = i % 5 + 1;
        _this.food = new egret.Bitmap();
        _this.food.texture = RES.getRes("food" + _this.index);
        _this.addChild(_this.food);
        return _this;
    }
    return Food;
}(egret.Sprite));
__reflect(Food.prototype, "Food");
//# sourceMappingURL=Food.js.map