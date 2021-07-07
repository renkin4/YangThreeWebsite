import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class YangScene {
    private scene : THREE.Scene;
    private renderer : THREE.WebGLRenderer;
    public camera : THREE.PerspectiveCamera;
    private controls : OrbitControls;
    private TickEvent = new Event("Tick");

    /**
     *
     */
    constructor(canvas: HTMLCanvasElement) {
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            canvas : canvas,
            alpha : false
        });

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(60, width/ height, 1, 2000);
        this.camera.position.setZ(4);

        this.controls = new OrbitControls(this.camera, canvas);
        this.controls.update();

        this.SetRendererSize();
        window.addEventListener( 'resize', this.SetRendererSize, false );
    }

    public Animate = () => {
        requestAnimationFrame( this.Animate );
        this.renderer.render(this.scene, this.camera);
    }

    public Add = (...object : THREE.Object3D[]) => {
        this.scene.add(...object);
    }

    private SetRendererSize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.controls.update();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setSize( window.innerWidth, window.innerHeight, false);
        this.renderer.render(this.scene, this.camera);

        this.renderer.domElement.dispatchEvent(this.TickEvent);

    }
}