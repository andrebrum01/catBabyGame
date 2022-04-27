
// General configutarion
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Global Variables
var colided = false
const gravit = 0.98

var interval=150;
var lastTime;
var increase=0


const background = new Image();
background.src="./assets/Background/Blue.png";

// const imagePlatform = new Image();
imagePlatform="./assets/Terrain/Terrain.png";



var keyBoard ={
    a:{
        press:false
    },
    d:{
        press:false
    },
    w:{
        press:false
    },
    lastKey:null

}

const p = [];


// width = 1024;
// height = 576;


class Platform{
    constructor(position,width,height,src="./assets/Terrain/Terrain.png",sheets={x:0,y:0}){
        this.position = position;
        this.width = width-(width%(sheets.grid*2));
        this.height = height -(height%(sheets.grid*2));
        this.color = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
        this.img = new Image();
        this.img.src = src;
        this.sheets= sheets
    }

    draw(){
        
        try{
            for(let i=0; i<this.width; i+=this.sheets.grid*2){
                if(i==0){
                    c.drawImage(
                        this.img,
                        this.sheets.x*this.sheets.grid,
                        this.sheets.y*this.sheets.grid,
                        this.sheets.grid,
                        this.sheets.grid,
                        this.position.x+(i),
                        this.position.y,
                        this.sheets.grid*2,
                        this.sheets.grid*2
                    )
                }
                else if(i==this.width-32){
                    c.drawImage(
                        this.img,
                        (this.sheets.x+2)*this.sheets.grid,
                        this.sheets.y*this.sheets.grid,
                        this.sheets.grid,
                        this.sheets.grid,
                        this.position.x+(i),
                        this.position.y,
                        16*2,
                        16*2
                    )
                }
                else{
                    c.drawImage(
                        this.img,
                        (this.sheets.x+1)*this.sheets.grid,
                        this.sheets.y*this.sheets.grid,
                        this.sheets.grid,
                        this.sheets.grid,
                        this.position.x+(i),
                        this.position.y,
                        this.sheets.grid*2,
                        this.sheets.grid*2
                    )
                }
            }
        }
        catch{
            c.fillStyle = this.color
            c.fillRect(this.position.x,this.position.y,this.width,this.height)
        }
    }


}

class Sprite{
    
    constructor({position,velocity,src,width=80,height=80,animation=null}){
        this.position = position;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.img = new Image();
        this.img.src = src;
        this.jump = 2
        this.animation= animation ;
        this.actualAnimation="sitDown"
        this.isGrounded=false
    }

    draw() {
        // c.fillStyle = 'rgb('+Math.abs(this.velocity.x*25)+','+Math.abs(this.velocity.y*25)+','+Math.abs(this.velocity.x*25)+')'
        c.drawImage(this.img,this.position.x,this.position.y,this.width ,this.height)
    }

    update(){
        if(this.animation)
        this.animate()
        else
        this.draw()
        this.moveY(gravit)
        this.moveX(this.velocity.x)
        

        let grounded =0
        grounds.map((ground)=>{
            if(this.detectionColision(ground)){
                    this.velocity.y = 0 
                    this.jump =0
                    grounded++;
            }
        })

        this.isGrounded=grounded!=0
        
        if(this.jump==0 &&Math.abs(this.velocity.x) >0){
            for(let i=0; i< 3;i++)
                p.push(
                    new Particle({
                        canvas:c,
                        pos:{
                            x:this.velocity.x>0?this.position.x-this.velocity.x:this.position.x+this.width,
                            y:this.position.y+this.height
                        },
                        vel:{
                            x:this.velocity.x,
                            y:this.velocity.y
                        },
                        acc:{
                            x:this.velocity.x>0?-(Math.floor(Math.random()* 10)+1):(Math.floor(Math.random()* 10)+2),
                            y:-(Math.floor(Math.random()* 10)+1)
                        }
                    }),
                )
        }
    }

    moveX(x){

        this.velocity.x +=x;

        let futurePositon = {
            x:this.position.x + this.width + this.velocity.x,
        }


        
        if( futurePositon.x > canvas.width){
            this.velocity.x = 0

        }
        
        if(this.position.x + this.velocity.x < 0) {
            this.velocity.x = 0
            this.position.x =0
        }
        this.velocity.x = (this.velocity.x)>=20?20:this.velocity.x;
        this.velocity.x = (this.velocity.x)<=-20?-20:this.velocity.x;

        this.position.x += this.velocity.x

        
    }

    moveY(y){
        this.velocity.y +=y;

        let futurePositon = {
            y:this.position.y + this.height + this.velocity.y
        }


        if( futurePositon.y > canvas.height || this.isGrounded){
            this.velocity.y = 0
            
        }
        // else this.velocity.y += gravit
        
        if(this.position.y+this.velocity.y < 0 ) this.velocity.y = 0
        
        this.position.y += this.velocity.y
        
    }

    detectionColision(ent,func=()=>{}){
        if( ((this.position.x >= ent.position.x &&
            this.position.x <= ent.position.x + ent.width)||
            (this.position.x + this.width >= ent.position.x &&
            this.position.x + this.width <= ent.position.x + ent.width)
            ) &&
            (this.position.y + this.height + this.velocity.y >= ent.position.y &&
            this.position.y + this.velocity.y <= ent.position.y + ent.height &&
            this.velocity.y>=0)
            ){
                func()
                return true
        }

        return false
    
    }

