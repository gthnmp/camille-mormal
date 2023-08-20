attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec2 a_containerDimension;
attribute vec2 a_mousePercentage;

uniform vec2 u_resolution;
uniform float u_startingPositionPercentage;
uniform vec2 u_imageDimension;
uniform vec2 u_containerDimension;

varying vec2 v_texCoord;

float imageAspect = u_imageDimension.x / u_imageDimension.y;

void main(){
  gl_Position = vec4(a_position.x, a_position.y * -1.0, 1.0, 1.0);

  v_texCoord = vec2(
    a_texCoord.x / imageAspect, 
    a_texCoord.y * imageAspect
  );
  v_texCoord = v_texCoord / imageAspect;
  v_texCoord.x += (u_containerDimension.x * 2.0) * u_startingPositionPercentage; 
}
