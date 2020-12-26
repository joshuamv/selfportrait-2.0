//globl vars//

var sf = 1; // scaleFactor
var mx, my; // mouse coordinates;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  mx = mouseX;
  my = mouseY;

  background(0);
  //scale and keep shapes centered
  translate(mx, my);
  scale(sf);
  translate(-mx, -my);


  //draw cricle and neurons
  soulCircle(12,8);
  neurons();


  if (mouseIsPressed) {
    soulCircle(25,20);
    neuronsFire();
  }

  if (sf>330) {
    neuronsFire();
  }

}

window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 1.05;
  else
    sf *= 0.91;
});


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
}

function neurons(){
  fill(255, 255, 0);
  ellipse(mouseX, mouseY, 6);
}

function neuronsFire(){
  fill(0, 50, 255);
  ellipse(mouseX, mouseY, 16)
}
