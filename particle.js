class Particle {
    constructor({canvas,pos={x:0,y:0},vel={x:0,y:0},acc={x:0,y:0}}){
        this.canvas = canvas;
        this.pos = new Vector(pos.x,pos.y);
        this.vel =  new Vector(vel.x,vel.y);
        this.acc =  new Vector(acc.x,acc.y);
        this.r = Math.floor(Math.random() * 5)+22;
        this.lifetime = Math.floor(Math.random() * 5)+5;
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
        this.canvas.drawImage(this.img,this.pos.x ,this.pos.y- (this.r/2),this.r ,this.r)
        this.canvas.globalAlpha = 1;
        // c.fillRect(this.pos.x,this.pos.y,50,50)

    }
    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        let x = this.acc.x>=0?
        this.acc.x-1<=0?
        0:
        this.acc.x-1
        :
        this.acc.x+1>=0?
        0:
        this.acc.x+1;
        let y =this.acc.y-1<=0?0:this.acc.y-1;
        this.acc.add(new Vector(x,y));
        this.lifeatual -=1;
        this.draw();
    }
}

