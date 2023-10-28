class Car{
    constructor(x, y, width, height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.accelaration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        this.controls=new Controls();
    }

    update(){
        this.#move();    
    }

    #move(){
        //acceleration
        if(this.controls.forward){
            this.speed+=this.accelaration;
        }
        if(this.controls.reverse){
            this.speed-=this.accelaration;
        }

        //capping the speed to maxSpeed
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }


        //simulating car stopping eventually with the laws of physics(friction force and deccelaration)
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        //for reverse
        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }

        //angle works according to the unit circle
        if(this.controls.left){
            this.angle+=0.03;
        }
        if(this.controls.right){
            this.angle-=0.03;
        }

        this.x-=Math.sin(this.angle)*this.speed; //Vsin(theta) - x component of velocity
        this.y-=Math.cos(this.angle)*this.speed; //Vcos(theta) - y component of velocity

    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }
}