var canvas=document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

var colorArray =[
    '#F2167D',
    'yellow',
    'green',
    'blue',
    'red',
    '#F27405',
    '#E216F5',
    'orange',
    '#FF5EA1',
    '#FF0D74'
]

var mouse={
    x:undefined,
    y:undefined
}

function Bounce(x,y,dx,dy,radius,color){
    this.x=x;
    this.y=y;
    this.dy=dy;
    this.dx=dx;
    this.radius=radius;
    this.color=color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle=this.color;
        c.stroke();
        c.fill();
    }
    this.update = function(){
        if(this.y+this.radius>canvas.height || this.y+this.radius<0){
            this.dy=-this.dy;
        }else if(this.radius>10){
            this.dy+=1;
        }
        else{
            this.dy+=1*0.9;
        }
        
        if(this.dx!=0){
            this.x+=this.dx;
        }
        if(this.x+this.radius>canvas.width || this.x+this.radius<0){
            this.dx=-this.dx;
        }
        this.y+=this.dy;
        this.draw();
    }

}
var circleArray=[],f=0;
var rad=[20,17,15,10,7.5,5,0];

window.addEventListener('click',function(event){
    console.log(event);
    mouse.x=event.x;
    mouse.y=event.y;
    circleArray.push(new Bounce(mouse.x,mouse.y,0,2,20,colorArray[Math.floor(Math.random()*colorArray.length)]));
    f=1;
});

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight);
    if(f==1){
        for(i=0;i<circleArray.length;i++){
            circleArray[i].update();
            if(circleArray[i].y+circleArray[i].radius>canvas.height){
                for(var j=0;j<rad.length;j++){
                    if(rad[j]==circleArray[i].radius){
                        if(circleArray[i].radius<=10){
                            circleArray.push(new Bounce(circleArray[i].x,circleArray[i].y,(2*Math.random()-1)*10,circleArray[i].dy*(Math.random()+0.5),rad[j+1],circleArray[i].color))
                            circleArray.push(new Bounce(circleArray[i].x,circleArray[i].y,(2*Math.random()-1)*10,circleArray[i].dy*(Math.random()+0.5),rad[j+1],circleArray[i].color))
                        }
                        else{
                            circleArray.push(new Bounce(circleArray[i].x,circleArray[i].y,(2*Math.random()-1)*10,circleArray[i].dy*(Math.random()/2+0.5),rad[j+1],circleArray[i].color))
                            circleArray.push(new Bounce(circleArray[i].x,circleArray[i].y,(2*Math.random()-1)*10,circleArray[i].dy*(Math.random()/2+0.5),rad[j+1],circleArray[i].color))
                        }
                    }
                }

                circleArray.splice(i,1);
            }
        }
    }
}
setInterval(animate,15);