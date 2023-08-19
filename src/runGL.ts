import works from '../public/media/works.json'
import initializeGL from "./utils/initializeGL";
import { initSmoothScroll, mousePosition } from "./utils/smoothScroll";
import { loadTexture, textureCache } from './utils/loadTextures';

const rectWidth = 0.35;
const rectHeight = 1.0;
const gap = rectWidth + 0.025;

class Thumbnail {
  gl : WebGLRenderingContext
  image : WebGLTexture;
  index : number;
  centerPoint : number;
  x1 : number;
  x2 : number;
  y1 : number;
  y2 : number;
  height : number;
  width  : number;
  gap    : number;

  constructor(
    gl:WebGLRenderingContext, 
    index:number, 
    image:WebGLTexture, 
    width:number, 
    height:number, 
    gap:number
  ){
    this.gl = gl
    this.index = index;
    this.image = image;
    this.width = width;
    this.height = height;
    this.gap = gap

    this.centerPoint = this.index * this.gap;
    this.x1 = (this.centerPoint - this.width / 2) - mousePosition;
    this.x2 = (this.centerPoint + this.width / 2) - mousePosition;
    this.y1 = 0 - this.height / 2;
    this.y2 = 0 + this.height / 2;
    
    this.createThumbnail()
    this.gl.bindTexture(gl.TEXTURE_2D, image)
  }

  createThumbnail() {
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      this.x1, this.y1,
      this.x2, this.y1,
      this.x1, this.y2,
      this.x1, this.y2,
      this.x2, this.y1,
      this.x2, this.y2,
    ]), this.gl.STATIC_DRAW);
  }
}

const runGL = () => {
  const canvas = document.querySelector('#gl') as HTMLCanvasElement;
  const {gl, program} = initializeGL(canvas)
  gl.useProgram(program);
  
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  function render() {
    let mousePositionPercent = mousePosition / (gap * 7);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    works.forEach((thumbnail, index) => {
      new Thumbnail(gl, index, textureCache[index], rectWidth, rectHeight, gap)
      const startingPositionUniformLocation = gl.getUniformLocation(program, 'u_startingPositionPercentage')
      gl.uniform1f(startingPositionUniformLocation, (thumbnail.home.position - mousePositionPercent))
      
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    })
    requestAnimationFrame(render)
  }
  loadTexture(gl)
  render()
};

runGL();
initSmoothScroll(gap)
