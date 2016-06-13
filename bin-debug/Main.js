var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.radius = 120;
        this.lines = new Array();
        this.balls = new Array();
        this.shotBalls = new Array();
        this.is_twBall_arr = new Array();
        // private ball_item: ball;
        //private circle_140: egret.Bitmap;
        /**
             * 创建游戏场景
             * Create a game scene
             */
        this.speed = 5000;
        this.redoCount = 0;
        // 加载图形
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
    * 配置文件加载完成,开始预加载preload资源组。
    * configuration file loading is completed, start to pre-load the preload resource group
    */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
    * 资源组加载出错
    *  The resource group loading failed
    */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
        * preload资源组加载进度
        * Loading process of preload resource group
        */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
         * 资源组加载出错
         *  The resource group loading failed
         */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    p.speedTimerFunc = function () {
        // if()
        this.speed = Math.floor(Math.random() * 2000) + 4000;
        //console.log("计时开始:" + this.speed);
        this.rotateAll(this.speed);
    };
    p.timerComFunc = function () {
        console.log("计时结束");
    };
    p.createGameScene = function () {
        // egret.RendererContext.imageSmoothingEnabled = false;
        // egret
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        //console.log(stageH + ":" + stageW);
        this.stageWidth = this.stage.stageWidth;
        this.stageHeight = this.stage.stageHeight;
        //alert("width:" + this.stageWidth + "height:" + this.stageHeight);
        var circlex = stageW / 2;
        var circley = stageH / 2 - 50;
        // 初始化缓存关卡
        //egret.localStorage.setItem("play_station", 1 + "");
        var level_played = egret.localStorage.getItem("play_station");
        this.levelNum = parseInt(level_played);
        if (this.levelNum >= 20) {
            alert("闯关成功！");
        }
        //console.log("level:" + this.levelNum);
        if (level_played == undefined || level_played == "") {
            this.levelNum = 1;
        }
        var levelSet = new Level(this.levelNum);
        this.basicLine = levelSet.getBasicLine();
        this.baseball = levelSet.getBaseball();
        this.rotateDirection = levelSet.getRotateDirection();
        //console.log(this.baseball);
        var sky = this.createBitmapByName("bg06");
        sky.width = 640;
        sky.height = 800;
        this.addChild(sky);
        var test = false;
        // var test = true;
        if (test) {
            return;
        }
        // 获取舞台宽度
        sky.width = stageW;
        sky.height = stageH;
        this.scoreLabel = new egret.TextField();
        this.scoreLabel.textColor = 0x000000;
        this.scoreLabel.width = 200;
        this.scoreLabel.textAlign = "left";
        var score = egret.localStorage.getItem("score");
        if (score != undefined && score != "") {
            this.score = parseInt(score);
        }
        else {
            this.score = 0;
        }
        this.scoreLabel.text = "积分:" + this.score;
        this.scoreLabel.fontFamily = "微软雅黑";
        this.scoreLabel.size = 24;
        this.scoreLabel.x = 20;
        this.scoreLabel.y = 30;
        // colorLabel.border = true;
        this.addChild(this.scoreLabel);
        // 菜单点击事件
        var menu = this.createBitmapByName("menu_png");
        this.addChild(menu);
        // 菜单点击事件
        menu.touchEnabled = true;
        this.isMenuOpen = false;
        menu.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            if (this.isMenuOpen) {
                return;
            }
            event.stopImmediatePropagation();
            this.createMenuItem();
            this.isMenuOpen = true;
        }, this);
        //menu.dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false);
        menu.x = stageW - 180;
        menu.y = 20;
        var menuLabel = new egret.TextField();
        menuLabel.textColor = 0xffffff;
        menuLabel.width = 100;
        menuLabel.height = 25;
        menuLabel.textAlign = "center";
        // menuLabel.border = true;
        // menuLabel.textFlow 
        menuLabel.text = "菜单";
        menuLabel.fontFamily = "微软雅黑";
        menuLabel.size = 25;
        menuLabel.x = menu.x + (menu.width - 100) / 2;
        menuLabel.y = menu.y + (menu.height - 25) / 2;
        this.addChild(menuLabel);
        // 圆心
        //黑球个数，控制难度
        this.drawBaseLine();
        // 首次旋转所有的，慢速
        this.rotateAll(5000);
        //创建一个计时器对象
        this.speedTimer = new egret.Timer(2000, 0);
        //注册事件侦听器
        this.speedTimer.addEventListener(egret.TimerEvent.TIMER, this.speedTimerFunc, this);
        this.speedTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        this.speedTimer.start();
        // 中心圆覆盖
        this.addCircleYellow();
        //初始化球
        this.initBalls();
        // 屏幕可以点击
        this.touchEnabled = true;
        // 屏幕菜单点击开关
        this.isShowMenu = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // console.log("click:" + this.isShowMenu);
            if (!this.isShowMenu) {
                return;
            }
            this.shotBall();
        }, this);
    };
    p.rotateAll = function (speed) {
        for (var i = 0; i < this.lines.length; i++) {
            egret.Tween.removeTweens(this.lines[i]);
            var tw = egret.Tween.get(this.lines[i], { loop: true });
            var direction;
            //console.log(this.rotateDirection);
            if (this.rotateDirection) {
                direction = 1;
            }
            else {
                direction = -1;
            }
            tw.to({ rotation: this.lines[i].getAngle() + 360 * direction }, speed);
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        // result.setsm
        var texture = RES.getRes(name);
        result.texture = texture;
        //console.log(name + ":" + texture);
        return result;
    };
    p.rotateLine = function (line, a) {
        // var r = 120;// 
        var x0 = 0;
        var y0 = 0;
        var sx = 0; //Math.cos(a) * 200 + * (line.getSy() - 300) + 500;//
        var sy = 0; //Math.cos(a) * (line.getSy() - 300) + Math.sin(a) * (line.getSx() - 500) + 300;
        var ex = Math.cos(a) * this.radius + x0; //line.getEx();
        var ey = Math.sin(a) * this.radius + y0; //line.getEy();
        // return new Line(sx, sy, ex, ey);
    };
    //s private is_tw_ball: boolean;//egret.Tween;
    p.shotBall = function () {
        // window.
        if (this.balls.length > 0) {
            this.is_twBall_arr.push(true);
            var ball_item = this.balls.pop(); //balls[i];
            this.shotBalls.push(ball_item);
            // console.log("length:" + this.shotBalls.length + " name:" + ball_item.getName());
            //console.log(this.ball_item.getName());
            ball_item.touchEnabled = true;
            // 小球上移
            for (var i = 0; i < this.balls.length; i++) {
                this.balls[i].y -= 30;
            }
            //注册事件          
            var tw_ball = egret.Tween.get(ball_item); //balls.pop());//ball_item);
            tw_ball.to({ y: this.circleY + 120 }, 200); // 插针的速度，控制难易
            // return;
            //console.log("ball:" + ball_item.getName());
            tw_ball.call(function () {
                // this.tw_ball = undefined;
                // this.is_tw_ball = false;
                this.is_twBall_arr.pop();
                // this.shotBalls.pop();
                //alert(lines[1]);
                //console.log("666:" + ball_item.getName());
                // console.log(this.ball_item.getName());
                // 遍历lines角度，小于9度，失败
                for (var i = 0; i < this.lines.length; i++) {
                    //console.log(i + ":" + this.lines[i].getAngle());
                    // console.log(lines[i].getX());
                    // var tw = egret.Tween.get(this.lines[i], { loop: false });
                    // tw.pause(tw);
                    var line_angle = this.lines[i].getAngle();
                    if (Math.abs(line_angle) < 11.3) {
                        egret.Tween.removeAllTweens(); //删除所有动画
                        // var tw = egret.Tween.get(this.lines[i], { loop: true });
                        //alert("啊哦，你输了！");
                        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () { this.shotBall(); }, this);
                        this.touchEnabled = false;
                        this.speedTimer.stop();
                        // 速度计时器继续
                        //放大
                        var loseMenuTimer = new egret.Timer(1000, 1);
                        //注册事件侦听器
                        loseMenuTimer.addEventListener(egret.TimerEvent.TIMER, this.loseMenu, this);
                        //开始计时
                        loseMenuTimer.start();
                        return;
                    }
                }
                this.removeChild(ball_item);
                // 注册下一个
                //console.log("after:" + this.balls.length);
                //console.log("speed 2:" + this.speed);
                // 生成线和球插在大球上
                var line_item = new Line(0, 120, ball_item.getColor(), ball_item.getNumber()); //this.rotateLine(this.lines[i-1],i*2*Math.PI/3);
                line_item.x = this.circleX;
                line_item.y = this.circleY;
                // line_item.rotation = i * 120;
                this.addChild(line_item);
                // 大圆覆盖
                this.addCircleYellow();
                this.lines.push(line_item);
                this.rotateAll(this.speed);
                //console.log("lines2:" + this.lines.length);
                //this.rotateAll(5000);
                // var tw = egret.Tween.get(line_item, { loop: true });
                // tw.to({ rotation: 360 + line_item.getAngle() }, 10000);
                // console.log("ball:" + this.balls.length + "arr:" + this.is_twBall_arr.length);
                if (this.balls.length == 0 && this.is_twBall_arr.length == 0) {
                    // 记录结束时间
                    this.endTime = new Date().getTime();
                    this.speedTimer.stop();
                    egret.Tween.removeAllTweens(); //删除所有动画
                    var tw;
                    // 加速
                    for (var i = 0; i < this.lines.length; i++) {
                        tw = egret.Tween.get(this.lines[i], { loop: true });
                        tw.to({ rotation: this.lines[i].getAngle() + 360 }, 500); // 
                    }
                    // 下一关
                    var nextLevelTimer = new egret.Timer(2000, 1);
                    //注册事件侦听器
                    nextLevelTimer.addEventListener(egret.TimerEvent.TIMER, this.nextLevel, this);
                    //开始计时
                    nextLevelTimer.start();
                    // time
                    var timeDiff = this.endTime - this.startTime;
                    var score = this.getScore(this.levelNum, this.redoCount, timeDiff);
                    // console.log("score:" + score);
                    this.addScore(score);
                    // history 
                    // 闯关记录
                    var playrecord = "";
                    var playRecordBefore = egret.localStorage.getItem("play_record"); //, playrecord);//第一关
                    if (playRecordBefore != undefined && playRecordBefore != "") {
                        var playrecordobj = JSON.parse(playRecordBefore);
                        var playrecords = playrecordobj.record;
                        playrecords.push({ "level": this.levelNum, "time": timeDiff, "score": score });
                        playrecord = JSON.stringify(playrecordobj);
                    }
                    else {
                        playrecord = '{"record":[{"level":"' + this.levelNum + '","time":' + timeDiff + ',"score":' + score + '}]}';
                    }
                    egret.localStorage.setItem("play_record", playrecord); //第一关
                    // 关卡
                    this.levelNum++;
                    egret.localStorage.setItem("play_station", this.levelNum + ""); //第一关
                }
            }, this, [this.lines]);
        }
        else {
        }
    };
    /**
     * 下一关
     */
    p.nextLevel = function () {
        //next level menu
        var menuBg = new MenuBg();
        this.addChild(menuBg);
        egret.Tween.removeAllTweens(); //删除所有动画
        var succMenu = this.createBitmapByName("res_suc_png");
        this.addChild(succMenu);
        succMenu.width = this.stage.width * 0.6;
        succMenu.height = this.stage.height * 0.4;
        succMenu.x = this.stage.width / 2 - succMenu.width / 2;
        succMenu.y = this.stage.height / 2 - succMenu.height / 2;
        // next level button
        var nextLevel = this.createBitmapByName("nextlevel");
        this.addChild(nextLevel);
        nextLevel.width = succMenu.width * 0.8;
        nextLevel.height = nextLevel.width / 3.3;
        nextLevel.x = this.stage.width / 2 - nextLevel.width / 2;
        nextLevel.y = this.stage.height / 2 - nextLevel.height / 2;
        // 点击下一关
        nextLevel.touchEnabled = true;
        nextLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            event.stopImmediatePropagation();
            // egret.
            // egret.re
            this.removeChild(nextLevel);
            this.removeChild(succMenu);
            this.removeChild(menuBg);
            for (var i = 0; i < this.lines.length; i++) {
                this.removeChild(this.lines[i]);
            }
            this.lines.length = 0;
            for (var i = 0; i < this.balls.length; i++) {
                this.removeChild(this.balls[i]);
            }
            // back to zero
            this.balls.length = 0;
            this.shotBalls.length = 0;
            this.is_twBall_arr.length = 0;
            this.redoCount = 0;
            if (this.levelNum >= 20) {
                alert("闯关成功！");
            }
            var levelSet = new Level(this.levelNum);
            this.basicLine = levelSet.getBasicLine();
            this.baseball = levelSet.getBaseball();
            this.rotateDirection = levelSet.getRotateDirection();
            this.drawBaseLine();
            // 首次旋转所有的，慢速
            this.rotateAll(5000);
            // 中心圆覆盖
            this.addCircleYellow();
            //初始化球
            this.initBalls();
        }, this);
    };
    /**
     * 闯关失败
     */
    p.loseMenu = function () {
        // 
        var menuBg = new MenuBg();
        this.addChild(menuBg);
        var loseMenu = this.createBitmapByName("res_fail_png");
        menuBg.addChild(loseMenu);
        loseMenu.width = this.stageWidth * 0.6;
        loseMenu.height = this.stageHeight * 0.4;
        // alert(loseMenu.height);
        loseMenu.x = this.stageWidth / 2 - loseMenu.width / 2;
        loseMenu.y = this.stageHeight / 2 - loseMenu.height / 2;
        // 重新挑战
        var redo = this.createBitmapByName("redo_png");
        menuBg.addChild(redo);
        redo.width = loseMenu.width * 0.8;
        redo.height = redo.width / 3.3;
        redo.x = this.stage.width / 2 - redo.width / 2;
        redo.y = 3 * loseMenu.y / 2; //+ redo.height/ 2;//this.stage.height / 2;// - redo.height;// / 2;
        // 重新挑战点击
        redo.touchEnabled = true;
        redo.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            event.stopImmediatePropagation();
            this.removeChild(menuBg);
            for (var i = 0; i < this.lines.length; i++) {
                this.removeChild(this.lines[i]);
            }
            this.lines.length = 0;
            // remove rest ball
            for (var i = 0; i < this.balls.length; i++) {
                this.removeChild(this.balls[i]);
            }
            this.balls.length = 0;
            // remove fail ball
            for (var i = 0; i < this.shotBalls.length; i++) {
                if (this.contains(this.shotBalls[i])) {
                    this.removeChild(this.shotBalls[i]);
                }
            }
            // record lose history
            this.redoCount++;
            //console.log("this.redoCount:" + this.redoCount);//, this.restartTime + "");
            //console.log("this.levelNum:"+this.levelNum);
            //egret.localStorage.setItem('restart_' + this.levelNum, this.redoCount + "");
            this.shotBalls.length = 0;
            this.is_twBall_arr.length = 0;
            // init lines
            this.drawBaseLine();
            this.addCircleYellow();
            this.rotateAll(5000);
            // init ball
            this.initBalls();
            this.touchEnabled = true;
            this.speedTimer.start();
        }, this);
    };
    // private scaleAll() {
    //     for (var i = 0; i < this.lines.length; i++) {
    //         //  this.lines[i].rotation =   this.lines[i].rotation + 10;
    //         this.tw = egret.Tween.get(this.lines[i], { loop: false });
    //         // console.log(i + ":" + this.lines[i].getAngle());
    //         this.tw.to({ scaleX: 1.2, scaleY: 1.2 }, 1000);
    //     }
    //     this.tw = egret.Tween.get(this.circle_140, { loop: false });
    //     // console.log(i + ":" + this.lines[i].getAngle());
    //     this.tw.to({ scaleX: 1.2, scaleY: 1.2 }, 1000);
    // }
    /**
     * 初始化球
     */
    p.initBalls = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var circlex = stageW / 2;
        var circley = stageH / 2 - 50;
        //this.baseball = 8;
        //console.log("baseball:" + this.baseball);
        for (var i = 1; i <= this.baseball; i++) {
            // this.removeChild();
            var ball_item = new ball(0, 0, 12, i - 1); //circlex,stageH-20,20);
            ball_item.x = circlex;
            if (this.baseball < 6) {
                ball_item.y = stageH - i * 30;
            }
            else {
                ball_item.y = stageH - i * 30 + 30 * (this.baseball - 5);
            }
            ball_item.setName("ball" + i);
            this.addChild(ball_item);
            this.balls.push(ball_item);
        }
    };
    p.addCircleYellow = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.circleX = stageW / 2;
        this.circleY = 2 * stageH / 5;
        var shp = new egret.Shape(); //36A4B5 FF7373 FFBA00 46C267
        shp.graphics.beginFill(0x90C871, 1);
        shp.graphics.drawCircle(this.circleX, this.circleY, 50);
        shp.graphics.endFill();
        this.addChild(shp);
        // var circle_140 = this.createBitmapByName("circle_140_png");
        // circle_140.smoothing = false;        
        // this.addChild(circle_140);
        // circle_140.width = 100;
        // circle_140.height = 100;
        // circle_140.x = this.circleX - circle_140.width / 2;
        // circle_140.y = this.circleY - circle_140.height / 2;
        //  if (number != "0") {
        var circleCenter = new egret.TextField();
        circleCenter.textColor = 0xffffff;
        circleCenter.width = 100;
        circleCenter.textAlign = "center";
        circleCenter.text = this.levelNum + "";
        circleCenter.size = 40;
        circleCenter.x = this.circleX - circleCenter.width / 2;
        circleCenter.y = this.circleY - circleCenter.height / 2;
        // circleCenter.border = true;
        this.addChild(circleCenter);
        // }
    };
    p.drawBaseLine = function () {
        // 记录开始时间
        //console.log("this.levelNum:"+this.levelNum);
        //var restartTime = egret.localStorage.getItem('restart_' + this.levelNum);//,this.restartTime+"");
        //console.log("restartTime:" + restartTime);
        if (this.redoCount == 0) {
            this.startTime = new Date().getTime();
        }
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.circleX = stageW / 2;
        this.circleY = 2 * stageH / 5;
        for (var i = 0; i < this.basicLine; i++) {
            var line_item = new Line(0, 120, 0x000000, "0"); //this.rotateLine(this.lines[i-1],i*2*Math.PI/3);
            line_item.x = this.circleX;
            line_item.y = this.circleY;
            //console.log(this.circleX + ":" + this.circleY);
            line_item.rotation = i * (360 / this.basicLine); // 由个数决定
            this.addChild(line_item);
            this.lines.push(line_item);
        }
    };
    p.addScore = function (currScore) {
        // score
        var score = new egret.TextField();
        score.textColor = 0x000000;
        score.width = 200;
        score.textAlign = "left";
        score.text = "+" + currScore;
        score.size = 24;
        score.x = 360;
        score.y = 230;
        this.addChild(score);
        this.score += currScore;
        var tw = egret.Tween.get(score).to({
            x: 100,
            y: 30,
            alpha: 0
        }, 1000, egret.Ease.sineIn).call(function () {
            this.scoreLabel.text = "积分:" + this.score;
            egret.localStorage.setItem("score", this.score);
        }, this);
        // 
    };
    p.createMenuItem = function () {
        var menuBg = new MenuBg();
        this.addChild(menuBg);
        var menu = this.createBitmapByName("menulayer_bg_png");
        menu.width = this.stage.width * 0.7;
        menu.height = this.stage.height * 0.4;
        // alert(""+menu.height);
        menu.x = this.stage.width / 2 - menu.width / 2;
        menu.y = this.stage.height / 2 - menu.height;
        menuBg.addChild(menu);
        this.isShowMenu = false; // 屏蔽屏幕点击事件
        //1.重新挑战
        var menuitem1 = this.createBitmapByName("menuItem");
        menuitem1.width = 200;
        menuitem1.height = 50;
        menuitem1.x = this.stage.width / 2 - menuitem1.width / 2;
        menuitem1.y = menu.y + 10 + menu.height / 4;
        menuBg.addChild(menuitem1);
        var menutext = new egret.TextField();
        menutext.width = 150;
        menutext.height = 24;
        menutext.x = this.stage.width / 2 - menutext.width / 2;
        menutext.y = menuitem1.y + 14;
        menutext.text = "重新挑战";
        menutext.fontFamily = "微软雅黑";
        menutext.size = 24;
        menutext.textAlign = "center";
        menuBg.addChild(menutext);
        menuitem1.touchEnabled = true;
        // console.log(menuitem1);
        menuitem1.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            event.stopImmediatePropagation(); // 传入event参数
            this.removeChild(menuBg);
            for (var i = 0; i < this.lines.length; i++) {
                this.removeChild(this.lines[i]);
            }
            this.lines.length = 0;
            // remove rest ball
            for (var i = 0; i < this.balls.length; i++) {
                this.removeChild(this.balls[i]);
            }
            this.balls.length = 0;
            this.shotBalls.length = 0;
            // init lines
            this.drawBaseLine();
            this.addCircleYellow();
            this.rotateAll(5000);
            // init ball
            this.initBalls();
            this.isShowMenu = true;
            // recover menu
            this.isMenuOpen = false;
        }, this);
        //2我的记录
        var menuitem2 = this.createBitmapByName("menuItem");
        menuitem2.width = 200;
        menuitem2.height = 50;
        menuitem2.x = this.stage.width / 2 - menuitem1.width / 2;
        menuitem2.y = menu.y + 10 + 2 * menu.height / 4;
        menuBg.addChild(menuitem2);
        var menutext = new egret.TextField();
        menutext.width = 150;
        menutext.height = 24;
        menutext.x = this.stage.width / 2 - menutext.width / 2;
        menutext.y = menuitem2.y + 14;
        menutext.text = "我的记录";
        ;
        menutext.size = 24;
        menutext.fontFamily = "微软雅黑";
        menutext.textAlign = "center";
        menuBg.addChild(menutext);
        menuitem2.touchEnabled = true;
        // console.log(menuitem1);
        menuitem2.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            event.stopImmediatePropagation(); // 传入event参数
            this.removeChild(menuBg);
            this.isShowMenu = true;
            // recover menu
            this.isMenuOpen = false;
            location.href = "record.html";
        }, this);
        //3排行榜
        // var menuitem3 = this.createBitmapByName("menuItem");
        // menuitem3.width = 200;
        // menuitem3.height = 50;
        // menuitem3.x = this.stage.width / 2 - menuitem1.width / 2;
        // menuitem3.y = menu.y + 10 + 3 * menu.height / 5;
        // menuBg.addChild(menuitem3);
        // var menutext = new egret.TextField();
        // menutext.width = 150;
        // menutext.height = 24;
        // menutext.x = this.stage.width / 2 - menutext.width / 2;
        // menutext.y = menuitem3.y + 14;
        // menutext.text = "排行榜";
        // menutext.fontFamily = "微软雅黑";
        // menutext.size = 24;
        // menutext.textAlign = "center";
        // menuBg.addChild(menutext);
        // menuitem3.touchEnabled = true;
        // // console.log(menuitem1);
        // menuitem3.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
        //     event.stopImmediatePropagation();// 传入event参数
        //     this.removeChild(menuBg);
        //     this.isShowMenu = true;
        //     // recover menu
        //     this.isMenuOpen = false;
        // }, this);
        //3排行榜
        var menuitem4 = this.createBitmapByName("menuItem");
        menuitem4.width = 200;
        menuitem4.height = 50;
        menuitem4.x = this.stage.width / 2 - menuitem1.width / 2;
        menuitem4.y = menu.y + 10 + 3 * menu.height / 4;
        menuBg.addChild(menuitem4);
        var menutext = new egret.TextField();
        menutext.width = 150;
        menutext.height = 24;
        menutext.x = this.stage.width / 2 - menutext.width / 2;
        menutext.y = menuitem4.y + 14;
        menutext.text = "退出游戏";
        menutext.size = 24;
        menutext.fontFamily = "微软雅黑";
        menutext.textAlign = "center";
        menuBg.addChild(menutext);
        menuitem4.touchEnabled = true;
        // console.log(menuitem1);
        menuitem4.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            event.stopImmediatePropagation(); // 传入event参数
            this.removeChild(menuBg);
            this.isShowMenu = true;
            // recover menu
            this.isMenuOpen = false;
        }, this);
    };
    /**
     * string util
     */
    p.isNull = function (str) {
        if (str == undefined) {
            return true;
        }
        if (str == "") {
            return true;
        }
        if (str == null) {
            return true;
        }
        if (str == "null") {
            return true;
        }
    };
    p.getScore = function (level, redoCount, timediff) {
        // console.log(level + "," + redoCount + "," + timediff);
        var score = 0;
        if (level < 5) {
            score += 50;
        }
        else if (level < 10) {
            score += 100;
        }
        else if (level < 15) {
            score += 150;
        }
        else if (level < 20) {
            score += 200;
        }
        if (redoCount < 1) {
            score += 100;
        }
        else if (redoCount < 2) {
            score += 50;
        }
        else if (redoCount < 3) {
            score += 10;
        }
        if (timediff < 4000) {
            score += 100;
        }
        else if (timediff < 8000) {
            score += 50;
        }
        else if (timediff < 10000) {
            score += 10;
        }
        // console.log("score:" + score);
        return score;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map