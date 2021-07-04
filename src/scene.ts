import * as THREE from 'three';

export class YangScene {
    private scene : THREE.Scene;
    private renderer : THREE.WebGLRenderer;
    private camera : THREE.PerspectiveCamera;
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

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setSize( window.innerWidth, window.innerHeight, false);
        this.renderer.render(this.scene, this.camera);
    }
}