    animate(){
        // if(this.animation[this.actualAnimation].isLoop ){
        //     this.animation[this.actualAnimation].frame %= this.animation[this.actualAnimation].frameMax
        // }
        
        
        let sheets ={
            x:this.img.width/4,
            y:this.img.height/16}
        let i = this.animation[this.actualAnimation].frame % 4 
        let j = Math.floor(this.animation[this.actualAnimation].frame / 4) + this.animation[this.actualAnimation].initial 
        
        c.save()
        c.translate(0,0);
        c.scale(-1,1)
        c.drawImage(
            this.img,
            sheets.x*i,
            sheets.y*j,
            sheets.x,
            sheets.y,
            -this.width + this.position.x,
            this.height/3 + this.position.y,
            this.width,
            this.height
        )
        c.restore()
        
    }
}

const grounds=[
    new Platform(
        {
            x:0
            ,y:canvas.height-32
        },
        canvas.width,
        32,
        imagePlatform,
        sheets={
            x:6,
            y:0,
            grid:16
        }),
    new Platform(
        {
            x:canvas.width-500,
            y:canvas.height-100
        },
        300,
        10,
        imagePlatform,
        sheets={
            x:17,
            y:1,
            grid: 16
        }),
]

const player =  new Sprite({
    position:{
    x:0,
    y:0},
    velocity:{
        x:0,
        y:0
    },
    src:'./img/gaby.jpg'

})
const enemy =  new Sprite({
    position:{
    x:400,
    y:100},
    velocity:{
        x:0,
        y:0
    },
    src:'./img/brum.jpg',


})


const cat = new Sprite({
        position:{
        x:0,
        y:500},
        velocity:{
            x:0,
            y:0
        },
        src:'./assets/Cats/fred.png',
        animation:{
            "idle":{
                initial:0,
                frameMax:8,
                frame:0,
                isLoop:false,
                sequencie:"idle"
            },
            "sitDown":{
                initial:4,
                frameMax:6,
                frame:0,
                isLoop:false,
                sequencie:"sitDownIdle"
            },
            "sitDownIdle":{
                initial:3,
                frameMax:4,
                frame:0,
                isLoop:true,
                sequencie:"sitDownIdle"
            }
        }

})

var num = 1;

function animate(timestamp){

    // console.log(player.detectionColision(grounds[0],()=>console.log("salve")))

    // Se não Colider
    if(!player.detectionColision(enemy,()=>console.log('ad'))){
        // Draw canvas
        window.requestAnimationFrame(animate);
        clearCanvas(c);


        drawCanvas();
        drawGround();
        // Draw Enty
        p.map((particle,i) =>{
            if(particle.lifeatual <=0){
                p.splice(i)
            }
            else
                particle.update()
        })
        enemy.update();
        player.update();
        cat.update();
        
        

        

        if(!lastTime){lastTime=timestamp;}
        // calculate the elapsed time
        var elapsed=timestamp-lastTime;
        if(elapsed>interval){

            if(cat.animation[cat.actualAnimation].isLoop || cat.animation[cat.actualAnimation].frame < cat.animation[cat.actualAnimation].frameMax-1 )
            if(cat.animation[cat.actualAnimation].frame==0){                   
                increase=1
                
            }
            else if(cat.animation[cat.actualAnimation].frame==cat.animation[cat.actualAnimation].frameMax-1)
                increase = -1    
            
            if(cat.animation[cat.actualAnimation].frame<cat.animation[cat.actualAnimation].frameMax)
                cat.animation[cat.actualAnimation].frame+=increase
            cat.actualAnimation=cat.animation[cat.actualAnimation].sequencie       
            lastTime=performance.now();
        }

        


    }
    // Se Colider
    else{
        

        
        new Promise(r => setTimeout(() => r(), 2000)).then(()=>{
            window.cancelAnimationFrame(animate)
            endHug()
        });
        
    }
}

function drawCanvas(){
    let back = c.createPattern(background,"repeat")
    c.fillStyle = back;
    c.fillRect(0,0,canvas.width ,canvas.height)

    player.draw()
    enemy.draw()


    drawGround()
    p.map(particle =>{
        particle.draw()
    })

}

function drawGround(){
    grounds.map((ground)=>{
        ground.draw()
    })
    
}

drawCanvas();
animate();




function clearCanvas(ctx) {
    ctx.beginPath();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function endHug(){
    window.requestAnimationFrame(endHug);
    clearCanvas(c);
    const img = document.querySelector("#endGame")
    img.style.display = "flex";
}

function Distance(ponto1,ponto2){
    const distX = Math.pow(( ponto1.x- ponto2.x),2)
    const distY = Math.pow(( ponto1.y - ponto2.y),2)
    const dist = Math.sqrt(distX + distY)
    return dist
}


window.addEventListener('keydown', (e)=>{
    e.preventDefault()
    switch (e.key){
        case 'd':
            if(!keyBoard.d.press){
                keyBoard.d.press=true
                player.moveX(5)
                
            }
            break
        case 'a':
            if(!keyBoard.a.press){
                keyBoard.a.press = true
                player.moveX(-5)
            }
            
            break
        case 'w':
                if(!keyBoard.w.press){
                if(player.jump <2){
                    keyBoard.w.press = true
                    player.jump++;
                    player.isGrounded = false;
                    player.moveY(player.velocity.y-20)
                }
            
                }
                break
    }
})

window.addEventListener('keyup', (e)=>{
    e.preventDefault()
    switch (e.key){
        case 'd':
            keyBoard.d.press = false
            player.velocity.x =0
            break
        case 'a':
            keyBoard.a.press = false
            player.velocity.x =0
            break
        case 'w':
            keyBoard.w.press = false
            break
    }
})


