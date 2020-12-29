//globl vars//

var sf = 1; // scaleFactor
var mx, my; // mouse coordinates

// create array to hold all particles
var pts = [];
var numPts;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  //create particles
  numPts = 2000;
  for(var i = 0 ; i < numPts ;i++){
    pts.push( {} ); // insert new object
    pts[i].idx = i; // give it an index
    initObj( pts[i] ); // init object
  }
}

function draw() {
  mx = mouseX;
  my = mouseY;

  //scale and keep shapes centered
  translate(mx, my);
  scale(sf);
  translate(-mx, -my);

  //draw cricle and neurons
  soulCircle(12,8);
  neuronsFire();

  //when mouse is pressed fire neurons
  if (mouseIsPressed) {
    soulCircle(25,20);
  }
  //when scale reaches 0 go to previous page
  if (sf<1) {
    sf = 2;
  }
  //when scale reaches full screen go to next page
  if (sf>300) {
    window.location.replace("file:///Users/Joshua/Documents/Shenkar/Year%202/Semester%20A/Code/soul/page4.html");
  }
}

///functions///

function soulCircle(szBig,szSmall){
  background(0, 0, 0, 10);
  noStroke();
  //moving shadows
  if (sf<10) {
    //if far show blue shadow
    fill(50, 0, 255, 20);
  }
  if (sf>11) {
    //if close delete blue shadow
    fill(50, 0, 255, 9);
  }
  ellipse(mouseX, mouseY, 20);
  //little ellipse pointer
  fill(255);
  if (sf<10) {
    //if far show purple shadow
    fill(255);
  }
  if (sf>11) {
    //if close delete purple shadow
    fill(5);
  }
  ellipse(mouseX, mouseY, 5);
}

function neurons(){
  fill(255, 255, 0);
  ellipse(mouseX, mouseY, 6);
}

function neuronsFire(){
  // update particle
  for(var i = 0 ; i < pts.length ;i++){
    updateObj( pts[i] );
  }
  // draw particle
  for(var i = 0 ; i < pts.length ;i++){
    drawObj(pts[i]);
  }
}

// set initial random parameters to a particle
function initObj( obj ){
	obj.x = random(width);
	obj.y = random(height);
	obj.w = random(1.01,1.9);
	obj.c = [200, 200, 200];
}

function updateObj(obj){

  // get values from sliders
	var noiseScl = 200+(sf*2);
	var screenScl = 5;

	// move the particle on each axis by mapping the noise function, with its current position.
	// try different variations to get different landscapes
	// try applying a similar formula to particle size (obj.w) and color array (obj.c)
	obj.x += map(noise(234 + obj.y*noiseScl , -947+ obj.x*noiseScl ), 0, 1, -screenScl, screenScl);
  obj.y += map(noise(-123  + obj.x*noiseScl, 655 + obj.y*noiseScl ), 0, 1, -screenScl, screenScl);


  // maintain screen edges (wrap around)
  if(obj.x > width) obj.x = 0;
  if(obj.x < 0) obj.x = width;
  if(obj.y > height) obj.y = 0;
  if(obj.y < 0) obj.y = height;
}


function drawObj(obj){
	stroke(obj.c[0], obj.c[1],obj.c[2]);
	strokeWeight(obj.w);
	point(obj.x, obj.y);
}

//event listeners//
window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 1.02;
  else
    sf *= 0.98;
});
