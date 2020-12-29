//globl vars//

var sf = 1; // scaleFactor
var mx, my; // mouse coordinates
var mouseMoving = false; //check if mouse is in movement

// create array to hold all particles
var pts = [];
var numPts;

function setup() {
  noCursor();
  createCanvas(windowWidth,windowHeight);
	background(200, 10, 0);

	// create particles
	numPts = 10000;
	for(var i = 0 ; i < numPts ;i++){
		pts.push( {} ); // insert new object
		pts[i].idx = i; // give it an index
		initObj( pts[i] ); // init object
	}
}

function draw() {
  mx = mouseX;
  my = mouseY;

  // scale and keep shapes centered
  translate(mx, my);
  scale(sf);
  translate(-mx, -my);

  //draw cricle and neurons
  soulCircle(12,8);
  neuronsFire();

  //when scale reaches 0 don't go to previous page
  if (sf<1) {
    sf = 2;
  }
  //when scale reaches full screen go to next page
  if (sf>250) {
    //clear timeout so the next page opens instantly
    window.location.replace("https://joshuamv.github.io/soul/page6");
  }
}


///functions///

function soulCircle(szBig,szSmall){
  background(255, 255, 255, 0);
  noStroke();
  //moving shadows
  fill(150, 220, 255, 0);
  ellipse(mouseX, mouseY, 20);
  //little ellipse pointer
  fill((200+(sf*2)), (0+(sf*2))-5, (0+(sf*2))-20, (0+(sf*2)));
  ellipse(mouseX, mouseY, 10);
}

function seePointer(){
  //slightly change pointer color in overlay
  noStroke();
  fill(255, 255, 1, 30);
  ellipse(mouseX, mouseY, 11);
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
	obj.w = random(1.001, 1.01);
	obj.c = [random(100,250), random(20,50), random(3,5)];

}

function updateObj(obj){

  var noiseScl = 0.0016;
  var screenScl = 10;

  if (mouseMoving) {
    screenScl = 70;
    obj.c = [random(240,255), 0, 0];
  }

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


////////event listeners///////

//check when mouse moves for the first time
document.onmousemove = function(){
  mouseMoving = true;
  setTimeout(function(){mouseMoving = false}, 100);
}

//save as png when s is pressed
document.addEventListener('keydown', function (event) {
  if (event.key === 's') {
    saveCanvas('inside-the-soul', 'jpg');
    console.log("saving your screenshot, have fun!")
  }
});

window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 1.13;
  else
    sf *= 0.5;
});
