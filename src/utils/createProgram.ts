export default function createProgram(gl:WebGLRenderingContext, vertexShader:WebGLShader, fragmentShader:WebGLShader): WebGLProgram {
  const program = gl.createProgram() as WebGLProgram;
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if ( success ){
    return program
  }
  console.error("Program Linking failed", gl.getProgramInfoLog(program));
  gl.deleteProgram(program)
  throw new Error("Program failed")
}