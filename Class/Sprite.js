const gravit = new Vector(0,1);

class Sprite{
    
    constructor({position,velocity,src,width=80,height=80,animation=null}){
        this.position = new Vector(position.x,position.y);
        this.width = width;
        this.height = height;
        this.velocity = new Vector(velocity.x,velocity.y);
        this.acc = new Vector(0,0);
        this.img = new Image();
        this.img.src = src;
        this.jump = 2
        this.animation= animation ;
        this.actualAnimation="sitDown"
        this.isGrounded=false
        this.mirror = true
        
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
        
        if(this.mirror){
            c.scale(-1,1)
            c.drawImage(
            this.img,
            sheets.x*i,
            sheets.y*j,
            sheets.x,
            sheets.y,
            - this.width- this.position.x,
            this.height/3 + this.position.y,
            this.width,
            this.height
            )
        }
        else{
            c.scale(1,1)
            c.drawImage(
            this.img,
            sheets.x*i,
            sheets.y*j,
            sheets.x,
            sheets.y,
            this.position.x,
            this.height/3 + this.position.y,
            this.width,
            this.height
            )
        }
        c.restore()
    }

    modifyAnimation(textAnimation){
        let arrayFrame = []
        let tempAnimation = this.animation[textAnimation];
        let tempText = textAnimation;
        while(true){
            arrayFrame.push(tempAnimation)
            if(tempText == tempAnimation.sequencie){
                break;
            }
            else{
                tempText = tempAnimation.sequencie;
                tempAnimation = this.animation[tempText];

            }
        }

        if( arrayFrame.indexOf(this.animation[this.actualAnimation]) == -1){
            this.animation[this.actualAnimation].frame = 0
            this.actualAnimation = textAnimation
            this.animation[this.actualAnimation].frame = 0
        }
    }

    passframe(){
        if(this.animation[this.actualAnimation].isLoop || this.animation[this.actualAnimation].frame < this.animation[this.actualAnimation].frameMax-1 )
        if(this.animation[this.actualAnimation].frame==0){                   
            increase=1
                
            }
            else if(this.animation[this.actualAnimation].frame==this.animation[this.actualAnimation].frameMax-1)
                increase = -1    
            
            if(this.animation[this.actualAnimation].frame<this.animation[this.actualAnimation].frameMax)
                this.animation[this.actualAnimation].frame+=increase
            
            this.actualAnimation=this.animation[this.actualAnimation].sequencie
    }
    
}