/**
 *  BSD 3-Clause License
 *
 * Copyright (c) 2018, Sidharth Mishra
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 * * Neither the name of the copyright holder nor the names of its
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * flocker.js
 * @author Sidharth Mishra
 * @description Flocker core stuff goes here.
 * @created Wed Mar 21 2018 22:28:07 GMT-0700 (PDT)
 * @last-modified Wed Mar 21 2018 22:35:12 GMT-0700 (PDT)
 */

//#region GLOBAL_CONSTANTS

/** @type {number} */
/*
@Sid_Mishraw Implementation

const MAX_WRAP_AROUND_WIDTH = 816; //640;

/!** @type {number} *!/
const MAX_WRAP_AROUND_HEIGHT = 480; //360;

/!** @type {number} *!/
const MAX_VELOCITY = 2.0;

/!** @type {number} *!/
const MAX_ACCELERATION = 0.03;

/!** @type {Flocker} *!/
const flocker = new Flocker();

/!** @type {number} *!/
const DESIRED_SEPARATION = 50.0;

/!** @type {number} *!/
const DESIRED_ALIGNMENT = 50.0;

/!** @type {number} *!/
const DESIRED_COHESION = 50.0;

/!** @type {number} *!/
const SEPRATION_WEIGHT = 3.5;

/!** @type {number} *!/
const ALIGNMENT_WEIGHT = 2.0;

/!** @type {number} *!/
const COHESION_WEIGHT = 2.0;

*/
//#endregion GLOBAL_CONSTANTS

/**
 * @GauravGupta Implementation
 * @type {number}
 * changed the type from const to variable
 */

var MAX_WRAP_AROUND_WIDTH = 816; //640;

// /!** @type {number} *!/
var MAX_WRAP_AROUND_HEIGHT = 480; //360;

// /!** @type {number} *!/
var MAX_VELOCITY = 2.0;

// /!** @type {number} *!/
var MAX_ACCELERATION = 0.03;

// /!** @type {Flocker} *!/
const flocker = new Flocker();

// /!** @type {number} *!/
var DESIRED_SEPARATION = 50.0;

// /!** @type {number} *!/
var DESIRED_ALIGNMENT = 50.0;

// /!** @type {number} *!/
var DESIRED_COHESION = 50.0;

// /!** @type {number} *!/
var SEPRATION_WEIGHT = 3.5;

// /!** @type {number} *!/
var ALIGNMENT_WEIGHT = 2.0;

// /!** @type {number} *!/
var COHESION_WEIGHT = 2.0;


//#region P5JS_STUFF

/**
 * Sets up the simulation.
 *
 * @SidMishraw Implementation

 function setup() {
  var canvas = createCanvas(MAX_WRAP_AROUND_WIDTH, MAX_WRAP_AROUND_HEIGHT);
  canvas.parent("content")
  angleMode(DEGREES); // sets the angle mode to degrees
  rectMode(CENTER); // sets x,y co-ordinates for the retangle to be its CENTER
  imageMode(CENTER); // sets x,y co-ordinates for the image to be its CENTER

  // start out with 100 Swallows for the simulation
  for (let x = 0; x < 30; x++) {
    flocker.addSwallow(random(MAX_WRAP_AROUND_WIDTH), random(MAX_WRAP_AROUND_HEIGHT));
  }
}
 *
 */
/**
 *
 *  @Gaurav Gupta implementation
 *
 *  Added div parent tag to the canvas
 *
 */
function setup() {
  let canvas = createCanvas(MAX_WRAP_AROUND_WIDTH, MAX_WRAP_AROUND_HEIGHT);
  canvas.parent("content");
  angleMode(DEGREES); // sets the angle mode to degrees
  rectMode(CENTER); // sets x,y co-ordinates for the retangle to be its CENTER
  imageMode(CENTER); // sets x,y co-ordinates for the image to be its CENTER

    // start out with 100 Swallows for the simulation
    for (let x = 0; x < 30; x++) {
        flocker.addSwallow(random(MAX_WRAP_AROUND_WIDTH), random(MAX_WRAP_AROUND_HEIGHT));
    }
}
/**
 * Draw loop.
 */
function draw() {
  clear();
  flocker.drawGrid();
  flocker.simulate();
}

/**
 * Event listener for when the mouse button is released.
 * I add a Swallow to the flock.
 */
function mouseReleased() {
  flocker.addSwallow(mouseX, mouseY);
}
//#endregion P5JS_STUFF

//#region Flocker
/**
 * The Flocker app instance.
 */
