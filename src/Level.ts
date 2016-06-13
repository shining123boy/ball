/**
 * Level
 */
class Level extends egret.DisplayObject {
    private basicLine: number;
    private baseball: number;
    private rotateDirection: boolean;

    constructor(level: number) {
        super();
        // if(level<10){
        //     this.basicLine = level + 2;
        // }else{
        //      this.basicLine = 10;
        // }
        // if(level%6==0){
            // console.log(level);
        this.basicLine = level%4+3;//Math.round(Math.random()*4+3);    
        // }
        // this.basicLine = level%6;//Math.round(Math.random()*4+3);
        this.baseball = level + 2;
        
        // if (level < 3) {
        //     this.basicLine = 3;
                      
        // } else if (level < 5) {
        //     this.basicLine = 4;
                     
        // } else if (level < 7) {
        //     this.basicLine = 5;
                      
        // } else if (level < 9) {
        //     this.basicLine = 6;
                      
        // } else if (level < 11) {
        //     this.basicLine = 7;
                       
        // } else if (level < 13) {
        //     this.basicLine = 8;
                       
        // } else if (level < 15) {
        //     this.basicLine = 9;
                       
        // } else if (level < 17) {
        //     this.basicLine = 10;
                       
        // } else if (level < 20) {
                       
        //     this.basicLine = 10;
        // }
        if (level % 2 == 0) {
            this.rotateDirection = false;
        } else {
            this.rotateDirection = true;
        }
    }
    public setBasicLine(num: number) {
        this.basicLine = num;
    }
    public getBasicLine() {
        return this.basicLine;
    }
    public getBaseball() {
        return this.baseball;
    }
    public getRotateDirection() {
        return this.rotateDirection;
    }
}