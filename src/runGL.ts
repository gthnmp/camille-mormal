import works from '../public/media/works.json'
import initializeGL from "./utils/initializeGL";
import { initSmoothScroll, mousePosition } from "./utils/smoothScroll";
import { textureCache } from './utils/loadTextures';
import Thumbnail from './utils/Thumbnail';

const rectWidth = 0.35;
const rectHeight = 1.0;
const gap = rectWidth + 0.025;

const runGL = () => {
  const canvas = document.querySelector('#gl') as HTMLCanvasElement;
  const {gl, program} = initializeGL(canvas)
  gl.useProgram(program);
  
  console.log(canvas.clientWidth, canvas.clientHeight);
  
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const imageDimesionUniformLocation = gl.getUniformLocation(program, 'u_imageDimension') 
  gl.uniform2f(imageDimesionUniformLocation, canvas.clientWidth, canvas.clientHeight)

  const containerDimesionUniformLocation = gl.getUniformLocation(program, 'u_containerDimension') 
  gl.uniform2f(containerDimesionUniformLocation, rectWidth, rectHeight)

  function render() {
    let mousePositionPercent = mousePosition / (gap * 7);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    works.forEach((thumbnail, index) => {
      new Thumbnail(gl, index * gap, 0, textureCache[index], rectWidth, rectHeight)
      
      const startingPositionUniformLocation = gl.getUniformLocation(program, 'u_startingPositionPercentage')
      gl.uniform1f(startingPositionUniformLocation, (thumbnail.home.position - mousePositionPercent))
      
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    })
    requestAnimationFrame(render)
  }
  render()
};

runGL();
initSmoothScroll(gap)
