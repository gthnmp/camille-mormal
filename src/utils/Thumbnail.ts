import { mousePosition } from "./smoothScroll";

export default class Thumbnail {
  x: number;
  y: number;
  gl: WebGLRenderingContext;
  texture: WebGLTexture;
  width: number;
  height: number;

  u1: number;
  u2: number;
  v1: number;
  v2: number;

  constructor(
    gl: WebGLRenderingContext,
    x: number = 0,
    y: number = 0,
    texture: WebGLTexture,
    width: number = 0.35,
    height: number = 1.0,
  ) {
    this.gl = gl;
    this.x = x;
    this.y = y;
    this.texture = texture;
    this.height = height;
    this.width = width;

    this.u1 = (this.x - this.width / 2) - mousePosition;
    this.u2 = (this.x + this.width / 2) - mousePosition;
    this.v1 = this.y - this.height / 2;
    this.v2 = this.y + this.height / 2;

    this.setVertices();
    this.gl.bindTexture(gl.TEXTURE_2D, texture);
  }

  setVertices() {
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        this.u1, this.v1,
        this.u2, this.v1,
        this.u1, this.v2,
        this.u1, this.v2,
        this.u2, this.v1,
        this.u2, this.v2,
      ]),
      this.gl.STATIC_DRAW,
    );
  }}
