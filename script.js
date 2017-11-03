var xScreenSize = 1200;
var yScreenSize = 600;
var xWorldSize = 1200;
var cameraX = 0;
var bal;
var ballen = [];

function setup() {
  createCanvas(xScreenSize, yScreenSize);
  player1 = new Player(0, 0, 20)
}

function positive(numb) {
  if (numb < 0) {
    return(numb * -1)
  }
  return(numb)
}

function MoveCamera() {
  if (cameraX < 0){
    cameraX = 0;
  } else if (cameraX + xScreenSize > xWorldSize){
    cameraX = xWorldSize - xScreenSize;
  }
}

function nieuw() {
  bal = new Bal(Math.floor((Math.random() * xWorldSize - 20) + 20),100,20,Math.floor((Math.random() * 21) - 10),1,false);
  ballen.push(bal);
}

function Player(X, Y, R) {
  this.xPos = X;
  this.yPos = Y;
  this.radius = R;
  this.xSpeed = 0;
  this.ySpeed = 0;

  this.Controls = function() {
    this.xSpeed += ((this.xPos - cameraX) - mouseX) * -1 / 1000;
    this.ySpeed += (this.yPos - mouseY) * -1 / 1000;
    cameraX += ((this.xPos - (xScreenSize / 2)) - cameraX) / 5;
  }

  this.updateSnelheid = function() {
    for (var b = 0; b < ballen.length; b++) {
      if (ballen[b] != this){
        var dx = ballen[b].xPos - this.xPos;
        var dy = ballen[b].yPos - this.yPos;
        if (Math.sqrt(dx*dx + dy*dy) <= this.radius + ballen[b].radius){
          this.speedSpeed = (positive(dx) + positive(dy)) / 20;
          if (this.speedSpeed < -1 && this.speedSpeed > 1) {
            this.xSpeed = Math.floor((Math.random() * 20) + 10);
            this.ySpeed = Math.floor((Math.random() * 20) + 10);
          } else {
            this.xSpeed += ((dx * -1) / this.radius * this.speedSpeed);
            this.ySpeed += ((dy * -1) / this.radius * this.speedSpeed);
          }
        }
      }
    }
    if (this.xPos > xWorldSize - this.radius){
      this.xSpeed = positive(this.xSpeed * -1) * -1;
      this.xPos -= 1;
    }
    if (this.xPos < this.radius){
      this.xSpeed = positive(this.xSpeed * -1);
      this.xPos += 1;
    }
    if (this.yPos > yScreenSize - this.radius){
      this.ySpeed = positive(this.ySpeed * -1) * -1;
      this.yPos -= 1;
//    } else {
//      this.ySpeed += 0.2;
    }
    if (this.yPos < this.radius){
      this.ySpeed = positive(this.ySpeed * -1);
      this.yPos += 1;
    }
    this.xSpeed = this.xSpeed * 0.999;
    this.ySpeed = this.ySpeed * 0.999;
  }

  this.beweeg = function() {
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
  }

  this.teken = function() {
    fill(255);
    noStroke();
    ellipse(this.xPos - cameraX, this.yPos, 2*this.radius, 2*this.radius);
  }
}

player1 = new Player(0, 0, 20)

function Bal(X, Y, R, XS, YS, FP) {
  this.xPos = X;
  this.yPos = Y;
  this.radius = R;
  this.xSpeed = XS;
  this.ySpeed = YS;
  this.isFixed = FP

  this.teken = function() {
    fill(0);
    ellipse(this.xPos - cameraX, this.yPos, 2*this.radius, 2*this.radius);
  }

  this.updateSnelheid = function() {
    for (var b = 0; b < ballen.length; b++) {
      if (ballen[b] != this){
        var dx = ballen[b].xPos - this.xPos;
        var dy = ballen[b].yPos - this.yPos;
        if (Math.sqrt(dx*dx + dy*dy) <= this.radius + ballen[b].radius){
          this.speedSpeed = (positive(dx) + positive(dy)) / 20;
          if (this.speedSpeed < -1 && this.speedSpeed > 1) {
            this.xspeed = Math.floor((Math.random() * 20) + 10);
            this.ySpeed = Math.floor((Math.random() * 20) + 10);
          } else {
            this.xSpeed += ((dx * -1) / this.radius * this.speedSpeed);
            this.ySpeed += ((dy * -1) / this.radius * this.speedSpeed);
          }
        }
      }
    }
    var dx = player1.xPos - this.xPos;
    var dy = player1.yPos - this.yPos;
    if (Math.sqrt(dx*dx + dy*dy) <= this.radius + player1.radius){
      this.speedSpeed = (positive(dx) + positive(dy)) / 20;
      if (this.speedSpeed < -1 && this.speedSpeed > 1) {
        this.xspeed = Math.floor((Math.random() * 20) + 10);
        this.ySpeed = Math.floor((Math.random() * 20) + 10);
      } else {
        this.xSpeed += ((dx * -1) / this.radius * this.speedSpeed);
        this.ySpeed += ((dy * -1) / this.radius * this.speedSpeed);
      }
    }
    if (this.xPos > xWorldSize - this.radius){
      this.xSpeed = positive(this.xSpeed * -1) * -1;
      this.xPos -= 1;
    }
    if (this.xPos < this.radius){
      this.xSpeed = positive(this.xSpeed * -1);
      this.xPos += 1;
    }
    if (this.yPos > yScreenaSize - this.radius){
      this.ySpeed = positive(this.ySpeed * -1) * -1;
      this.yPos -= 1;
//    } else {
//      this.ySpeed += 0.2;
    }
    if (this.yPos < this.radius){
      this.ySpeed = positive(this.ySpeed * -1);
      this.yPos += 1;
    }
    this.xSpeed = this.xSpeed * 0.999;
    this.ySpeed = this.ySpeed * 0.999;
  }

  this.beweeg = function(){
    if (this.isFixed != true) {
      this.xPos += this.xSpeed;
      this.yPos += this.ySpeed;
    }
  }
}

function draw(){
  background(200);
  player1.Controls();
  MoveCamera();
  for (var a = 0; a < ballen.length; a++) {
    ballen[a].updateSnelheid();
  }
  player1.updateSnelheid();
  for (var a = 0; a < ballen.length; a++) {
    ballen[a].beweeg();
    ballen[a].teken();
  }
  player1.beweeg();
  player1.teken();
}
