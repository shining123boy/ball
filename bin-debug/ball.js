var ball = (function (_super) {
    __extends(ball, _super);
    function ball(x, y, r, c) {
        _super.call(this);
        this.colors = [0x36A4B5, 0xFF7373, 0xFFBA00, 0x46C267, 0xDB4B4B, 0x84D29B, 0xB97A57, 0xA349A4, 0xB5E61D, 0xFF7F27];
        this.drawball(x, y, r, c);
    }
    var d = __define,c=ball,p=c.prototype;
    p.drawLine = function () {
        // var steak_0:egret.Bitmap = this.createBitmapByName("steak_0_png");
        // this.addChild(steak_0);
        // steak_0.x = this.getX();//-circle_140.width/2;
        // steak_0.y = this.getY();//-circle_140.height/2;
        var blackLine = new egret.Shape();
        blackLine.graphics.lineStyle(2, 0x000000);
        blackLine.graphics.moveTo(0, 0);
        blackLine.x = this.x;
        blackLine.y = this.y;
        blackLine.graphics.lineTo(this.x, 200);
        blackLine.graphics.endFill();
        this.addChild(blackLine);
        //lineball
        // var tw = egret.Tween.get( blackLine);
        // tw.to({rotation:360},8000);
    };
    p.drawball = function (x, y, r, c) {
        // ball up line
        var shp = new egret.Shape(); //36A4B5 FF7373 FFBA00 46C267
        //var random_index = Math.floor(Math.random()*4);
        var color = this.colors[c % 10];
        //  console.log("co:"+c%10);
        shp.graphics.beginFill(color, 1);
        shp.graphics.drawCircle(x, y, r);
        shp.graphics.endFill();
        this.addChild(shp);
        // 数字
        var circleCenter = new egret.TextField();
        circleCenter.textColor = 0xffffff;
        circleCenter.width = 24;
        circleCenter.textAlign = "center";
        circleCenter.text = (c + 1) + "";
        circleCenter.size = 15;
        circleCenter.x = shp.x - circleCenter.width / 2;
        circleCenter.y = shp.y - circleCenter.height / 2;
        // circleCenter.border = true;
        this.addChild(circleCenter);
        this.color = color;
        this.number = circleCenter.text;
    };
    p.getName = function () {
        return this.ballName;
    };
    p.setName = function (name) {
        this.ballName = name;
    };
    p.getColor = function () {
        return this.color;
    };
    p.getNumber = function () {
        return this.number;
    };
    return ball;
}(egret.Sprite));
egret.registerClass(ball,'ball');
//# sourceMappingURL=ball.js.map