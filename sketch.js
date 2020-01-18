"use strict";

// ----- vars ----- //
let canvas;
let rows, columns, terrain;
let scale = 20;


// ----- setup ----- //
function setup() {

   // create and style canvas 
   canvas = createCanvas(windowWidth, windowHeight, WEBGL);
   canvas.style('display: block;');

   // get number of rows and columns 
   columns = Math.floor(width / scale);
   rows = Math.floor(height * 1.5 / scale);

   terrain = generateTerrain(rows, columns, 10);
}

// ----- resize ----- // 
function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

// ----- draw ----- // 
function draw() {
   background(0);
   drawMesh(terrain);
}

// ----- init terrain ----- // 
function generateTerrain(rows, columns, offset) {

   let terrain = new Array(rows);
   for (let i = 0; i < terrain.length; i++) {
      terrain[i] = new Array(columns);
   }

   for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
         terrain[y][x] = random(-offset, offset);
      }
   }

   return terrain;
}

// ----- create grid ----- // 
function drawMesh(terrain) {
   push();

   // setup
   stroke(255);
   noFill();
   rotateX(PI / 3);
   translate(-width / 2, -height / 2, 0);

   // draw triangle strips
   for (let y = 0; y < rows - 1; y++) {

      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < columns; x++) {
         vertex(x * scale, y * scale, terrain[y][x]);
         vertex(x * scale, (y + 1) * scale, terrain[y + 1][x]);
      }
      endShape();
   }
   pop();
}