const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var colided = false
const gravit = 0.98

var interval=100;
var lastTime;

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


// width = 1024;
// height = 576;

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {

    if(window.innerWidth > window.innerHeight){
        canvas.style.height = "100vh"
        canvas.style.width = "auto"
    }
    else{
        canvas.style.height = "auto"
        canvas.style.width = "100vw"
    }

    
    drawCanvas(); 
}

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
    
    constructor({position,velocity,src,width=80,height=80}){
        this.position = position;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.img = new Image();
        this.img.src = src;
        this.jump = 2
        this.frameMax = 9
        this.frame =0
        this.isLoop = false

    }

    draw() {
        // c.fillStyle = 'rgb('+Math.abs(this.velocity.x*25)+','+Math.abs(this.velocity.y*25)+','+Math.abs(this.velocity.x*25)+')'
        c.drawImage(this.img,this.position.x,this.position.y,this.width ,this.height)
    }

    update(){
        this.draw()
        this.move({y:gravit})

        grounds.map((ground)=>{
            if(this.detectionColision(ground)){
                    this.velocity.y = 0 
                    this.jump =0
            }
        })
    }

    move(velocity){
        velocity = {...this.velocity}

        
        this.position.y +=velocity.y;
        this.position.x +=velocity.x;

        let futurePositon = {
            x:this.position.x + this.width + this.velocity.x,
            y:this.position.y + this.height + this.velocity.y
        }


        if( futurePositon.y > canvas.height){
            this.velocity.y = 0
            
        }
        else this.velocity.y += gravit
        
        if(this.position.y < 0) this.velocity.y = 0

        if( futurePositon.x > canvas.width){
            this.velocity.x = 0

        }
        else if(Math.abs(this.velocity.x) < 20) this.velocity.x += this.velocity.x/20
        
        if(this.position.x < 0) {
            this.velocity.x = 0
            this.position.x =0
        }

        
        
        
    }

    detectionColision(ent,func=()=>{}){
        if( ((this.position.x >= ent.position.x &&
            this.position.x <= ent.position.x + ent.width)||
            (this.position.x + this.width >= ent.position.x &&
            this.position.x + this.width <= ent.position.x + ent.width)
            ) &&
            (this.position.y + this.height + this.velocity.y >= ent.position.y &&
            this.position.y + this.velocity.y <= ent.position.y + ent.height)
            ){
                func()
                return true
        }

        return false
    
    }

    animate(){
        if(this.isLoop ){
            this.frame %= this.frameMax

        }
        
        
        let sheets ={
            x:this.img.width/4,
            y:this.img.height/16}
        let i = this.frame % 4 
        let j = Math.floor(this.frame / 4) 
        
        c.save()
        c.translate(0,0);
        c.scale(-1,1)
        c.drawImage(
            this.img,
            sheets.x*i,
            sheets.y*j,
            sheets.x,
            sheets.y,
            -80,
            0,
            80,
            80
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
    width: 100,
    height: 100,

})

const cat = new Sprite({
        position:{
        x:0,
        y:0},
        velocity:{
            x:0,
            y:0
        },
        src:'./assets/Cats/fred.png',

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

        // Draw Enty

        enemy.update()
        player.update()
        cat.animate()
        if(!lastTime){lastTime=timestamp;}
        // calculate the elapsed time
        var elapsed=timestamp-lastTime;
        if(elapsed>interval){
            if(cat.isLoop || cat.frame < cat.frameMax-1 )
                cat.frame++

                
            lastTime=performance.now();
        }

        drawGround()


    }
    // Se Colider
    else{
        window.cancelAnimationFrame(animate)
        new Promise(r => setTimeout(() => r(), 2000)).then(()=>{
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
}

function drawGround(){
    grounds.map((ground)=>{
        ground.draw()
    })
    
}

resizeCanvas();
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
                player.velocity.x =5
            }
            break
        case 'a':
            if(!keyBoard.a.press){
                keyBoard.a.press = true
                player.velocity.x =-5
            }
            
            break
        case 'w':
                if(!keyBoard.w.press){
                if(player.jump <2){
                    player.jump++;
                    player.velocity.y = -20
                }}
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
    }
})


