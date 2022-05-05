class Cat extends Sprite{
    constructor({position,velocity,src,width=80,height=80,animation=null}){
        super({position,velocity,src,width,height,animation});
        this.jump=0;
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

    update(perseguition){

        if(this.animation)
        this.animate()
        else
        this.draw()

        // console.log(this.position)
        this.acc.limit(5);
        this.velocity.limit(30);
        this.moveTo(perseguition)
        this.velocity.add(this.acc);
        this.position.add(this.velocity);
        this.acc.mult(0)
        
        let grounded =0
        grounds.map((ground)=>{
            if(this.detectionColision(ground)){
                    this.acc.y = 0 
                    this.velocity.y = 0 
                    this.jump =0
                    grounded++;
            }
        })
        this.isGrounded=grounded!=0;

        this.detectionBorder();
        
        this.velocity.add(this.acc);
        this.position.add(this.velocity);
        !this.isGrounded &&this.applyForce(gravit);

        this.animationVerify(perseguition);
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

    moveTo(perseguition){
        let dist = Math.floor(Math.sqrt(Math.pow(this.position.x - perseguition.position.x,2)))-100;

        let signal = this.position.x - perseguition.position.x ;
        signal = signal !==0? -signal / Math.abs(signal) : 0;

        let tempVector = new Vector((dist/150)*signal,0)
        // dist>=0 && this.acc.add(new Vector(-dist /10,0))
        if(dist >150)this.velocity.x= tempVector.x;
        else if(this.velocity.x !=0){
            this.velocity.x = 0;
        }
    }

    animationVerify(perseguition){
        let signal = this.position.x - perseguition.position.x ;
        signal = signal !==0? -signal / Math.abs(signal) : 0;

        this.mirror = signal >0?true :false;
        
        if(this.velocity.x != 0){
            this.modifyAnimation("walk")
        }
        else{
            this.modifyAnimation("sitDown")
        }
    }
}
