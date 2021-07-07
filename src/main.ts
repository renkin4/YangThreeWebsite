import './style.css'
import { YangScene } from './scene';
import * as THREE from 'three';
import raymarchingShader from "./shader/raymarching.glsl?raw";

let vertexData :string = "";
let fragmentData : string = "";

let determineShader = (shader : string) => {
    const lines = shader.split("\n");
    let mode = -1;

    for (let i = 0; i < lines.length; i++) {
        const element = lines[i];
        if(element.includes("#shader")){
            if(element.includes("vertex")){
                mode = 0;
            }
            else if (element.includes("fragment")){
                mode = 1;
            }
            continue;
        }

        if(mode == 0) {
            vertexData += (element);
            vertexData += "\n";
        }else if (mode == 1){
            fragmentData += element;
            fragmentData += "\n";
        }
    }
}

determineShader(raymarchingShader);

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const yangScene = new YangScene(canvas);

const dolly = new THREE.Group();
yangScene.Add(dolly);

const geometry = new THREE.PlaneGeometry( 2.0, 2.0 );
const material = new THREE.ShaderMaterial({
    uniforms: {
        resolution: { value: new THREE.Vector2( canvas.width, canvas.height ) },
        cameraWorldMatrix: { value: yangScene.camera.matrixWorld },
        cameraProjectionMatrixInverse: { value: yangScene.camera.projectionMatrixInverse.clone() }
    },
    
    vertexShader: vertexData,
    fragmentShader : fragmentData, 
});
const mesh = new THREE.Mesh( geometry, material );
mesh.frustumCulled = false;
yangScene.Add(mesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
yangScene.Add(pointLight, ambientLight);

yangScene.Animate();