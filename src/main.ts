import './style.css'
import { YangScene } from './scene';
import * as THREE from 'three';
import { CubePartition } from './cube_partition'; 
import { GUI } from 'dat.gui';
import { Water } from 'three/examples/jsm/objects/Water';

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const yangScene = new YangScene(canvas);
yangScene.Tick();

// Lights
const pointLight = new THREE.PointLight(0xFF0000);
pointLight.position.set(-25, 25, 0);

const pointLight2 = new THREE.PointLight(0x0000FF);
pointLight2.position.set(25, -25, 0);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );

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
const waterGeometry = new THREE.PlaneGeometry( 500, 250 );
const water = new Water(
  waterGeometry,
  {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    } ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x000000,
    distortionScale: 3.7
  }
);

water.position.set(0,-15,0);
water.rotation.x = - Math.PI / 2;

yangScene.Add(water);


// Tick Binding
canvas.addEventListener("Tick", ()=>{
  const deltaSec = yangScene.GetDeltaSec();
  cubes.Tick(deltaSec);
  water.material.uniforms[ 'time' ].value += deltaSec;
});

// Dat Gui
const gui = new GUI();
const cubePartitionFolder = gui.addFolder("Cube Partition");
cubePartitionFolder.add(cubes, "desirePadding", 1, 10);
cubePartitionFolder.add(cubes.rotation, "x", 0, 1);
cubePartitionFolder.add(cubes.rotation, "y", 0, 1);
cubePartitionFolder.add(cubes.rotation, "z", 0, 1);
cubePartitionFolder.add(cubes, "rotationSpeed", 0, 10);

cubePartitionFolder.open();