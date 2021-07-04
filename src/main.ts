import './style.css'
import { YangScene } from './scene';
import * as THREE from 'three';
import { CubePartition } from './cube_partition';


const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const yangScene = new YangScene(canvas);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);
 
// yangScene.Add(torus);
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
yangScene.Add(pointLight, ambientLight);

const cubes  = new CubePartition(3, 3);

yangScene.Add(cubes.GetRoot()); 
yangScene.Tick();

canvas.addEventListener("Tick", ()=>{
  cubes.Tick(yangScene.GetDeltaSec());
});
