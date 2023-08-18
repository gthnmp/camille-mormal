attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec2 a_containerDimension;
attribute vec2 a_mousePercentage;

vec2 imageDimension = vec2(2200.0, 1080.0);
vec2 containerDimension = vec2(0.35, 1.0);

float imageAspect = imageDimension.x / imageDimension.y;

uniform vec2 u_resolution;
uniform float u_startingPositionPercentage;

varying vec2 v_texCoord;

void main(){
  v_texCoord = vec2(
    a_texCoord.x / imageAspect, 
    a_texCoord.y * imageAspect
  );
  v_texCoord = v_texCoord / imageAspect;
  v_texCoord.x += (containerDimension.x * 2.0) * u_startingPositionPercentage; 
  gl_Position = vec4(a_position.x, a_position.y * -1.0, 1.0, 1.0);
}
