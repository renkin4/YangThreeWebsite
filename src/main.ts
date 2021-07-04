import './style.css'
import { YangScene } from './scene';
import * as THREE from 'three';
import { CubePartition } from './cube_partition'; 
import { GUI } from 'dat.gui';

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const yangScene = new YangScene(canvas);

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

const gui = new GUI();
const cubePartitionFolder = gui.addFolder("Cube Partition");
cubePartitionFolder.add(cubes, "desirePadding", 1, 10);
cubePartitionFolder.add(cubes.rotation, "x", 0, 1);
cubePartitionFolder.add(cubes.rotation, "y", 0, 1);
cubePartitionFolder.add(cubes.rotation, "z", 0, 1);
cubePartitionFolder.add(cubes, "rotationSpeed", 0, 10);

cubePartitionFolder.open();