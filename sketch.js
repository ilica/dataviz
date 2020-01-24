var particles = [];

function setup() {
  createCanvas(600, 600);
  ellipseMode(RADIUS);
  noFill();
}

function draw() {
  background(0);

 // textSize(32);
 // fill(180);
 // text(hour(), 10, 30);
 // fill(100);
 // text(minute(), 10, 60);
 // fill(0);
 // text(second(), 10, 90);

  fill(255);
  strokeWeight(0);
  ellipse(width/2, height*3/4, 72, 72);
  rect(width/2-25, height/4-110, 50, 400, 20);

  fill(255, 0 ,0);
  rect(width/2-15, height/4+50, 30, 200);
  ellipse(width/2, height*3/4, 60, 60);

  noFill();

  if (particles.length < 1) particles.push(new Particle());
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {

  constructor() {
    this.reset();
  }
  reset() {
    this.x = width/2;
    this.y = -400;
    this.vy = 10;
    this.maxy = this.y + height;
    this.r = 0;
    this.tr = 50;
    this.w = 2;
  }
  update() {
    if (this.y < this.maxy) {
      this.y += this.vy;
    } else {
      this.r++;
    }
    if (this.r > this.tr) this.reset();
  }
  display() {
    strokeWeight(this.w);
    if (this.y < this.maxy) {
     stroke(255,0,0);
     push();
     translate(this.x,this.y);
     beginShape();
     strokeWeight(10);
     vertex(0,-5);
     quadraticVertex(3, 0, 0, 1);
     quadraticVertex(-3,0, 0, -5);
     endShape(CLOSE);
     pop();
    } else {
      stroke(255, map(this.r, 0, this.tr, 255, 0));
      ellipse(this.x, this.y, this.r, this.r*.5);
    }
  }
}
