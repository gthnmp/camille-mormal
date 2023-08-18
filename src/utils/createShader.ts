export default function createShader(gl: WebGLRenderingContext, type:number, source:string):WebGLShader{
  const shader = gl.createShader(type) as WebGLShader
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if(success){
    return shader
  }
  console.log('Shader compilation failed', gl.getShaderInfoLog(shader));
  gl.deleteShader(shader)
  throw new Error("shader compilation failed")
}
