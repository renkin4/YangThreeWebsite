import './style.css'
import { YangScene } from './scene';
import * as THREE from 'three';
import { CubePartition } from './cube_partition'; 
import { GUI } from 'dat.gui';

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const yangScene = new YangScene(canvas);

// Lights

const pointLight = new THREE.PointLight(0xFF0000);
pointLight.position.set(-25, 25, 0);

const pointLight2 = new THREE.PointLight(0x0000FF);
pointLight2.position.set(25, -25, 0);

yangScene.Add(pointLight, pointLight2);

const cubeMaterial = new THREE.MeshPhongMaterial();
cubeMaterial.color.setRGB(1,1,1);
cubeMaterial.flatShading = false;
cubeMaterial.reflectivity = 1;
cubeMaterial.shininess = 100;

const cubes  = new CubePartition(3, 3, cubeMaterial);

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