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
 * 地图类
 */
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        //所有蛇
        _this.snakeArray = new Array();
        //镜头跟随的蛇
        _this.cameraFollow = null;
        //所有食物
        _this.foodArr = new Array();
        _this.setMap();
        return _this;
    }
    Map.prototype.setMap = function () {
        // this.graphics.beginFill(0xff0000, 1);
        // this.graphics.drawRect(0, 0, Config.mapWidth, Config.mapHeight);
        // this.graphics.endFill();
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("white_png");
        this.bg.width = Config.mapWidth;
        this.bg.height = Config.mapHeight;
        this.addChildAt(this.bg, 0);
    };
    //将一条蛇添加进地图
    Map.prototype.addSnake = function (sk) {
        this.addChild(sk);
        this.snakeArray.push(sk);
    };
    //将一条蛇移出地图
    Map.prototype.removeSnake = function (sk) {
        for (var i = 0; i < this.snakeArray.length; i++) {
            if (this.snakeArray[i] == sk) {
                this.removeChild(this.snakeArray[i]);
                this.snakeArray.splice(i, 1);
                return;
            }
        }
    };
    //设置镜头跟随的蛇
    Map.prototype.setFollow = function (sk) {
        this.cameraFollow = sk;
        // 启动镜头跟随
        this.addEventListener(egret.Event.ENTER_FRAME, this._cameraEnt, this);
    };
    //镜头跟随
    Map.prototype._cameraEnt = function (e) {
        if (this.cameraFollow != null) {
            //跟随的蛇对象不为Null,就开始让镜头跟随蛇头移动
            this.x = -this.cameraFollow.shetou.x + StageUtils.ins().getWidth() / 2;
            this.y = -this.cameraFollow.shetou.y + StageUtils.ins().getHeight() / 2;
        }
    };
    //添加一个食物
    Map.prototype.addFood = function (food) {
        //食物永远显示在最底层
        this.addChildAt(food, 1);
        this.foodArr.push(food);
    };
    //移除一个食物
    Map.prototype.removeFood = function (food) {
    };
    //清除所有食物
    Map.prototype.clearFood = function () {
        for (var s in this.foodArr) {
            this.removeChildAt(this.foodArr[s]);
            this.foodArr[s] = null;
        }
        this.foodArr = [];
    };
    return Map;
}(egret.Sprite));
__reflect(Map.prototype, "Map");
//# sourceMappingURL=Map.js.map