
class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
    private con: egret.DisplayObjectContainer;
    private textField: egret.TextField;
    private bgImg: egret.ImageLoader;// 背景图
    private stageW: number;
    private stageH: number;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }

    private createView(): void {
        this.stageW = StageUtils.ins().getWidth();
        this.stageH = StageUtils.ins().getHeight();

        this.con = new egret.DisplayObjectContainer;
        this.con.x = this.stageW >> 1;
        this.con.y = this.stageH >> 1;

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 120;
        this.textField.height = 50;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;

        this.textField.x = this.stageW / 2 - this.textField.width/2;
        this.textField.y = this.stageH / 2 - this.textField.height/2;
        this.textField.textColor = 0x7c736a;

        let angle: number = 0;
        let num: number = 0.1;
        let dot: egret.Shape;
        for (let i = 0; i < 10; i++) {
            dot = new egret.Shape;
            dot.graphics.beginFill(0x7c736a, num);
            dot.graphics.drawCircle(0, 0, 8);
            dot.graphics.endFill();
            dot.anchorOffsetX = -60;
            dot.anchorOffsetY = dot.height >> 1;
            dot.rotation = angle;
            this.con.addChild(dot);
            angle += 36;
            num += 0.1;
        }
        this.addChild(this.con);
        this.addEventListener(egret.Event.ENTER_FRAME, this.upLoadingData, this);

        // this.bgImg = new egret.ImageLoader();
        // this.bgImg.once(egret.Event.COMPLETE, (e: egret.Event) => {
        //     let loader: egret.ImageLoader = e.currentTarget;
        //     let bmd: egret.BitmapData = loader.data;
        //     let texture: egret.Texture = new egret.Texture();
        //     texture._setBitmapData(bmd);
        //     let bitmap = new egret.Bitmap(texture);
        //     bitmap.width = this.stageW;
        //     bitmap.height = this.stageH;
        //     this.addChildAt(bitmap, 0);
        // }, this);
        // this.bgImg.load("resource/game/bg.jpg");

        // RES.getResByUrl('resource/game/bg.jpg', (data, url) => {
        //     let bt: egret.Bitmap = new egret.Bitmap();
        //     bt.texture = data;
        //     bt.width = stageW;
        //     bt.height = stageH;
        //     this.addChildAt(bt, 0);
        // }, this, RES.ResourceItem.TYPE_IMAGE);
    }

    public upLoadingData(): void {
        this.con.rotation += 36;
    }

    public onProgress(current: number, total: number): void {
        let progress: number = Math.floor((current / total) * 100);
        this.textField.text = `${progress}`;
        // FBInstant.setLoadingProgress(progress);
    }
}
