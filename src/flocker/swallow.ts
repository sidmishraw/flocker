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
 * swallow.ts
 * @author Sidharth Mishra
 * @description Swallow specific logic goes in here. The logic is derived from Daniel Shiffman's Boid demo in Processing.
 * @created Thu Mar 22 2018 10:55:28 GMT-0700 (PDT)
 * @last-modified Sat Mar 31 2018 19:00:50 GMT-0700 (PDT)
 */

import { Matrix4x4 } from "./utils";
import { Flocker } from "./flocker";
import "p5";

//#region Swallow

/**
 * Swallow is a bird that will be flocking with its friends.
 * @export
 * @class Swallow
 */
export class Swallow {
  /**
   * The static id generator for the Swallow. Useful for keeping track of the Swallow.
   * @private
   * @static
   * @type {number}
   * @memberof Swallow
   */
  private static idGen: number = 0;

  /**
   * Swallow's ID.
   * @private
   * @type {number}
   * @memberof Swallow
   */
  private id: number;

  /**
   * The reference to the simulator.
   * @private
   * @type {Flocker}
   * @memberof Swallow
   */
  private flocker: Flocker;

  /**
   * The image of the Swallow.
   * @private
   * @type {p5.Image}
   * @memberof Swallow
   */
  private image: p5.Image;

  /**
   * This 4x4 matrix is responsible for Swallow's position, angle, and size.
   * Intialized to an identity matrix.
   * @private
   * @type {Matrix4x4}
   * @memberof Swallow
   */
  private m: Matrix4x4;

  /**
   * Position of the Swallow.
   * @private
   * @type {p5.Vector}
   * @memberof Swallow
   */
  private position: p5.Vector;

  /**
   * Velocity of the Swallow.
   * @private
   * @type {p5.Vector}
   * @memberof Swallow
   */
  private velocity: p5.Vector;

  /**
   * Acceleration of the Swallow.
   * @private
   * @type {p5.Vector}
   * @memberof Swallow
   */
  private acceleration: p5.Vector;

  /**
   * The maximum acceleration as per Daniel Shiffman's implementation
   * @private
   * @type {number}
   * @memberof Swallow
   */
  private maxAcceleration: number;

  /**
   * The maximum speed as per Daniel Shiffman's implementation
   * @private
   * @type {number}
   * @memberof Swallow
   */
  private maxVelocity: number;

  /**
   * Creates an instance of Swallow.
   * @param {number} x The initial X spawn location of the Swallow.
   * @param {number} y The initial Y spawn location of the Swallow.
   * @param {Flocker} flocker The flocker app instance.
   * @memberof Swallow
   */
  public constructor(x: number, y: number, flocker: Flocker) {
    Swallow.idGen++;
    this.id = Swallow.idGen;

    this.flocker = flocker;
    this.image = this.flocker.$p5.loadImage(this.flocker.$imagePath);

    const theta = this.flocker.$p5.random(360.0); // generate a random angle for the direction of the Swallow
    this.position = this.flocker.$p5.createVector(x, y); // the initial position of the Swallow.
    this.velocity = this.flocker.$p5.createVector(Math.cos(theta), Math.sin(theta)); // the velocity of the Swallow.
    this.acceleration = this.flocker.$p5.createVector(0.0, 0.0); // the acceleration of the Swallow.

    this.m = new Matrix4x4(this.flocker.$maxWrapAroundWidth, this.flocker.$maxWrapAroundHeight, 33.56);
    this.m.scale2D(0.18, 0.18); // scale the image to 0.031 since it is very, very big!
    this.m.translate2D(this.position.x, this.position.y); // translate to the starting point

    this.maxAcceleration = this.flocker.$maxAcceleration;
    this.maxVelocity = this.flocker.$maxVelocity;
  }

  /**
   * The swallow flies.
   */
  public fly() {
    const s: p5.Vector = this.separation(); // Separation
    const a: p5.Vector = this.alignment(); // Alignment
    const c: p5.Vector = this.cohesion(); // Cohesion

    // Arbitrarily weight these forces
    s.mult(this.flocker.$separationWeight);
    a.mult(this.flocker.$alignmentWeight);
    c.mult(this.flocker.$cohesionWeight);

    // Add the force vectors to acceleration
    this.applyForce(s);
    this.applyForce(a);
    this.applyForce(c);

    this.velocity.add(this.acceleration); // v = u + at (let the velocity get updated every tick). => (v = u + a)
    this.velocity.limit(this.maxVelocity); // max speed upper bounded.

    this.position.add(this.velocity); // update the position of the Swallow -- s = s0 + vt

    // translates with wrap-around
    this.m.translate2D(this.velocity.x, this.velocity.y);
    // reverted rotation, will revert previous rotation prior to this
    // this.transformMatrix.rRotate2D(Math.abs(this.velocity.heading()) + 90);

    this.acceleration.mult(0); // reset the acceleration for each cycle.

    // console.info(`Swallow#${this.id} -- pos: (${this.position.x}, ${this.position.y})`);

    this.render(); // render the Swallow
  }

