import works from '../public/media/works.json'
import initializeGL from "./utils/initializeGL";
import { initSmoothScroll, mousePosition } from "./utils/smoothScroll";
import { loadTexture, textureCache } from './utils/loadTextures';

const rectWidth = 0.35;
const rectHeight = 1.0;
const gap = rectWidth + 0.025;

function createThumbnail(gl: WebGLRenderingContext, x1: number, x2: number, y1: number, y2: number) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ]), gl.STATIC_DRAW);
}

const main = () => {
  const canvas = document.querySelector('#gl') as HTMLCanvasElement;
  const {gl, program} = initializeGL(canvas)
  gl.useProgram(program);
  
  console.log(window.innerWidth, window.innerHeight);
  
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  const positionBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  
  function drawScene() {
    let mousePositionPercent = mousePosition / (gap * 7);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    works.forEach((thumbnail, index) => {
      const centerPoint = index * gap;
      let x1 = (centerPoint - rectWidth / 2) - mousePosition;
      let x2 = (centerPoint + rectWidth / 2) - mousePosition;
      let y1 = 0 - rectHeight / 2;
      let y2 = 0 + rectHeight / 2;
      createThumbnail(gl, x1, x2, y1, y2);
      gl.bindTexture(gl.TEXTURE_2D, textureCache[index])

      const startingPositionUniformLocation = gl.getUniformLocation(program, 'u_startingPositionPercentage')
      gl.uniform1f(startingPositionUniformLocation, (thumbnail.home.position - mousePositionPercent))
      
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    })
    console.log(mousePositionPercent);
    requestAnimationFrame(drawScene)
  }
  loadTexture(gl)
  drawScene()
};

main();
initSmoothScroll(gap)