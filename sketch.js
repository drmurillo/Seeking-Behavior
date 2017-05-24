var rocket;

var target;

function setup() {
  createCanvas(800, 800);
  rocket = new Rocket();
  target = new Target();

}

function draw() {
  background(51);
  rocket.display();
  rocket.move();
  target.display();
  rocket.seek(target.pos);
}

function mousePressed() {
  target = new Target();

}

function Rocket() {
  /// Rocket Position ////
  this.pos = createVector(width / 2, height / 2);
  this.rSize = 10;
  this.front = createVector(0, -this.rSize);
  this.bLeft = createVector(-this.rSize, this.rSize);
  this.bRight = createVector(this.rSize, this.rSize);
  this.heading = createVector();
  //// Rocket Speed ////
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector(0, 0);
  //// Rocket Steering Behavior ////
  this.maxSpeed = 5;
  this.maxForce = .02;
  this.force = createVector(0, 0);
  this.velocity.setMag(this.maxSpeed);

  this.display = function() {
    this.heading = this.velocity.heading();
    push();
    translate(this.pos.x, this.pos.y);
    var c = color(244, 170, 66, 80);
    fill(c);
    rotate(this.heading + PI / 2);
    triangle(this.front.x, this.front.y, this.bLeft.x, this.bLeft.y, this.bRight.x, this.bRight.y);
    pop();
  };

  this.move = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.pos.add(this.velocity);
    //this.acceleration.mult(0);
  };

  this.seek = function(target) {
    //steering = desired - velocity
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.setMag(this.maxForce);

    this.applyForce(steer);
  };

  this.applyForce = function(force) {
    this.acceleration.add(force);
  };

}

function Target() {
  this.pos = createVector(mouseX, mouseY);

  this.tSize = 20;

  this.display = function() {
    push();
    var c = color(244, 66, 92, 95);
    fill(c);
    ellipse(this.pos.x, this.pos.y, this.tSize, this.tSize);
    pop();
  };

}
