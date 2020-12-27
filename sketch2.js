//globl vars//

var sf = 1; // scaleFactor
var mx, my; // mouse coordinates
var soul = true; //turns on and off from scale levels

// create array to hold all particles
var pts = [];
var numPts;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  //create particles
  numPts = 1000;
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
  if (sf<0.9) {
    sf = 2;
  }
  //when scale reaches full screen go to next page
  if (sf>300) {
    window.location.replace("file:///Users/Joshua/Documents/Shenkar/Year%202/Semester%20A/Code/soul/page3.html");
  }
  if (sf<329) {
    soul = true;
  }

}

window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 1.02;
  else
    sf *= 0.965;
});


///functions///

function soulCircle(szBig,szSmall){
  if(soul){
    background(255, 255, 255, 50);
    noStroke();
    //moving shadows
    if (sf<10) {
      //if far show purple shadow
      fill(150, 0, 255, 20);
    }
    if (sf>11) {
      //if close delete purple shadow
      noFill();
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
      fill(0);
    }
    ellipse(mouseX, mouseY, 5);
  }
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
	obj.c = [0, 0, 0];
}

function updateObj(obj){

  // get values from sliders
	var noiseScl = 2+sf*2;
	var screenScl = 2+sf*2;

	// random walk for each particle
	// obj.x += random(-screenScl,screenScl);
	// obj.y += random(-screenScl,screenScl);

	// move the particle on each axis by mapping the noise function, with its current position.
	// try different variations to get different landscapes
	// try applying a similar formula to particle size (obj.w) and color array (obj.c)
	obj.x += map(noise(234 + obj.y*noiseScl , -947+ obj.x*noiseScl ), 0, 1, -screenScl, screenScl);
  obj.y += map(noise(-123  + obj.x*noiseScl, 655 + obj.y*noiseScl ), 0, 1, -screenScl, screenScl);
}


function drawObj(obj){
	stroke(obj.c[0], obj.c[1],obj.c[2]);
	strokeWeight(obj.w);
	point(obj.x, obj.y);
}
