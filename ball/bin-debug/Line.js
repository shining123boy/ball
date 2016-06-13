var Line = (function (_super) {
    __extends(Line, _super);
    // public setAngle(angle:number){
    //     this.angle = angle;
    // }
    function Line(ex, ey, color, number) {
        _super.call(this);
        this.drawColorball(ex, ey, color, number);
        // this.sx = sx;
        // this.sy = sy;
        // this.ex = ex;
        // this.ey = ey;
    }
    var d = __define,c=Line,p=c.prototype;
    p.getAngle = function () {
        return this.$getRotation().valueOf();
    };
    p.drawColorball = function (ex, ey, color, number) {
        // draw line
        var blackLine = new egret.Shape();
        blackLine.graphics.lineStyle(2, color);
        blackLine.graphics.moveTo(0, 0);
        blackLine.graphics.lineTo(ex, ey);
        blackLine.graphics.endFill();
        this.addChild(blackLine);
        // ball up line
        var shp = new egret.Shape();
        shp.graphics.beginFill(color, 1);
        shp.graphics.drawCircle(ex, ey, 12);
        shp.graphics.endFill();
        this.addChild(shp);
        // number on ball
        if (number != "0") {
            var circleCenter = new egret.TextField();
            circleCenter.textColor = 0xffffff;
            circleCenter.width = 24;
            circleCenter.textAlign = "center";
            circleCenter.text = number;
            circleCenter.size = 15;
            circleCenter.x = ex - circleCenter.width / 2;
            circleCenter.y = ey - circleCenter.height / 2;
            // circleCenter.border = true;
            this.addChild(circleCenter);
        }
    };
    p.drawLineWithParams = function (sx, sy, ex, ey) {
        var blackLine = new egret.Shape();
        blackLine.graphics.lineStyle(2, 0x000000);
        blackLine.graphics.moveTo(0, 0);
        // blackLine.graphics.moveTo( sx,sy );
        blackLine.graphics.lineTo(ex, ey);
        blackLine.graphics.endFill();
        this.addChild(blackLine);
        // ball up line
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 1);
        shp.graphics.drawCircle(ex, ey, 10);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.getSx = function () {
        return this.sx;
    };
    p.getSy = function () {
        return this.sy;
    };
    p.getEx = function () {
        return this.ex;
    };
    p.getEy = function () {
        return this.ey;
    };
    p.getX = function () {
        return this.$getX();
    };
    return Line;
}(egret.Sprite));
egret.registerClass(Line,'Line');
//# sourceMappingURL=Line.js.map