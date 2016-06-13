class Line extends egret.Sprite {
    // public constructor(){
    //     super();
    //     this.drawLine();
    //     // this.ex;
    //     this.x;
    //     this.y;
    //     //this.drawLine(this.x,this.y);
    // }
    private sx;
    private sy;
    private ex;
    private ey;
    public angle;

    public getAngle() {
        return this.$getRotation().valueOf();
    }
    // public setAngle(angle:number){
    //     this.angle = angle;
    // }

    public constructor(ex: number, ey: number, color: number, number: string) {

        super();
        this.drawColorball(ex, ey, color, number);
        // this.sx = sx;
        // this.sy = sy;
        // this.ex = ex;
        // this.ey = ey;

    }

    public drawColorball(ex: number, ey: number, color: number, number: string) {

        // draw line
        var blackLine: egret.Shape = new egret.Shape();
        blackLine.graphics.lineStyle(2, color);
        blackLine.graphics.moveTo(0, 0);
        blackLine.graphics.lineTo(ex, ey);
        blackLine.graphics.endFill();
        this.addChild(blackLine);
        // ball up line
        var shp: egret.Shape = new egret.Shape();
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
    }
    public drawLineWithParams(sx: number, sy: number, ex: number, ey: number) {

        var blackLine: egret.Shape = new egret.Shape();
        blackLine.graphics.lineStyle(2, 0x000000);
        blackLine.graphics.moveTo(0, 0);
        // blackLine.graphics.moveTo( sx,sy );
        blackLine.graphics.lineTo(ex, ey);
        blackLine.graphics.endFill();
        this.addChild(blackLine);
        // ball up line
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x000000, 1);
        shp.graphics.drawCircle(ex, ey, 10);
        shp.graphics.endFill();
        this.addChild(shp);

    }
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public getSx() {
        return this.sx;
    }
    public getSy() {
        return this.sy;
    }
    public getEx() {
        return this.ex;
    }
    public getEy() {
        return this.ey;
    }
    public getX() {
        return this.$getX();
    }

}