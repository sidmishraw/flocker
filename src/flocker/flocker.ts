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
 * @last-modified Thu Mar 22 2018 15:38:50 GMT-0700 (PDT)
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
  private maxWrapAroundWidth: number;
  private maxWrapAroundHeight: number;
  private maxVelocity: number;
  private maxAcceleration: number;
  private desiredSeparation: number;
  private desiredAlignment: number;
  private desiredCohesion: number;
  private separationWeight: number;
  private alignmentWeight: number;
  private cohesionWeight: number;
  private swallows: Swallow[];
  private p5: p5;
  private imagePath: string;

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
    this.imagePath = "/flocker/resources/swallow-img.png";
  }

  public get $imagePath(): string {
    return this.imagePath;
  }

  public set $imagePath(value: string) {
    this.imagePath = value;
  }

  public get $maxWrapAroundWidth(): number {
    return this.maxWrapAroundWidth;
  }

  public set $maxWrapAroundWidth(value: number) {
    this.maxWrapAroundWidth = value;
  }

  public get $maxVelocity(): number {
    return this.maxVelocity;
  }

  public set $maxVelocity(value: number) {
    this.maxVelocity = value;
  }

  public get $maxWrapAroundHeight(): number {
    return this.maxWrapAroundHeight;
  }

  public set $maxWrapAroundHeight(value: number) {
    this.maxWrapAroundHeight = value;
  }

  public get $maxAcceleration(): number {
    return this.maxAcceleration;
  }

  public set $maxAcceleration(value: number) {
    this.maxAcceleration = value;
  }

  public get $desiredSeparation(): number {
    return this.desiredSeparation;
  }

  public set $desiredSeparation(value: number) {
    this.desiredSeparation = value;
  }

  public get $desiredAlignment(): number {
    return this.desiredAlignment;
  }

  public set $desiredAlignment(value: number) {
    this.desiredAlignment = value;
  }

  public get $desiredCohesion(): number {
    return this.desiredCohesion;
  }

  public set $desiredCohesion(value: number) {
    this.desiredCohesion = value;
  }

  public get $separationWeight(): number {
    return this.separationWeight;
  }

  public set $separationWeight(value: number) {
    this.separationWeight = value;
  }

  public get $alignmentWeight(): number {
    return this.alignmentWeight;
  }

  public set $alignmentWeight(value: number) {
    this.alignmentWeight = value;
  }

  public get $cohesionWeight(): number {
    return this.cohesionWeight;
  }

  public set $cohesionWeight(value: number) {
    this.cohesionWeight = value;
  }

  public get $swallows(): Swallow[] {
    return this.swallows;
  }

  public get $p5(): p5 {
    return this.p5;
  }

  /**
   * Adds a Swallow to the flocker for the simulation.
   * @param {number} x The initial X coordinate of the Swallow.
   * @param {number} y The initial Y coordinate of the Swallow.
   * @memberof Flocker
   */
  public addSwallow(x: number, y: number) {
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
