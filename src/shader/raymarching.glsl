#shader vertex
varying vec3 cameraPosition;

void main() 
{ 
    gl_Position = vec4(position, 1);
}

#shader fragment

#define MAX_STEPS 64
#define MAX_DIST 100.
#define SURF_DIST 0.001

varying vec3 cameraPosition;
uniform vec2 resolution;

uniform mat4 cameraWorldMatrix;
uniform mat4 cameraProjectionMatrixInverse;

vec3 col = vec3(1.);

const float EPS = 0.01;
const float OFFSET = EPS * 100.0;
const vec3 lightDir = vec3( -0.48666426339228763, 0.8111071056538127, -0.3244428422615251 );

void main()
{
    
    gl_FragColor = vec4(col, 1.);
}