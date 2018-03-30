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
 * utils.ts
 * @author Sidharth Mishra
 * @description Flocker utilities go in here.
 * @created Thu Mar 22 2018 11:22:04 GMT-0700 (PDT)
 * @last-modified Thu Mar 29 2018 18:19:06 GMT-0700 (PDT)
 */

/**
 * Matrix4x4 is a 4x4 matrix of the form:
 * M = | m11, m21, m31, tx |
 *     | m12, m22, m32, ty |
 *     | m13, m23, m33, tz |
 *     | 0  , 0  , 0  , 1  |
 *
 * tx, ty, tz -- represents the position of the object in 2-D space. Also, represents the translation matrix.
 * tx and ty are the parameters `e`, `f` in p5.js' #applyMatrix(a, b, c, d, e, f).
 *
 * m11, m12, m13, m21, m22, m23, m31, m32, m33 -- represent the rotation, scale, and shear transformations.
 * m11, m12, m21, m22 -- represent the elements in the 2D space - m33, m31, m32, m13, m23 = 0 for 2-D
 *
 * @export
 * @class Matrix4x4
 */
export class Matrix4x4 {
  /**
   * Uses Strassen's fast multiplication algorithm to multiply 2- 2x2 matrices.
   * @static
   * @param {number[][]} A 2x2 matrix
   * @param {number[][]} B 2x2 matrix
   * @returns {number[][]} the product which is a 2x2 matrix.
   * @memberof Matrix4x4
   */
  public static strassen2x2(A: number[][], B: number[][]): number[][] {
    if (!A || !B) throw new Error("A and B need to be 2x2 matrices.");

    const p1: number = A[0][0] * (B[0][1] - B[1][1]);
    const p2: number = (A[0][0] + A[0][1]) * B[1][1];
    const p3: number = (A[1][0] + A[1][1]) * B[0][0];
    const p4: number = A[1][1] * (B[1][0] - B[0][0]);
    const p5: number = (A[0][0] + A[1][1]) * (B[0][0] + B[1][1]);
    const p6: number = (A[0][1] - A[1][1]) * (B[1][0] + B[1][1]);
    const p7: number = (A[0][0] - A[1][0]) * (B[0][0] + B[0][1]);

    return [[p5 + p4 - p2 + p6, p1 + p2], [p3 + p4, p1 + p5 - p3 - p7]];
  }

  /**
   * Multiplies the first matrix with the second using Strassen's fast matrix multiplication algorithm.
   * @static
   * @param {number[][]} A The first 4x4 matrix.
   * @param {number[][]} B The second 4x4 matrix.
   * @returns {number[][]} The product of A and B, another 4x4 matrix.
   * @memberOf Matrix4x4
   */
  public static strassen4x4(A: number[][], B: number[][]): number[][] {
    if (!A || !B) throw new Error("A and B need to be 4x4 matrices.");

    const a = [[A[0][0], A[0][1]], [A[1][0], A[1][1]]];
    const b = [[A[0][2], A[0][3]], [A[1][2], A[1][3]]];
    const c = [[A[2][0], A[2][1]], [A[3][0], A[3][1]]];
    const d = [[A[2][2], A[2][3]], [A[3][2], A[3][3]]];
    const e = [[B[0][0], B[0][1]], [B[1][0], B[1][1]]];
    const f = [[B[0][2], B[0][3]], [B[1][2], B[1][3]]];
    const g = [[B[2][0], B[2][1]], [B[3][0], B[3][1]]];
    const h = [[B[2][2], B[2][3]], [B[3][2], B[3][3]]];

    const p1 = Matrix4x4.strassen2x2(a, Matrix4x4.matrixDiff2x2(f, h));
    const p2 = Matrix4x4.strassen2x2(Matrix4x4.matrixSum2x2(a, b), h);
    const p3 = Matrix4x4.strassen2x2(Matrix4x4.matrixSum2x2(c, d), e);
    const p4 = Matrix4x4.strassen2x2(d, Matrix4x4.matrixDiff2x2(g, e));
    const p5 = Matrix4x4.strassen2x2(Matrix4x4.matrixSum2x2(a, d), Matrix4x4.matrixSum2x2(e, h));
    const p6 = Matrix4x4.strassen2x2(Matrix4x4.matrixDiff2x2(b, d), Matrix4x4.matrixSum2x2(g, h));
    const p7 = Matrix4x4.strassen2x2(Matrix4x4.matrixDiff2x2(a, c), Matrix4x4.matrixSum2x2(e, f));

    const c11 = Matrix4x4.matrixSum2x2(Matrix4x4.matrixDiff2x2(Matrix4x4.matrixSum2x2(p5, p4), p2), p6);
    const c12 = Matrix4x4.matrixSum2x2(p3, p4);
    const c21 = Matrix4x4.matrixSum2x2(p1, p2);
    const c22 = Matrix4x4.matrixDiff2x2(Matrix4x4.matrixSum2x2(p1, p5), Matrix4x4.matrixSum2x2(p3, p7));

    return [[...c11[0], ...c21[0]], [...c11[1], ...c21[1]], [...c12[0], ...c22[0]], [...c12[1], ...c22[1]]];
  }

