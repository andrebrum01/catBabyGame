class Platform{
    constructor(position,width,height,src="./assets/Terrain/Terrain.png",sheets={x:0,y:0}){
        this.position = new Vector(position.x,position.y);
        this.width = width-(width%(sheets.grid*2));
        this.height = height -(height%(sheets.grid*2));
        this.color = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
        this.img = new Image();
        this.img.src = src;
        this.sheets= {...new Vector(sheets.x,sheets.y),...sheets}
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
