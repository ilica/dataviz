var particles = [];
var previous_drop_second;
var previous_minute;

function setup() {
  createCanvas(600, 600);
  ellipseMode(RADIUS);
  noFill();
}

function draw() {
  background(0);

  fill(255);
  strokeWeight(0);
  //white outline
  ellipse(width/2, height*3/4+25, 72, 72);
  rect(width/2-25, height/4-110, 50, 400, 20);

  first_notch = 58
  last_notch = 434

  //hour notches
  for (x = 0; x<14; x++) {
    y_coord = x*((-first_notch+last_notch)/13)+first_notch

    rect(width/2+24, y_coord, 20, 2);
  }

  //minute notches
  for (x = 0; x<(13*4); x++) {
    rect(width/2+24, x*((-first_notch+last_notch)/(13*4))+first_notch, 10, 2);
  }

  //half-hour notches
  for (x = 0; x<(13*2); x++) {
    rect(width/2+24, x*((-first_notch+last_notch)/(13*2))+first_notch, 14, 2);
  }

  //red fill
  fill(255, 0 ,0);
  current_hour = hour();
  if (hour()>12){
    current_hour=hour()-12;
  }

  ellipse(width/2, height*3/4+25, 60, 60);
  scaled_time = ((current_hour/12)+(minute()/(12*60))+(second()/(12*60*60)))*(407-58);

  rect(width/2-15, 407-scaled_time, 30, scaled_time);
  rect(width/2-15, 407, 30, 20);

  noFill();
  current_second = Math.floor(new Date().getTime()/1000)
  if (previous_drop_second == undefined){
    previous_drop_second=current_second;
  }

  if (current_second>previous_drop_second) {
    particles.push(new Particle());
    previous_drop_second=current_second
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }


  //print minute to console
  current_minute = Math.floor(current_second/60)
  if (previous_minute == undefined){
    print("Current Minute:")
    print(minute())
    previous_minute=current_minute;
  }
  if (current_minute>previous_minute){
    print(minute())
    previous_minute=current_minute
  }
}

class Particle {

  constructor() {
    this.reset();
  }
  reset() {
    this.x = width/2;
    this.y = 0;
    this.vy = 10;
    this.maxy = 403-scaled_time;
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
    if (this.r > this.tr) {
      this.reset();
      // i know this is a bad idea and objects shouldnt modify lists of themselves...but this was fast right now :P
      particles.shift()
    }
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
