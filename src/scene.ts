import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class YangScene {
    private scene : THREE.Scene;
    private renderer : THREE.WebGLRenderer;
    private camera : THREE.PerspectiveCamera;

    private controls : OrbitControls;
    /**
     *
     */
    constructor(canvas: HTMLCanvasElement) {
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            canvas : canvas
        });

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(90, width/ height, 0.1, 1000);
        this.camera.position.setZ(30);

        this.SetRendererSize();
        window.addEventListener( 'resize', this.SetRendererSize, false );

        this.controls = new OrbitControls( this.camera, canvas );
        this.controls.update();
    }

    public Tick = () => {
        requestAnimationFrame( this.Tick );
        this.controls.update();

        this.renderer.render(this.scene, this.camera);
    }

    public Add = (...object : THREE.Object3D[]) => {
        this.scene.add(...object);
    }

    private SetRendererSize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setSize( window.innerWidth, window.innerHeight, false);
        this.renderer.render(this.scene, this.camera);
    }
}