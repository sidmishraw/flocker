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
 * flocker.ts
 * @author Sidharth Mishra
 * @description Flocker core logic goes in here.
 * @created Thu Mar 22 2018 10:47:43 GMT-0700 (PDT)
 * @last-modified Sat Mar 31 2018 16:35:31 GMT-0700 (PDT)
 */

import { Swallow } from "./swallow";
import "p5";

//#region Flocker

/**
 * Flocker app.
 * @export
 * @class Flocker
 */
export class Flocker {
  /**
   * The maximum width of the flocker canvas, needed for wrapping around out of
   * bound swallows.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private maxWrapAroundWidth: number;

  /**
   * The maximum height of the flocker canvas, needed for wrapping around out of
   * bound swallows.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private maxWrapAroundHeight: number;

  /**
   * Max velocity of a swallow. It is capped to make the simulation smoother.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private maxVelocity: number;

  /**
   * Max acceleration permitted, needed for keeping the simulation smooth.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private maxAcceleration: number;

  /**
   * The desired separation in pixels.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private desiredSeparation: number;

  /**
   * The desired alignment.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private desiredAlignment: number;

  /**
   * The desired cohesion.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private desiredCohesion: number;

  /**
   * The weight of the separation force when computing net accl. of the swallow.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private separationWeight: number;

  /**
   * The weight of the alignment force when computing net accl. of the swallow.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private alignmentWeight: number;

  /**
   * The weight of the cohesion force when computing net accl. of the swallow.
   * @private
   * @type {number}
   * @memberof Flocker
   */
  private cohesionWeight: number;

  /**
   * The list of all the swallows that are part of this simulation.
   * @private
   * @type {Swallow[]}
   * @memberof Flocker
   */
  private swallows: Swallow[];

  /**
   * Reference to the p5 object, needed for the simulation.
   * @private
   * @type {p5}
   * @memberof Flocker
   */
  private p5: p5;

  /**
   * Path to the image of the swallow.
   * @private
   * @type {string}
   * @memberof Flocker
   */
  private imagePath: string;

  /**
   * Creates an instance of Flocker.
   * @param {p5} p5 The reference to the p5 instance needed for this simulation.
   * @memberof Flocker
   */
  public constructor(p5: p5) {
    this.maxWrapAroundWidth = 816;
    this.maxWrapAroundHeight = 480;
    this.maxVelocity = 2.0;
    this.maxAcceleration = 0.03;
    this.desiredSeparation = 50.0;
    this.desiredAlignment = 50.0;
    this.desiredCohesion = 50.0;
    this.separationWeight = 3.0;
    this.alignmentWeight = 2.0;
    this.cohesionWeight = 2.0;
    this.swallows = [];
    this.p5 = p5;
    this.imagePath = "/flocker/resources/swallow.png";
  }

  /**
   * Fetches the image path of the swallow.
   * @type {string}
   * @memberof Flocker
   */
  public get $imagePath(): string {
    return this.imagePath;
  }

  /**
   * Sets the image path of the swallow.
   * @memberof Flocker
   */
  public set $imagePath(value: string) {
    this.imagePath = value;
  }

  /**
   * Getter for the max wraparound width of this simulation.
   * @type {number}
   * @memberof Flocker
   */
  public get $maxWrapAroundWidth(): number {
    return this.maxWrapAroundWidth;
  }

  /**
   * Setter for the max wraparound width of this simulation.
   * @memberof Flocker
   */
  public set $maxWrapAroundWidth(value: number) {
    this.maxWrapAroundWidth = value;
  }

  /**
   * Getter for the max velocity cap for the swallows.
   * @type {number}
   * @memberof Flocker
   */
  public get $maxVelocity(): number {
    return this.maxVelocity;
  }

  /**
   * Setter for the max velocity cap for the swallows.
   * @memberof Flocker
   */
  public set $maxVelocity(value: number) {
    this.maxVelocity = value;
  }

  /**
   * Getter for the max wraparound height of this simulation.
   * @type {number}
   * @memberof Flocker
   */
  public get $maxWrapAroundHeight(): number {
    return this.maxWrapAroundHeight;
  }

  /**
   * Setter for the max wraparound height of this simulation.
   * @memberof Flocker
   */
  public set $maxWrapAroundHeight(value: number) {
    this.maxWrapAroundHeight = value;
  }

