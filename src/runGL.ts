import works from '../public/media/works.json'
import initializeGL from "./utils/initializeGL";
import { initSmoothScroll, mousePosition } from "./utils/smoothScroll";
import { textureCache } from './utils/loadTextures';
import Thumbnail from './utils/Thumbnail';

const canvas = document.querySelector('#gl') as HTMLCanvasElement;
const {gl, program} = initializeGL(canvas)
gl.useProgram(program);

const rectWidth = 0.35;
const rectHeight = 1.0;
const gap = rectWidth + 0.025;

const runGL = () => {
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const imageDimesionUniformLocation = gl.getUniformLocation(program, 'u_imageDimension') 
  gl.uniform2f(imageDimesionUniformLocation, canvas.clientWidth, canvas.clientHeight)

  const containerDimesionUniformLocation = gl.getUniformLocation(program, 'u_containerDimension') 
  gl.uniform2f(containerDimesionUniformLocation, rectWidth, rectHeight)

  const timeUniformLocation = gl.getUniformLocation(program, 'u_time') 
  const delayUniformLocation = gl.getUniformLocation(program, 'u_delay') 
  
  function render() {
    let mousePositionPercent = mousePosition / (gap * 7);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    
    const currentTime = performance.now() / 1000.0; // Get current time in seconds
    gl.uniform1f(timeUniformLocation, currentTime); // Update the uniform with the current time
    
    works.forEach((thumbnail, index) => {
      const exitTimingDelay = 1.2 - 0.1 * ((index) + 1)
      
      new Thumbnail(gl, index * gap, 0, textureCache[index], rectWidth, rectHeight)
      const startingPositionUniformLocation = gl.getUniformLocation(program, 'u_startingPositionPercentage')
      
      gl.uniform1f(startingPositionUniformLocation, (thumbnail.home.position - mousePositionPercent))
      gl.uniform1f(delayUniformLocation, exitTimingDelay) 
      
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    })
    requestAnimationFrame(render)
  }
  render()
};

runGL();

if (window.location.pathname === "/"){
  initSmoothScroll(gap)
}

export {
  gl, 
  program
}