function Flocker() {
  /**
   * The global list of all the swallows.
   * @type {Swallow[]}
   */
  this.swallows = [];
}

/**
 * Adds a Swallow to the flocker simulation.
 * @param {number} x The initial X coordinate of the Swallow.
 * @param {number} y The initial Y coordinate of the Swallow.
 */
Flocker.prototype.addSwallow = function(x, y) {
  this.swallows.push(new Swallow(x, y));
};

/**
 * Runs the Flocker simulation.
 */
Flocker.prototype.simulate = function() {
  this.swallows.forEach(swallow => swallow.fly());
};

/**
 * Draws a grid -- good for debugging the screen
 */
Flocker.prototype.drawGrid = function drawGrid() {
  stroke("#000000");
  fill(120);

  for (var x = -width; x < width; x += 40) {
    line(x, -height, x, height);
    text(x, x + 1, 12);
  }

  for (var y = -height; y < height; y += 40) {
    line(-width, y, width, y);
    text(y, 1, y + 12);
  }
};
//#endregion Flocker

//#region Swallow
/**
 * Swallow is a bird that will be flocking with its friends.
 *
 * @param {number} x The initial X spawn location of the Swallow.
 * @param {number} y The initial Y spawn location of the Swallow.
 */
function Swallow(x, y) {
  this.image = loadImage("./resources/swallow-img.png"); // the Swallow itself.

  const theta = random(360.0); // generate a random angle for the direction of the Swallow

  /* global Matrix4x4 */
  /** @type {Matrix4x4}
   * This 4x4 matrix is responsible for Swallow's position, angle, and size.
   * Intialized to an identity matrix.
   */
  this.transformMatrix = new Matrix4x4(
    MAX_WRAP_AROUND_WIDTH,
    MAX_WRAP_AROUND_HEIGHT,
    33.56
  );

  this.velocity = createVector(Math.cos(theta), Math.sin(theta)); // the velocity of the Swallow.
  this.acceleration = createVector(0.0, 0.0); // the acceleration of the Swallow.

  this.transformMatrix.scale2D(0.0322, 0.0322); // scale the image to 0.031 since it is very, very big!
  this.transformMatrix.rRotate2D(Math.abs(this.velocity.heading())); // rotate
  this.transformMatrix.translate2D(x, y); // translate to the starting point

  this.maxAcceleration = MAX_ACCELERATION; // the maximum acceleration as per Daniel Shiffman's implementation
  this.maxVelocity = MAX_VELOCITY; // the maximum speed as per Daniel Shiffman's implementation
}

/**
 * @internal
 *
 * Seeks and applies the steering force towards the desired target location.
 * Note: as per Daniel Shiffman's implementation.
 * @param {p5.Vector} target The target position.
 * @returns {p5.Vector} STEER = DESIRED MINUS VELOCITY, the steer force vector.
 */
Swallow.prototype.seek = function(target) {
  const currentPosition = this.transformMatrix.getPosition();

  /** @type {p5.Vector}
   * A vector pointing from the position to the target.
   */
  const desired = target.sub(createVector(currentPosition.x, currentPosition.y));

  desired.normalize(); // make it into a unit vector
  desired.mult(this.maxVelocity); // Scale to maximum velocity

  /** @type {p5.Vector}
   * Steering = Desired minus Velocity
   */
  const steer = desired.sub(this.velocity);
  steer.limit(this.maxAcceleration); // Limit to maximum steering force = maximum acceleration

  return steer;
};

/**
 * @internal
 *
 * Computes the separation depending on the desired separation -- defaults to 25.0
 * Steers the Swallows away from each other depending on the desired separation.
 *
 * @returns {p5.Vector} The steering force that will separate this Swallow from its
 * neighbors.
 */
Swallow.prototype.separation = function() {
  const desiredSeparation = DESIRED_SEPARATION;
  const steer = createVector(0, 0);
  let count = 0;

  flocker.swallows.forEach(swallow => {
    const currentPosition = createVector(
      this.transformMatrix.getPosition().x,
      this.transformMatrix.getPosition().y
    );
    const targetPosition = createVector(
      swallow.transformMatrix.getPosition().x,
      swallow.transformMatrix.getPosition().y
    );

    const distance = currentPosition.dist(targetPosition);

    // If the distance is greater than 0 and less than an arbitrary amount
    // 0 when the swallow is itself
    if (distance > 0 && distance < desiredSeparation) {
      // Calculate vector pointing away from neighbor
      const diff = currentPosition.sub(targetPosition);
      diff.normalize();
      diff.div(distance); // Weight by distance
      steer.add(diff);
      count++;
    }
  });

  // averaging the steering force
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxVelocity);
    steer.sub(this.velocity);
    steer.limit(this.maxAcceleration);
  }

  return steer;
};

