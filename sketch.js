"use strict";

// ----- vars ----- //
let canvas;
let rows, columns, terrain;
let scale = 20;
let heightOffset = 100;
let yStart = 0;
let noiseOffset = 0.1;


// ----- setup ----- //
function setup() {

   // create and style canvas 
   canvas = createCanvas(windowWidth, windowHeight, WEBGL);
   canvas.style('display: block;');

   // get number of rows and columns 
   columns = Math.floor(width * 2 / scale);
   rows = Math.floor(height * 2 / scale);

   terrain = generateTerrain(rows, columns, heightOffset, noiseOffset, yStart);
}

// ----- resize ----- // 
function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

// ----- draw ----- // 
function draw() {
   background(0);
   yStart -= noiseOffset * 3;
   terrain = generateTerrain(rows, columns, heightOffset, noiseOffset, yStart);
   drawMesh(terrain);
}

// ----- generate terrain ----- // 
function generateTerrain(rows, columns, heightOffset, noiseOffset, yStart) {

   // create 2d array
   let terrain = new Array(rows);
   for (let i = 0; i < terrain.length; i++) {
      terrain[i] = new Array(columns);
   }

   // generate perlin noise
   let yOffset = yStart;
   for (let y = 0; y < rows; y++) {

      let xOffset = 0;
      for (let x = 0; x < columns; x++) {
         terrain[y][x] = map(noise(xOffset, yOffset), 0, 1, -heightOffset, heightOffset);
         xOffset += noiseOffset;
      }
      yOffset += noiseOffset;
   }

   return terrain;
}

// ----- create grid ----- // 
function drawMesh(terrain) {

   // setup
   stroke(255);
   noFill();
   rotateX(PI / 3);
   translate(-width, -height * 1.2, 0);

   // draw triangle strips
   for (let y = 0; y < rows - 1; y++) {

      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < columns; x++) {
         vertex(x * scale, y * scale, terrain[y][x]);
         vertex(x * scale, (y + 1) * scale, terrain[y + 1][x]);
      }
      endShape();
   }
}