  /**
   * Getter for the max acceleration cap for the swallows.
   * @type {number}
   * @memberof Flocker
   */
  public get $maxAcceleration(): number {
    return this.maxAcceleration;
  }

  /**
   * Setter for the max acceleration cap for the swallows.
   * @memberof Flocker
   */
  public set $maxAcceleration(value: number) {
    this.maxAcceleration = value;
  }

  /**
   * The desired separation in pixels.
   * @type {number}
   * @memberof Flocker
   */
  public get $desiredSeparation(): number {
    return this.desiredSeparation;
  }

  /**
   * The desired separation in pixels.
   * @memberof Flocker
   */
  public set $desiredSeparation(value: number) {
    this.desiredSeparation = value;
  }

  /**
   * The desired alignment.
   * @type {number}
   * @memberof Flocker
   */
  public get $desiredAlignment(): number {
    return this.desiredAlignment;
  }

  /**
   * The desired alignment.
   * @memberof Flocker
   */
  public set $desiredAlignment(value: number) {
    this.desiredAlignment = value;
  }

  /**
   * The desired cohesion.
   * @type {number}
   * @memberof Flocker
   */
  public get $desiredCohesion(): number {
    return this.desiredCohesion;
  }

  /**
   * The desired cohesion.
   * @memberof Flocker
   */
  public set $desiredCohesion(value: number) {
    this.desiredCohesion = value;
  }

  /**
   * The weight of the separation force when computing net accl. of the swallow.
   * @type {number}
   * @memberof Flocker
   */
  public get $separationWeight(): number {
    return this.separationWeight;
  }

  /**
   * The weight of the separation force when computing net accl. of the swallow.
   * @memberof Flocker
   */
  public set $separationWeight(value: number) {
    this.separationWeight = value;
  }

  /**
   * The weight of the alignment force when computing net accl. of the swallow.
   * @type {number}
   * @memberof Flocker
   */
  public get $alignmentWeight(): number {
    return this.alignmentWeight;
  }

  /**
   * The weight of the alignment force when computing net accl. of the swallow.
   * @memberof Flocker
   */
  public set $alignmentWeight(value: number) {
    this.alignmentWeight = value;
  }

  /**
   * The weight of the cohesion force when computing net accl. of the swallow.
   * @type {number}
   * @memberof Flocker
   */
  public get $cohesionWeight(): number {
    return this.cohesionWeight;
  }

  /**
   * The weight of the cohesion force when computing net accl. of the swallow.
   * @memberof Flocker
   */
  public set $cohesionWeight(value: number) {
    this.cohesionWeight = value;
  }

  /**
   * Fetches the list of swallows part of this simulation.
   * @readonly
   * @type {Swallow[]}
   * @memberof Flocker
   */
  public get $swallows(): Swallow[] {
    return this.swallows;
  }

  /**
   * Fetches the reference to the p5 instance being used for simulation.
   * @readonly
   * @type {p5}
   * @memberof Flocker
   */
  public get $p5(): p5 {
    return this.p5;
  }

  /**
   * Clears out the swallows from the simulation and begins the simulation with new swallows.
   * @memberof Flocker
   */
  public resetSimulation() {
    this.swallows = [];
  }

  /**
   * Adds a Swallow to the flocker for the simulation.
   * @param {number} x The initial X coordinate of the Swallow.
   * @param {number} y The initial Y coordinate of the Swallow.
   * @memberof Flocker
   */
  public addSwallow(x: number, y: number) {
    if (x < 0) return;
    if (x > this.maxWrapAroundWidth) return;
    if (y < 0) return;
    if (y > this.maxWrapAroundHeight) return;

    this.swallows.push(new Swallow(x, y, this));
  }

  /**
   * Starts the flocking simulation.
   * @memberof Flocker
   */
  public simulate() {
    this.swallows.forEach(swallow => swallow.fly());
  }

  /**
   * Draws a grid for debugging.
   * @memberof Flocker
   */
  public drawGrid() {
    this.p5.stroke("#000000");
    this.p5.fill(this.p5.color(120));

    for (let x: number = -this.p5.width; x < this.p5.width; x += 40) {
      this.p5.line(x, -this.p5.height, x, this.p5.height);
      this.p5.text(x.toString(), x + 1, 12);
    }

    for (let y: number = -this.p5.height; y < this.p5.height; y += 40) {
      this.p5.line(-this.p5.width, y, this.p5.width, y);
      this.p5.text(y.toString(), 1, y + 12);
    }
  }
}

//#endregion Flocker
