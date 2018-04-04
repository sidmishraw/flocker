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
 * main.ts
 * @author Sidharth Mishra
 * @description Flocking simulation application.
 * @created Thu Mar 22 2018 10:27:59 GMT-0700 (PDT)
 * @last-modified Wed Apr 04 2018 16:01:14 GMT-0700 (PDT)
 */

import "p5";
import { Flocker } from "./flocker/flocker";

export interface ICustomWindow extends Window {
  flocker: Flocker;
  flocker_sP5: p5;
  debugView: boolean; // draws the debugging grid
  metaControl: boolean; // control was held
}

declare let window: ICustomWindow;

/**
 * The ID for the div inside which the simulation is drawn.
 */
export let simulationNode: string = "flocker";

/**
 * The simulation app.
 */
const app = new p5((p5: p5) => {
  // the flocker instance
  window.flocker = new Flocker(p5);

  // make my flocker's p5 available globally
  window.flocker_sP5 = p5;

  /**
   * Sets up the simulation.
   */
  p5.setup = () => {
    const canvas = p5.createCanvas(window.flocker.$maxWrapAroundWidth, window.flocker.$maxWrapAroundHeight);

    p5.angleMode(p5.DEGREES); // sets the angle mode to degrees
    p5.rectMode(p5.CENTER); // sets x,y co-ordinates for the retangle to be its CENTER
    p5.imageMode(p5.CENTER); // sets x,y co-ordinates for the image to be its CENTER

    window.flocker.resetSimulation();

    // start out with 100 Swallows for the simulation
    for (let x = 0; x < 30; x++)
      window.flocker.addSwallow(
        p5.random(window.flocker.$maxWrapAroundWidth),
        p5.random(window.flocker.$maxWrapAroundHeight)
      );
  };

  /**
   * Draw loop.
   */
  p5.draw = () => {
    p5.clear();
    // window.flocker.drawGrid();
    window.flocker.simulate();

    // adding information text
    p5.textSize(10);
    p5.textAlign(p5.LEFT, p5.CENTER); // reset the alignment
    p5.textFont("Courier New"); // monospaced font
    p5.text(
      `Frame rate: ${p5.frameRate()} FPS
Swallow count: ${window.flocker.$swallows.length}`,
      10,
      20
    );

    if (window.debugView) window.flocker.drawGrid(); // draw the debugging grid

    if (window.metaControl) {
      // display help menu
      p5.textSize(22);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textFont("Courier New");
      p5.text(
        `Ctrl + r: Remove a swallow from simulation
Ctrl + d: Toggle debug view
Ctrl + c: Add a swallow at the center of canvas`,
        p5.windowWidth / 2 - 200,
        p5.windowHeight / 2
      );
    }
  };

  /**
   * Event listener for when the mouse button is released.
   * I add a Swallow to the flock.
   */
  p5.mouseReleased = () => {
    window.flocker.addSwallow(p5.mouseX, p5.mouseY);
  };

  /**
   * Event listener for canvas resizing.
   */
  p5.windowResized = () => {
    p5.resizeCanvas(window.flocker.$maxWrapAroundWidth, window.flocker.$maxWrapAroundHeight, true);
    window.flocker.resetSimulation();
    // start out with 100 Swallows for the simulation
    for (let x = 0; x < 30; x++)
      window.flocker.addSwallow(
        p5.random(window.flocker.$maxWrapAroundWidth),
        p5.random(window.flocker.$maxWrapAroundHeight)
      );
  };

  /**
   * Key down event listener.
   */
  p5.keyPressed = () => {
    if (p5.keyCode === 17) window.metaControl = true; // control was pressed
  };

  /**
   * Listener for key released event
   */
  p5.keyReleased = () => {
    if (p5.keyCode === 17) window.metaControl = false; // control was released

    // ctrl + d
    if (p5.keyCode === 68 && window.metaControl) window.debugView = !window.debugView; // toggle debug view

    // ctrl + c
    if (p5.keyCode === 67 && window.metaControl)
      window.flocker.addSwallow(window.flocker.$maxWrapAroundWidth / 2, window.flocker.$maxWrapAroundHeight / 2); // add swallow at center of canvas

    // ctrl + r
    if (p5.keyCode === 82 && window.metaControl) window.flocker.removeSwallow(); // remove a swallow from the simulation

    return false; // prevent browser's default behavior
  };
}, document.getElementById(simulationNode));
