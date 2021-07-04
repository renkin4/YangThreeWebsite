import './style.css'
import { YangScene } from './scene';

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const yangScene = new YangScene(canvas);

yangScene.Animate();