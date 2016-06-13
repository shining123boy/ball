class MenuBg extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.6);
        shp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        shp.graphics.endFill();
        this.addChild(shp);
    }


}