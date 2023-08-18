import createBuffer from './createBuffer.ts'

const initTexCoordBuffer = (gl : WebGLRenderingContext, program:WebGLProgram) => {
  const texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord')
  const texCoordBuffer = createBuffer(gl, new Float32Array([
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0
  ]))
  gl.enableVertexAttribArray(texCoordAttributeLocation)
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.vertexAttribPointer( texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0 );
}

export default initTexCoordBuffer
