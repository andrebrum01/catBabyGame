const p = [];

class Player extends Sprite{
    constructor({position,velocity,src,width=80,height=80,animation=null}){
        super({position,velocity,src,width,height,animation});
    }

    moveX(x){
        const velVector = new Vector(x,0)
        this.acc.add(velVector);        
    }

    moveY(y){
        const velVector = new Vector(0,y)
        this.acc.add(velVector);               
    }

    detectionColision(ent,func=()=>{}){
        if( ((this.position.x >= ent.position.x &&
            this.position.x <= ent.position.x + ent.width)||
            (this.position.x + this.width >= ent.position.x &&
            this.position.x + this.width <= ent.position.x + ent.width)
            ) &&
            (this.position.y + this.height + this.velocity.y+ this.acc.y >= ent.position.y &&
            this.position.y + this.velocity.y + this.acc.y <= ent.position.y + ent.height &&
            this.velocity.y>=0)
            ){
                func()
                return true
        }

        return false
    
    }

    applyForce(force){
        this.acc.add(force)
    }

    update(){
        this.velocity.limit(30);
        this.velocity.add(this.acc);
        this.position.add(this.velocity);
        this.acc.mult(0)

        let grounded =0
        grounds.map((ground)=>{
            if(this.detectionColision(ground)){
                    this.acc.y = 0 
                    this.velocity.y = 0 
                    this.jump =0
                    this.position.y =ground.position.y - this.height;
                    grounded++;
            }
        })
        this.isGrounded=grounded!=0;

        this.detectionBorder();
        
        
        this.velocity.add(this.acc);
        this.position.add(this.velocity);
        this.generationParticle();
        !this.isGrounded &&this.applyForce(gravit);

        
    }

    generationParticle(){
        if(this.jump==0 &&Math.abs(this.velocity.x) >0){
            for(let i=0; i< 3;i++)
                p.push(
                    new Particle({
                        canvas:c,
                        pos:{
                            x:this.velocity.x>0?this.position.x-this.velocity.x:this.position.x+this.width+this.velocity.x,
                            y:this.position.y+this.height
                        },
                        vel:{
                            x:this.velocity.x,
                            y:this.velocity.y
                        },
                        acc:{
                            x:this.velocity.x>0?-(Math.floor(Math.random()* 5)+2):(Math.floor(Math.random()* 5)+2),
                            y:-(Math.floor(Math.random()* 3)+1)
                        }
                    }),
                )
    }
    }

    detectionBorder(){
        if( this.acc.x + this.position.x + this.width + this.velocity.x > canvas.width){
            this.acc.x = 0
            this.velocity.x = 0

        }
        
        if(this.position.x + this.velocity.x + this.acc.x < 0) {
            this.acc.x = 0
            this.velocity.x = 0
            this.position.x = 0
        }

        if( this.position.y + this.height + this.velocity.y+ this.acc.y > canvas.height || this.isGrounded){
            this.acc.y = 0
            this.velocity.y = 0
            
        }
        
        if(this.position.y+this.velocity.y+this.acc.y < 0 ){
            this.acc.y = 0
            this.velocity.y = 0
        }
    }
}