  /**
   * Sums the two given 2x2 matrices.
   * @static
   * @param {number[][]} A 2x2 matrix.
   * @param {number[][]} B 2x2 matrix.
   * @returns {number[][]} The sum 2x2 matrix;
   * @memberOf Matrix4x4
   */
  public static matrixSum2x2(A: number[][], B: number[][]): number[][] {
    if (!A || !B) throw new Error("A and B need to be 2x2 matrices.");

    return [[A[0][0] + B[0][0], A[0][1] + B[0][1]], [A[1][0] + B[1][0], A[1][1] + B[1][1]]];
  }

  /**
   * Subtracts the second matrix from the first. Both are 2x2 matrices.
   * @static
   * @param {number[][]} A 2x2 matrix.
   * @param {number[][]} B 2x2 matrix.
   * @returns {number[][]} The difference 2x2 matrix;
   * @memberOf Matrix4x4
   */
  public static matrixDiff2x2(A: number[][], B: number[][]): number[][] {
    if (!A || !B) throw new Error("A and B need to be 2x2 matrices.");

    return [[A[0][0] - B[0][0], A[0][1] - B[0][1]], [A[1][0] - B[1][0], A[1][1] - B[1][1]]];
  }

  /**
   * The value of this matrix.
   * @private
   * @type {number[][]}
   * @memberof Matrix4x4
   */
  private value: number[][];

  /**
   * The X axis wraparound.
   * @private
   * @type {number}
   * @memberof Matrix4x4
   */
  private xWrapAround: number;

  /**
   * The Y axis wraparound.
   * @private
   * @type {number}
   * @memberof Matrix4x4
   */
  private yWrapAround: number;

  /**
   * Keeps track of the current scaling factor that was applied to this transformation matrix.
   * @private
   * @type {{ x: number; y: number; z: number }}
   * @memberof Matrix4x4
   */
  private currentScaleFactor: { x: number; y: number; z: number };

  /**
   * Keeps track of the current rotation applied to this transformation matrix.
   * @private
   * @type {number}
   * @memberof Matrix4x4
   */
  private currentRotationAngle: number;

  /**
   * Creates an instance of Matrix4x4.
   * @param {number} xLimit The X axis wraparound limit.
   * @param {number} yLimit The Y axis wraparound limit.
   * @param {number} [initialRotation=0.0] The initial rotation - defaults to 0.0
   * @memberof Matrix4x4
   */
  public constructor(xLimit: number, yLimit: number, initialRotation: number = 0.0) {
    this.value = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; // 4x4 identity matrix
    this.xWrapAround = xLimit;
    this.yWrapAround = yLimit;
    this.currentScaleFactor = { x: 1, y: 1, z: 1 };
    this.currentRotationAngle = initialRotation;
  }

  /**
   * Resets the matrix back to an identity matrix removing all transformations.
   * @memberof Matrix4x4
   */
  public resetMatrix() {
    this.value = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; // 4x4 identity matrix
  }

  /**
   * Gets the position vector.
   * @returns {{ x: number, y: number}} The position vector.
   * @memberof Matrix4x4
   */
  public getPosition(): { x: number; y: number } {
    return {
      x: this.value[0][3],
      y: this.value[1][3]
    };
  }

  /**
   * Gets the rotation angle from the transformation matrix.
   * @returns {number} The current rotation angle.
   * @memberof Matrix4x4
   */
  public getRotation(): number {
    return this.currentRotationAngle;
  }

  /**
   * Gets the current scale factor.
   * @returns {{x:number, y:number, z:number}} The current scale factor applied.
   * @memberof Matrix4x4
   */
  public getScale(): { x: number; y: number; z: number } {
    return this.currentScaleFactor;
  }

