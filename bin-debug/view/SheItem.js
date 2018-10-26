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
 * 蛇
 */
var SheItem = (function (_super) {
    __extends(SheItem, _super);
    function SheItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SheItemSkin";
        return _this;
    }
    SheItem.prototype.dataChanged = function () {
        var data = this.data;
        var index = this.itemIndex + 1;
        this.touImg.source = "tou" + index;
        this.shen1.source = this.shen2.source = this.shen3.source = this.shen4.source = "sheshen" + index;
    };
    return SheItem;
}(eui.ItemRenderer));
__reflect(SheItem.prototype, "SheItem");
//# sourceMappingURL=SheItem.js.map