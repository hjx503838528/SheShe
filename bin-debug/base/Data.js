var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 数据
 */
var Data = (function () {
    function Data() {
    }
    Data.ADID = "";
    Data.RANKNAME = "";
    //当前第几个
    Data.INDEX = 0;
    //游戏分数
    Data.score = 0;
    return Data;
}());
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map