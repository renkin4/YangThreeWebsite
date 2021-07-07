import './style.css'
import { YangScene } from './scene';
import * as THREE from 'three';


const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const yangScene = new YangScene(canvas);

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial({ 
    color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);
 
yangScene.Add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
yangScene.Add(pointLight, ambientLight);

yangScene.Animate();