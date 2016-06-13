class Test extends egret.Sprite{
       public constructor() {
        super();
        // 加载图形
        
        
        
        
        var sky:egret.Bitmap = this.createBitmapByName("ball_bg_png");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        // var topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // var icon:egret.Bitmap = this.createBitmapByName("egretIcon");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // var line = new egret.Shape();
        // line.graphics.lineStyle(2,0xffffff);
        // line.graphics.moveTo(0,0);
        // line.graphics.lineTo(0,117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0x000000;
        colorLabel.width = 200;
        colorLabel.textAlign = "left";
        colorLabel.text = "大米：1450";
        colorLabel.size = 24;
        colorLabel.x = 20;
        colorLabel.y = 30;
        // colorLabel.border = true;
        this.addChild(colorLabel);
        
        var menuLabel = new egret.TextField();
        menuLabel.textColor = 0xffffff;
        menuLabel.width = 100;
        menuLabel.height = 30;
        
        menuLabel.textAlign = "center";
        // menuLabel.textFlow 
        menuLabel.text = "菜单";
        menuLabel.size = 24;
        menuLabel.x = stageW - 120;
        menuLabel.y = 30;
        // menuLabel.border = true;
        menuLabel.background=true;
        menuLabel.backgroundColor = 0xe59800;
        this.addChild(menuLabel);
        //画线
        var circlex = stageW/2;
        var circley = stageH/2-50;
        var blackLine:egret.Shape = new egret.Shape();
        blackLine.graphics.lineStyle( 2, 0x000000 );
        blackLine.graphics.moveTo( circlex,circley );
        blackLine.graphics.lineTo( 200, 200 );
        blackLine.graphics.endFill();
       // this.addChild( blackLine );
            //旋转动画
        var tw = egret.Tween.get( blackLine);
        tw.to({rotation:20},1000);
        // 小圆
        var shp:egret.Shape = new egret.Shape();
        shp.x = 200;
        shp.y = 200;
        // shp.graphics.lineStyle( 10, 0x00ff00 );
        shp.graphics.beginFill( 0x000000, 1);
        shp.graphics.drawCircle( 0, 0, 10 );
        shp.graphics.endFill();
        this.addChild( shp );
  
        
        //  大圆
        this.drawNumberBall(circlex,circley,50,"11");
        
        // var shp:egret.Shape = new egret.Shape();
        // shp.x = circlex;
        // shp.y = circley;
        // // shp.graphics.lineStyle( 10, 0x00ff00 );
        // shp.graphics.beginFill( 0xe59800, 1);
        // shp.graphics.drawCircle( 0, 0, 50 );
        // shp.graphics.endFill();
        // this.addChild( shp );
        // var circleCenter = new egret.TextField();
        // circleCenter.textColor = 0xffffff;
        // circleCenter.width = 50;
        // circleCenter.textAlign = "center";
        // circleCenter.text = "11";
        // circleCenter.size = 26;
        // circleCenter.x = shp.x-circleCenter.width/2;
        // circleCenter.y = shp.y-circleCenter.height/2;
        // // circleCenter.border = true;
        // this.addChild(circleCenter);
        //alert(shp.x+":"+shp.y);
        
        // 小圆
        // var shp:egret.Shape = new egret.Shape();
        // shp.x = circlex;
        // shp.y = stageH-200;
        // // shp.graphics.lineStyle( 10, 0x00ff00 );
        // shp.graphics.beginFill( 0xff0000, 1);
        shp.graphics.drawCircle( 0, 0, 10 );
        shp.graphics.endFill();
        this.addChild( shp );
        
        
        // var circleCenter = new egret.TextField();
        // circleCenter.textColor = 0xffffff;
        // circleCenter.width = 50;
        // circleCenter.textAlign = "center";
        // circleCenter.text = "11";
        // circleCenter.size = 14;
        // circleCenter.x = shp.x-circleCenter.width/2;
        // circleCenter.y = shp.y-circleCenter.height/2;
        // this.addChild(circleCenter);
        
        this.drawNumberBall(circlex,stageH-200,10,"8");
        
     }
     
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
   
   private drawNumberBall(circlex:number,circley:number,radius:number,num:string){
       var shp:egret.Shape = new egret.Shape();
        shp.x = circlex;
        shp.y = circley;
        // shp.graphics.lineStyle( 10, 0x00ff00 );
        shp.graphics.beginFill( 0xe59800, 1);
        shp.graphics.drawCircle( 0, 0, radius );
        shp.graphics.endFill();
        this.addChild( shp );
        var circleCenter = new egret.TextField();
        circleCenter.textColor = 0xffffff;
        circleCenter.width = 50;
        circleCenter.textAlign = "center";
        circleCenter.text = num;
        if(radius==50){
        circleCenter.size = 26;    
        }else if(radius==10){
        circleCenter.size = 14;    
        }
        
        
        circleCenter.x = shp.x-circleCenter.width/2;
        circleCenter.y = shp.y-circleCenter.height/2;
        // circleCenter.border = true;
        this.addChild(circleCenter);       
   }
   
   
}