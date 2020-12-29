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
  numPts = 160;
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
  neurons();

  //when mouse is pressed fire neurons
  if (mouseIsPressed) {
    soulCircle(25,20);
    neuronsFire();
  }
  //when scale reaches 0 go to previous page
  if (sf<0.2) {
    sf = 1.5;
  }
  //when scale reaches full screen go to next page
  if (sf>320) {
    window.location.replace("https://joshuamv.github.io/soul/page2");
  }
}


///functions///

function soulCircle(szBig,szSmall){
  background(0, 0, 20);
  noStroke();
  //moving shadows
  fill(150, 220, 255, 30);
  ellipse((mouseX+(sin(frameCount*0.05)+1)*1.01), (mouseY-(sin(frameCount*0.06)+1)*1.08), (sin(frameCount*0.02)+19)*2.1);
  ellipse((mouseX-(sin(frameCount*0.06)+1)*1.01), (mouseY+(sin(frameCount*0.08)+1)*1.03), (sin(frameCount*0.02)+19)*2.1);
  ellipse((mouseX-(sin(frameCount*0.08)+1)*1.02), (mouseY+(sin(frameCount*0.05)+1)*1.01), (sin(frameCount*0.02)+19)*2.1);
  //big ellipse
  fill(255, 255, 255, 230);
  ellipse(mouseX, mouseY, (sin(frameCount*0.02)+szBig));
  //little ellipse pointer
  fill(255);
  ellipse(mouseX, mouseY, (sin(frameCount*0.04)+szSmall));
  //text for title and subtitle
  textSize(48);
  textFont("Coiny");
  fill(255, 255, 255);
  textHeight = windowHeight - (windowHeight/20)
  text('The Human Soul', windowWidth/8, textHeight);
  textSize(24);
  text('A deep dive into the secrets of the human soul.', windowWidth/8, textHeight + (windowHeight/18));
}

function neurons(){
  fill(255, 255, 255);
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
	obj.c = [255, 255, 255];
}

function updateObj(obj){

	// random walk for each particle
	// obj.x += random(-screenScl,screenScl);
	// obj.y += random(-screenScl,screenScl);

	// move the particle on each axis by mapping the noise function, with its current position.
	// try different variations to get different landscapes
	// try applying a similar formula to particle size (obj.w) and color array (obj.c)
	obj.x += map(noise(234 + obj.y*2 , -947+ obj.x*2 ), 0, 1, -2, 2);
  obj.y += map(noise(-123  + obj.x*2, 655 + obj.y*2 ), 0, 1, -2, 2);

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


///event listeners///

window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 1.05;
  else
    sf *= 0.91;
});
