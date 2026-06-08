const canvas =
document.getElementById("canvas");

const ctx =
canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

}

resize();

window.addEventListener(
"resize",
resize
);



const HEART_COLOR =
"#f2a8c6";

const HEART_GLOW =
"#ffd7e8";

const R_COLOR =
"#8fd8ff";

const R_GLOW =
"#d7f3ff";



const heartTargets =
generateHeartPoints();

const rTargets =
generateRPoints();



let heartParticles=[];
let rParticles=[];



function createParticle(tx,ty){

return{

startX:
(Math.random()-0.5)
*window.innerWidth,

startY:
(Math.random()-0.5)
*window.innerHeight,

x:0,
y:0,

tx,
ty,

progress:0

};

}
heartParticles = heartTargets.map(
p => createParticle(p.x,p.y)
);

rParticles = rTargets.map(
p => createParticle(p.x,p.y)
);

const STATE = {
BUILD_HEART:0,
BUILD_R:1,
HOLD:2,
DESTROY_R:3,
DESTROY_HEART:4
};

let currentState =
STATE.BUILD_HEART;

let stateStart =
Date.now();



function lerp(a,b,t){
return a+(b-a)*t;
}



function drawParticle(
x,
y,
size,
color,
glow
){

ctx.beginPath();

ctx.fillStyle=color;

ctx.shadowBlur=8;
ctx.shadowColor=glow;

ctx.arc(
canvas.width/2+x,
canvas.height/2+y,
size,
0,
Math.PI*2
);

ctx.fill();

}



function updateHeart(){

let completed=0;

heartParticles.forEach(p=>{

p.progress+=0.01;

if(p.progress>1)
p.progress=1;

p.x=lerp(
p.startX,
p.tx,
p.progress
);

p.y=lerp(
p.startY,
p.ty,
p.progress
);

if(p.progress===1)
completed++;

drawParticle(
p.x,
p.y,
1.5,
HEART_COLOR,
HEART_GLOW
);

});

if(
completed===
heartParticles.length
){

currentState=
STATE.BUILD_R;

}

}



function updateR(){

heartParticles.forEach(p=>{

drawParticle(
p.tx,
p.ty,
1.5,
HEART_COLOR,
HEART_GLOW
);

});



let completed=0;

rParticles.forEach(p=>{

p.progress+=0.01;

if(p.progress>1)
p.progress=1;

p.x=lerp(
p.startX,
p.tx,
p.progress
);

p.y=lerp(
p.startY,
p.ty,
p.progress
);

if(p.progress===1)
completed++;

drawParticle(
p.x,
p.y,
1.6,
R_COLOR,
R_GLOW
);

});



if(
completed===
rParticles.length
){

currentState=
STATE.HOLD;

stateStart=
Date.now();

}

}



function holdScene(){

heartParticles.forEach(p=>{

drawParticle(
p.tx,
p.ty,
1.5,
HEART_COLOR,
HEART_GLOW
);

});



rParticles.forEach(p=>{

drawParticle(
p.tx,
p.ty,
1.6,
R_COLOR,
R_GLOW
);

});



if(
Date.now()-stateStart
>4000
){

currentState=
STATE.DESTROY_R;

}

}



function destroyR(){

heartParticles.forEach(p=>{

drawParticle(
p.tx,
p.ty,
1.5,
HEART_COLOR,
HEART_GLOW
);

});



let gone=0;

rParticles.forEach(p=>{

p.progress-=0.006;

if(p.progress<0)
p.progress=0;

p.x=lerp(
p.startX,
p.tx,
p.progress
);

p.y=lerp(
p.startY,
p.ty,
p.progress
);

if(p.progress===0)
gone++;

drawParticle(
p.x,
p.y,
1.6,
R_COLOR,
R_GLOW
);

});



if(
gone===
rParticles.length
){

currentState=
STATE.DESTROY_HEART;

}

}



function destroyHeart(){

let gone=0;

heartParticles.forEach(p=>{

p.progress-=0.004;

if(p.progress<0)
p.progress=0;

p.x=lerp(
p.startX,
p.tx,
p.progress
);

p.y=lerp(
p.startY,
p.ty,
p.progress
);

if(p.progress===0)
gone++;

drawParticle(
p.x,
p.y,
1.5,
HEART_COLOR,
HEART_GLOW
);

});



if(
gone===
heartParticles.length
){

heartParticles=
heartTargets.map(
p=>createParticle(p.x,p.y)
);

rParticles=
rTargets.map(
p=>createParticle(p.x,p.y)
);

currentState=
STATE.BUILD_HEART;

}

}



function animate(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

ctx.shadowBlur=0;

switch(currentState){

case STATE.BUILD_HEART:
updateHeart();
break;

case STATE.BUILD_R:
updateR();
break;

case STATE.HOLD:
holdScene();
break;

case STATE.DESTROY_R:
destroyR();
break;

case STATE.DESTROY_HEART:
destroyHeart();
break;

}

requestAnimationFrame(
animate
);

}

animate();
