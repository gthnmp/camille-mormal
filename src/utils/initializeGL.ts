import resizeCanvas from "./resizeCanvas"
import createShader from "./createShader";
import createProgram from "./createProgram";
import vertexShaderSource from './shaders/vertexShader.glsl'
import fragmentShaderSource from './shaders/fragmentShader.glsl'
import initTexCoordBuffer from './initializeTexCoord.ts'

interface R {
  gl: WebGLRenderingContext,
  program: WebGLProgram
}

export default function initializeGL (canvas : HTMLCanvasElement):R{
  const gl = canvas.getContext('webgl') as WebGLRenderingContext;
  resizeCanvas(canvas);
  
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertexShader, fragmentShader);
  
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

  initTexCoordBuffer(gl, program)

  return {
    gl,
    program
  }
}