  /**
   * Seeks and applies the steering force towards the desired target location.
   * Note: as per Daniel Shiffman's implementation.
   * @param {p5.Vector} target The target position.
   * @returns {p5.Vector} STEER = DESIRED MINUS VELOCITY, the steer force vector.
   */
  private seek(target: p5.Vector): p5.Vector {
    const currentPosition: { x: number; y: number } = this.m.getPosition();

    // A vector pointing from the position to the target.
    const desired: p5.Vector = target.sub(this.flocker.$p5.createVector(currentPosition.x, currentPosition.y));

    desired.normalize(); // make it into a unit vector
    desired.mult(this.maxVelocity); // Scale to maximum velocity

    // Steering = Desired minus Velocity
    const steer: p5.Vector = desired.sub(this.velocity);
    steer.limit(this.maxAcceleration); // Limit to maximum steering force = maximum acceleration

    return steer;
  }

  /**
   * Computes the separation force depending on the desired separation.
   * Steers the Swallows away from each other depending on the desired separation.
   * @returns {p5.Vector} The steering force that will separate this Swallow from its
   * neighbors.
   */
  private separation(): p5.Vector {
    const desiredSeparation: number = this.flocker.$desiredSeparation;
    const steer: p5.Vector = this.flocker.$p5.createVector(0, 0);
    let count: number = 0;

    this.flocker.$swallows.forEach(swallow => {
      const currentPosition = this.flocker.$p5.createVector(this.m.getPosition().x, this.m.getPosition().y);
      const targetPosition: p5.Vector = this.flocker.$p5.createVector(
        swallow.m.getPosition().x,
        swallow.m.getPosition().y
      );

      const distance: number = currentPosition.dist(targetPosition);

      // If the distance is greater than 0 and less than an arbitrary amount
      // 0 when the swallow is itself
      if (distance > 0 && distance < desiredSeparation) {
        // Calculate vector pointing away from neighbor
        const diff: p5.Vector = currentPosition.sub(targetPosition);
        diff.normalize();
        diff.div(distance); // Weight by distance
        steer.add(diff);
        count++;
      }
    });

    // averaging the steering force
    if (count > 0) steer.div(count);

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxVelocity);
      steer.sub(this.velocity);
      steer.limit(this.maxAcceleration);
    }

    return steer;
  }

  /**
   * For every neighboring Swallow, computes the average velocity. Responsible for this
   * Swallow's alignment with respect to the group(?)
   * @returns {p5.Vector} The alignment steering vector.
   */
  private alignment() {
    const neighborDistance: number = this.flocker.$desiredAlignment;
    const sum: p5.Vector = this.flocker.$p5.createVector(0, 0);
    let count: number = 0;

    this.flocker.$swallows.forEach(swallow => {
      const currentPosition: p5.Vector = this.flocker.$p5.createVector(this.m.getPosition().x, this.m.getPosition().y);
      const targetPosition: p5.Vector = this.flocker.$p5.createVector(
        swallow.m.getPosition().x,
        swallow.m.getPosition().y
      );

      const distance: number = currentPosition.dist(targetPosition);

      if (distance > 0 && distance < neighborDistance) {
        sum.add(swallow.velocity);
        count++;
      }
    });

    let steer: p5.Vector = this.flocker.$p5.createVector(0, 0); // the alignment's steering force

    if (count > 0) {
      sum.div(count);

      // Implement Reynolds: Steering = Desired - Velocity
      sum.normalize();
      sum.mult(this.maxVelocity);

      steer = sum.sub(this.velocity);
      steer.limit(this.maxAcceleration);
    }

    return steer;
  }

  /**
   * Computes the steering force towards the center of all the nearby Swallow's positions.
   * @returns {p5.Vector} The steering force vector.
   */
  private cohesion() {
    const neighborDistance: number = this.flocker.$desiredCohesion;
    const sum: p5.Vector = this.flocker.$p5.createVector(0, 0); // Start with empty vector to accumulate all positions
    let count: number = 0;

    this.flocker.$swallows.forEach(swallow => {
      const currentPosition: p5.Vector = this.flocker.$p5.createVector(this.m.getPosition().x, this.m.getPosition().y);
      const targetPosition: p5.Vector = this.flocker.$p5.createVector(
        swallow.m.getPosition().x,
        swallow.m.getPosition().y
      );

      const distance: number = currentPosition.dist(targetPosition);

      if (distance > 0 && distance < neighborDistance) {
        sum.add(targetPosition); // Add position
        count++;
      }
    });

    let steer: p5.Vector = this.flocker.$p5.createVector(0, 0);

    if (count > 0) {
      sum.div(count);
      steer = this.seek(sum); // Steer towards the position
    }

    return steer;
  }

  /**
   * Changes the direction of the Swallow to match it's velocity's direction.
   */
  private changeDirection() {
    this.m.rotate2D(Math.abs(0.1));
  }

  /**
   * Applies a force to the Swallow.
   * @param {p5.Vector} force The force that will let each Swallow accelerate.
   * F = ma => a = F / m
   * Assuming each Swallow has same unit mass, then (a = F).
   */
  private applyForce(force: p5.Vector) {
    this.acceleration.add(force);
  }

  /**
   * Renders the Swallow.
   */
  private render() {
    this.flocker.$p5.push(); // push the current matrix onto the stack

    const [p1, p2, p3, p4, p5, p6]: number[] = this.m.getParamsForApplying();

    this.flocker.$p5.applyMatrix(p1, p2, p3, p4, p5, p6);
    this.flocker.$p5.rotate(this.velocity.heading() + 90.0);

    this.flocker.$p5.image(this.image, 0, 0);
    // this.flocker.$p5.rect(0, 0, this.image.width, this.image.height); // for debugging

    this.flocker.$p5.pop(); // pop the current matrix from the stack, replacing it to the backed up matrix
  }
}

//#endregion Swallow
