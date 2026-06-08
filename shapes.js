function generateHeartPoints(count = 5000){

const points=[];

for(let i=0;i<count;i++){

const t=Math.random()*Math.PI*2;

const x=
16*Math.pow(Math.sin(t),3);

const y=
-(13*Math.cos(t)
-5*Math.cos(2*t)
-2*Math.cos(3*t)
-Math.cos(4*t));

points.push({
x:x*13,
y:y*13
});

}

return points;

}



function generateRPoints(){

const points=[];

const canvas=document.createElement("canvas");

canvas.width=500;
canvas.height=500;

const ctx=canvas.getContext("2d");

ctx.fillStyle="white";
ctx.font="bold 320px Georgia";
ctx.textAlign="center";

ctx.fillText("ℛ",250,340);

const data=
ctx.getImageData(
0,
0,
canvas.width,
canvas.height
).data;

for(let y=0;y<500;y+=4){

for(let x=0;x<500;x+=4){

const index=
(y*500+x)*4;

if(data[index+3]>100){

points.push({
x:(x-250)*0.40,
y:(y-250)*0.40
});

}

}

}

return points;

}