/**
 * @internal
 *
 * For every neighboring Swallow, computes the average velocity. Responsible for this
 * Swallow's alignment with respect to the group(?)
 * @returns {p5.Vector} The alignment steering vector.
 */
Swallow.prototype.alignment = function() {
  const neighborDistance = DESIRED_ALIGNMENT;
  const sum = createVector(0, 0);
  let count = 0;

  flocker.swallows.forEach(swallow => {
    const currentPosition = createVector(
      this.transformMatrix.getPosition().x,
      this.transformMatrix.getPosition().y
    );
    const targetPosition = createVector(
      swallow.transformMatrix.getPosition().x,
      swallow.transformMatrix.getPosition().y
    );

    const distance = currentPosition.dist(targetPosition);

    if (distance > 0 && distance < neighborDistance) {
      sum.add(swallow.velocity);
      count++;
    }
  });

  let steer = createVector(0, 0); // the alignment's steering force

  if (count > 0) {
    sum.div(count);

    // Implement Reynolds: Steering = Desired - Velocity
    sum.normalize();
    sum.mult(this.maxVelocity);

    steer = sum.sub(this.velocity);
    steer.limit(this.maxAcceleration);
  }

  return steer;
};

/**
 * @internal
 *
 * Computes the steering force towards the center of all the nearby Swallow's positions.
 * @returns {p5.Vector} The steering force vector.
 */
Swallow.prototype.cohesion = function() {
  const neighborDistance = DESIRED_COHESION;
  const sum = createVector(0, 0); // Start with empty vector to accumulate all positions
  let count = 0;

  flocker.swallows.forEach(swallow => {
    const currentPosition = createVector(
      this.transformMatrix.getPosition().x,
      this.transformMatrix.getPosition().y
    );
    const targetPosition = createVector(
      swallow.transformMatrix.getPosition().x,
      swallow.transformMatrix.getPosition().y
    );

    const distance = currentPosition.dist(targetPosition);

    if (distance > 0 && distance < neighborDistance) {
      sum.add(targetPosition); // Add position
      count++;
    }
  });

  let steer = createVector(0, 0);

  if (count > 0) {
    sum.div(count);
    steer = this.seek(sum); // Steer towards the position
  }

  return steer;
};

/**
 * @internal
 *
 * Changes the direction of the Swallow to match it's velocity's direction.
 */
Swallow.prototype.changeDirection = function() {
  this.transformMatrix.rotate2D(Math.abs(0.1));
};

/**
 * The swallow flies.
 */
Swallow.prototype.fly = function() {
  const s = this.separation(); // Separation
  const a = this.alignment(); // Alignment
  const c = this.cohesion(); // Cohesion

  // Arbitrarily weight these forces
  s.mult(SEPRATION_WEIGHT);
  a.mult(ALIGNMENT_WEIGHT);
  c.mult(COHESION_WEIGHT);

  // Add the force vectors to acceleration
  this.applyForce(s);
  this.applyForce(a);
  this.applyForce(c);

  this.velocity.add(this.acceleration); // v = u + at (let the velocity get updated every tick).
  this.velocity.limit(this.maxVelocity); // max speed upper bounded.

  // translates with wrap-around
  this.transformMatrix.translate2D(this.velocity.x, this.velocity.y);
  // reverted rotation, will revert previous rotation prior to this
  // this.transformMatrix.rRotate2D(Math.abs(this.velocity.heading()) + 90);

  this.acceleration.mult(0); // reset the acceleration for each cycle.

  this.render(); // render the Swallow
};

/**
 * Applies a force to the Swallow.
 * @param {p5.Vector} force The force that will let each Swallow accelerate.
 * F = ma => a = F / m
 * Assuming each Swallow has same unit mass, then (a = F).
 */
Swallow.prototype.applyForce = function(force) {
  this.acceleration.add(force);
};

/**
 * Renders the Swallow.
 */
Swallow.prototype.render = function() {
  push(); // push the current matrix onto the stack

  applyMatrix(...this.transformMatrix.getParamsForApplying());
  rotate(this.velocity.heading() + 90.0);

  image(this.image, 0, 0);

  pop(); // pop the current matrix from the stack, replacing it to the backed up matrix
/*
  console.log(
    `current rotation = ${this.transformMatrix.getRotation()}, velocity dir = ${this.velocity.heading()}`
  );*/
};
//#endregion Swallow
