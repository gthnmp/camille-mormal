attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec2 a_containerDimension;
attribute float a_deltaY;

uniform float u_startingPositionPercentage;
uniform float u_deltaY;
uniform float u_startY;
uniform float u_endY;
uniform float u_time;
uniform float u_delay;
uniform vec2 u_resolution;
uniform vec2 u_imageDimension;
uniform vec2 u_containerDimension;

varying vec2 v_texCoord;

float imageAspect = u_imageDimension.x / u_imageDimension.y;

float lerp (float start, float end, float t){
  return start * ( 1.0 - t ) + (end * t);
}

void main(){
  gl_Position = vec4(
    a_position.x, 
    (a_position.y * -1.0) +  (u_deltaY) * u_delay, 
    1.0, 
    1.0
  );

  v_texCoord = vec2(
    a_texCoord.x / imageAspect, 
    a_texCoord.y * imageAspect
  );
  v_texCoord = v_texCoord / imageAspect;
  v_texCoord.x += (u_containerDimension.x * 2.0) * u_startingPositionPercentage; 
}
