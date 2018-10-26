var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 配置
 */
var Config = (function () {
    function Config() {
    }
    Config.stageWidth = 800;
    Config.stageHeight = 480;
    //地图宽高
    Config.mapWidth = 3000;
    Config.mapHeight = 2000;
    //成长速度：吃几个蛋长一截
    Config.lifeSpeed = 1;
    //黄 绿 蓝 粉 紫 
    Config.FoodColour = [0xfcdb06, 0x01a884, 0x00c9ff, 0xfc4f90, 0xc700f6];
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map