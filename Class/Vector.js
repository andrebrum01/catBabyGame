class Vector {
    
    constructor(x_=0,y_=0){
        this.x = x_;
        this.y = y_;
    }

    set (vector){
        this.x =vector.x
        this.y =vector.y
    }
    add(vector={x:0,y:0}){
        this.x+=vector.x;
        this.y+=vector.y;
    }
    
    sub(vector){
        this.x-=vector.x;
        this.y-=vector.y;
    }

    mult(val){
        this.x*=val;
        this.y*=val;
        return this;
    }

    div(val){
        this.x/=val;
        this.y/=val;
    }

    mag(){
        return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
    }

    normalize(){
        let m = this.mag()
        m!=0 && this.div(m)
    }

    random(tam=100){
        this.x = Math.floor(Math.random()*tam);
        this.y = Math.floor(Math.random()*tam);
    }

    limit(lim){
        if (this.mag()>lim){
            this.normalize();
            this.mult(lim);
        }
        
    }

    print(){
        return `x: ${this.x}, y: ${this.y}`
    }
    static dist(vector1,vector2){
        return Math.floor(Math.sqrt(Math.pow(vector1.x - vector2.x,2)+Math.pow(vector1.y - vector2.y,2)));
    }

    static add(vector1,vector2){
        return new Vector (vector1.x+vector2.x,vector1.y+vector2.y);
    }
    static sub(vector1,vector2){
        return new Vector (vector1.x-vector2.x,vector1.y-vector2.y);
    }
    
}