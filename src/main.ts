import './style.scss'
import { YangScene } from './scene';
import * as THREE from 'three';
import { CubePartition } from './cube_partition'; 
import { YangWater } from './water';
import { EventHandler } from './event_handler';
// import { GUI } from 'dat.gui';

// Canvas
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// My Scene
const yangScene = new YangScene(canvas);
yangScene.Tick();

// Lights
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(-25, 25, 0);

const pointLight2 = new THREE.PointLight(0xFFFFFF);
pointLight2.position.set(25, -25, 0);

// const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );

yangScene.Add(pointLight, pointLight2);

// Cubes
const cubeMaterial = new THREE.MeshPhongMaterial();
cubeMaterial.color.setRGB(1,1,1);
cubeMaterial.flatShading = false;
cubeMaterial.reflectivity = 1;
cubeMaterial.shininess = 100;
cubeMaterial.specular = new THREE.Color(0xFFFFFF);

const cubes  = new CubePartition(3, 3, cubeMaterial);

yangScene.Add(cubes.GetRoot()); 

// Water
const water = new YangWater();
yangScene.Add(water.GetWater());

// Event Handlers
const eventHandler = new EventHandler();
eventHandler.BindScroll();

// Tick Binding
canvas.addEventListener("Tick", ()=>{
  const deltaSec = yangScene.GetDeltaSec();
  cubes.Tick(deltaSec);
  water.Tick(deltaSec);

  const scrollHeight = eventHandler.GetScrollHeight();
  if(scrollHeight > (window.innerHeight * 0.35)){
    cubes.Yeet(true);
    water.Yeet(true);
  }else{
    cubes.Yeet(false);
    water.Yeet(false);
  }
});

// Dat Gui
// const gui = new GUI();
// const cubePartitionFolder = gui.addFolder("Cube Partition");
// cubePartitionFolder.add(cubes, "desirePadding", 1, 10);
// cubePartitionFolder.add(cubes.rotation, "x", 0, 1);
// cubePartitionFolder.add(cubes.rotation, "y", 0, 1);
// cubePartitionFolder.add(cubes.rotation, "z", 0, 1);
// cubePartitionFolder.add(cubes, "rotationSpeed", 0, 10);

// cubePartitionFolder.open();

