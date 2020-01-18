"use strict";

// ----- vars ----- //
let canvas;
let rows, columns;
let scale = 20;

// ----- setup ----- //
function setup() {

   // create and style canvas 
   canvas = createCanvas(windowWidth, windowHeight, WEBGL);
   canvas.style('display: block;');

   // get number of rows and columns 
   columns = width / scale;
   rows = height / scale;
}

// ----- resize ----- // 
function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

// ----- draw ----- // 
function draw() {
   background(0);
   translate(-width/2, -height/2, 0);
   rotateX(PI/3);
   drawMesh();
}


// ----- create grid ----- // 
function drawMesh() {
   push();
   stroke(255);
   noFill();

   for (let y = 0; y < rows; y++) {

      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < columns; x++) {
         vertex(x*scale, y*scale);
         vertex(x*scale, (y + 1)*scale);
      }
      endShape();
   }
   pop();
}