var MenuBg = (function (_super) {
    __extends(MenuBg, _super);
    function MenuBg() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=MenuBg,p=c.prototype;
    p.onAddToStage = function (event) {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.6);
        shp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    return MenuBg;
}(egret.DisplayObjectContainer));
egret.registerClass(MenuBg,'MenuBg');
//# sourceMappingURL=MenuBg.js.map