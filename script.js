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
*window.innerWidth*2,

startY:
(Math.random()-0.5)
*window.innerHeight*2,

x:0,
y:0,

tx,
ty,

progress:0

};

}
