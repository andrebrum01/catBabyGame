class Particle {
    constructor({canvas,pos={x:0,y:0},vel={x:0,y:0},acc={x:0,y:0}}){
        this.canvas = canvas;
        this.pos = {...pos};
        this.vel = {...vel};
        this.acc = {...acc};
        this.r = Math.floor(Math.random() * 5)+22;
        this.lifetime = Math.floor(Math.random() * 50)+1;
        this.lifeatual = this.lifetime;
        this.img=new Image();
        this.img.src = './assets/Other/DustParticle.png';

    }
    draw(){
        this.canvas.globalAlpha = this.lifeatual/this.lifetime;
        // this.canvas.beginPath();
        // this.canvas.ellipse(
        //     this.pos.x,
        //     this.pos.y,
        //     this.r,
        //     this.r,
        //     0,
        //     0,
        //     Math.PI*2,
        //     false)
        // this.canvas.fill();
        // this.canvas.closePath();
        this.canvas.drawImage(this.img,this.pos.x - this.r,this.pos.y,this.r ,this.r)
        this.canvas.globalAlpha = 1;
        // c.fillRect(this.pos.x,this.pos.y,50,50)

    }
    update(){
        this.vel={
            x: this.vel.x+this.acc.x,
            y: this.vel.y+this.acc.y
        };
        this.pos={
            x: this.pos.x+this.vel.x,
            y: this.pos.y +this.vel.y
        };
        this.acc={
            x:this.acc.x>=0?
                this.acc.x-1<=0?
                0:
                this.acc.x-1
                :
                this.acc.x+1>=0?
                0:
                this.acc.x+1
                ,
            y:this.acc.y-1<=0?0:this.acc.y-1};
        this.lifeatual -=1;
        this.draw();
    }
}

