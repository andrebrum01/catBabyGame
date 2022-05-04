
// General configutarion
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
const scale = new Vector(canvas.width / rect.width, canvas.height / rect.height)
// Global Variables
var colided = false
// const gravit = 0.98

var interval=150;
var lastTime;
var increase=0


const background = new Image();
background.src="./assets/Background/Blue.png";

// const imagePlatform = new Image();
imagePlatform="./assets/Terrain/Terrain.png";


const mouse = new Vector()
const mouseMove = new Vector()
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
            y:canvas.height-200
        },
        350,
        10,
        imagePlatform,
        sheets={
            x:17,
            y:1,
            grid: 16
        }),
    new Platform(
            {
                x:canvas.width-700,
                y:canvas.height-400
            },
            350,
            10,
            imagePlatform,
            sheets={
                x:17,
                y:1,
                grid: 16
            }),
]

const player =  new Player({
    position:{
    x:0,
    y:0},
    velocity:{
        x:0,
        y:0
    },
    src:'./img/gaby.jpg'

})
const enemy =  new Player({
    position:{
    x:400,
    y:100},
    velocity:{
        x:0,
        y:0
    },
    src:'./img/brum.jpg',


})
const cat = new Cat({
        position:{
        x:500,
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
                sequencie:"sleep"
            },
            "walk":{
                initial:6,
                frameMax:4,
                frame:0,
                isLoop:true,
                sequencie:"walk"
            },
            "sleep":{
                initial:0,
                frameMax:8,
                frame:0,
                isLoop:false,
                sequencie:"sleep"
            }
        }

})


function animate(timestamp){
    

    // Se não Colider
    if(!player.detectionColision(enemy,()=>console.log('Colision Detected'))){
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
        cat.update(player);
        
        if(mouse.mag() != 0){
            c.beginPath();
            c.fillStyle = "rgba(250,250,250,.7)"
            c.arc(mouse.x*scale.x, mouse.y*scale.y, 250, 0, 2 * Math.PI);
            c.fill();
            c.closePath();
            c.beginPath();
            c.fillStyle = "rgba(250,50,50,1)"
            c.arc(mouseMove.x*scale.x, mouseMove.y*scale.y, 25, 0, 2 * Math.PI);
            c.fill();
            c.closePath();
        }

        if(!lastTime){lastTime=timestamp;}
        // calculate the elapsed time
        var elapsed=timestamp-lastTime;
        if(elapsed>interval){

            cat.passframe()       
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


// Keydown Events
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
                    const jumpForce = new Vector(0,-15)
                    player.applyForce(jumpForce)
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
            keyBoard.a.press = false
            player.velocity.x = 0
            break
        case 'a':
            keyBoard.d.press = false
            keyBoard.a.press = false
            player.velocity.x = 0
            break
        case 'w':
            keyBoard.w.press = false
            break
    }
})



canvas.addEventListener('touchstart', (e)=>{
    // c.strokeStyle = "red 1px"
    

    mouse.mult(0)
    mouse.add(new Vector(e.touches[0].clientX - rect.left,e.touches[0].clientY- rect.top))
    mouseMove.set(mouse)
    console.log(mouse)
})
canvas.addEventListener('touchmove', (e)=>{
    mouseMove.set(new Vector(e.changedTouches[0].clientX- rect.left,e.changedTouches[0].clientY- rect.top));
    resultMouse = Vector.sub(mouse,mouseMove)
    if(keyBoard.d.press=true && resultMouse.x <-125){
        player.moveX(0.5)
    }
    if(keyBoard.d.press=true && resultMouse.x>125){
        player.moveX(-0.5)
    }
    if(resultMouse.y >125)
        if(player.jump <2){
            keyBoard.w.press = true
            player.jump++;
            player.isGrounded = false;
            const jumpForce = new Vector(0,-15)
            player.applyForce(jumpForce)
        }
    console.log(resultMouse)
    console.log(player.position)

})
canvas.addEventListener('touchend', (e)=>{

    mouseMove.mult(0)
    mouse.mult(0)
    keyBoard.d.press = false
    keyBoard.a.press = false
    player.velocity.x = 0
    player.acc.x = 0
})


