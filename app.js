const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const canvasSize = 500;
canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvasSize,canvasSize);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle =  "#2c2c2c";

let painting = false;
let filling = false;

function stopPainting() {
    painting= false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y)
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown () {
painting = true;
}

function handleColor (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle =  color;
}

function handleRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleMode(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
       
    }
}


function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvasSize,canvasSize)
    }
}


function handleContext(event){
    event.preventDefault();
    console.log(event);
}

function saveImage(){
   const image = canvas.toDataURL("image/jpeg");
   const link = document.createElement("a");
   link.href = image;
   link.download = "painting"
   link.click()
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleContext)
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColor));

    if(range) {
        range.addEventListener("input", handleRange)
    }

    if(range) {
        mode.addEventListener("click", handleMode)
    }
    if(save){
        save.addEventListener("click", saveImage)
    }