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
 * theme.js
 * @author Gaurav Gupta
 * @created Thu Mar 29 2018 17:14:28 GMT-0700 (PDT)
 * @last-modified Sat Mar 31 2018 19:25:19 GMT-0700 (PDT)
 */

var mini = 300;
var maxi = 400;

$(document).ready(function() {
  document.getElementById("sidebar").style.height = `${screen.height}px`;
  console.log(document.getElementById("sidebar").style.height);
  document.getElementById("main").style.height = `${screen.height}px`;
  document.getElementById("split-bar").style.height = `${screen.height}px`;

  $("#split-bar").mousedown(splitBarMover);
  $(document).mouseup(e => $(document).unbind("mousemove"));
  maxi = $("#sidebar").width(); // current max width

  //#region flocker canvas resize
  // Added by sidmishraw for changing size of canvas at runtime
  // to match the render area.
  setTimeout(resizeFlockerCanvas, 1500);
  //#endregion flocker canvas resize

  $(window).resize(() => location.reload()); // reload the page to resize the canvas
});

/**
 * Movement of the splitbar.
 * @param {MouseEvent} e The mousedown event.
 */
function splitBarMover(e) {
  e.preventDefault();
  console.log("Mouse Down at split bar");
  $(document).mousemove(function(e) {
    e.preventDefault();
    var x = e.pageX - $("#sidebar").offset().left;
    // console.log(" x > min" + (x > mini) + " \t x :" + x + " \t min :" + mini);
    // console.log(x > mini && x < maxi && e.pageX < $(window).width());
    if (x > mini && x < maxi && e.pageX < $(window).width()) {
      $("#sidebar").css("width", x);
    }
  });
}

/**
 * Resizes the flocker canvas according to the size of the content area.
 */
function resizeFlockerCanvas() {
  $(".loader").show();
  if (window.flocker) {
    window.flocker.$maxWrapAroundWidth = $("#content").width();
    window.flocker.$maxWrapAroundHeight = $("#content").height();
    if (window.flocker_sP5) window.flocker_sP5.windowResized();
  }
  $(".loader").hide();
}