  /**
   * Gets the parameters in the order for an easy spread application.
   * @returns {number[]} The parameters that can be spread for `#applyMatrix()` calls.
   * @memberof Matrix4x4
   */
  public getParamsForApplying() {
    // a, b, c, d, e, f
    return [this.value[0][0], this.value[1][0], this.value[0][1], this.value[1][1], this.value[0][3], this.value[1][3]];
  }

  /**
   * Multiplies this matrix with the provided 4x4 matrix.
   * The multiplication is in the order: `this.value = B x this.value`
   * Algorithm used: Strassen's fast matrix multiplication
   * @param {number[][]} B The `4 x 4 matrix` to multiply this matrix with.
   * @returns {number[][]} The resulting 4 x 4 matrix.
   * @memberof Matrix4x4
   */
  public multMatrix(B: number[][]): number[][] {
    return Matrix4x4.strassen4x4(B, this.value);
  }

  /**
   * Peforms a translation of dx, dy amount on this transformation matrix.
   * Translate matrix = T = [[0, 0, dx], [0, 0, dy], [0, 0, 1]]
   * @param {number} dx The translation in X.
   * @param {number} dy The translation in Y.
   * @memberof Matrix4x4
   */
  public translate2D(dx: number, dy: number) {
    if (isNaN(dx) || isNaN(dy)) return;
    if (!dx || !dy) return;

    const tm = [[1, 0, 0, dx], [0, 1, 0, dy], [0, 0, 1, 0], [0, 0, 0, 1]]; // 2D translation matrix

    this.value = this.multMatrix(tm); // multiply the translation matrix

    if (!this.xWrapAround || !this.yWrapAround) return; // no wrap-around

    // wrap-around X axis
    if (this.value[0][3] < 0) this.value[0][3] = this.xWrapAround + this.value[0][3];
    if (this.value[0][3] > this.xWrapAround) this.value[0][3] = this.value[0][3] - this.xWrapAround;

    // wrap-around Y axis
    if (this.value[1][3] < 0) this.value[1][3] = this.yWrapAround + this.value[1][3];
    if (this.value[1][3] > this.yWrapAround) this.value[1][3] = this.value[1][3] - this.yWrapAround;
  }

  /**
   * Peforms a scaling of sx, sy amount on this transformation matrix.
   * Scale matrix = S = [[sx, 0, 0], [0, sy, 0], [0, 0, 1]]
   * @param {number} sx The scale factor for X axis.
   * @param {number} sy The scale factor for Y axis.
   * @memberOf Matrix4x4
   */
  public scale2D(sx: number, sy: number) {
    if (isNaN(sx) || isNaN(sy)) return;
    if (!sx || !sy) return;

    this.currentScaleFactor.x = this.currentScaleFactor.x * sx;
    this.currentScaleFactor.y = this.currentScaleFactor.y * sy;

    const sm = [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; // 2D scale matrix

    this.value = this.multMatrix(sm);
  }

  /**
   * Performs a rotation for the given angle in degrees.
   * Rotation matrix = R = [[cos(theta), -sin(theta), 0], [sin(theta), cos(theta), 0], [0, 0, 1]]
   * @param {number} theta The rotation angle in degrees. Clockwise is `+ve` and Anti-clockwise is `-ve`.
   * @memberOf Matrix4x4
   */
  public rotate2D(theta: number) {
    if (isNaN(theta)) return;
    if (!theta) return;

    this.currentRotationAngle = (this.currentRotationAngle + theta) % 360.0;

    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);

    const rm = [[cosT, -sinT, 0, 0], [sinT, cosT, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; // 2D rotation matrix

    this.value = this.multMatrix(rm);
  }

  /**
   * Performs rotation for the given angle after reverting the old rotation.
   * @param {number} theta The angle to rotate by.
   * @memberOf Matrix4x4
   */
  public rRotate2D(theta: number) {
    if (isNaN(theta)) return;
    if (!theta) return;

    let cosT = Math.cos(this.currentRotationAngle);
    let sinT = Math.sin(this.currentRotationAngle);
    const rrm = [[cosT, sinT, 0, 0], [-sinT, cosT, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; // 2D rotation matrix

    this.currentRotationAngle = theta;

    cosT = Math.cos(theta);
    sinT = Math.sin(theta);
    const rm = [[cosT, -sinT, 0, 0], [sinT, cosT, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; // 2D rotation matrix

    this.value = this.multMatrix(rrm);
    this.value = this.multMatrix(rm);
  }
}
