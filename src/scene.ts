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

        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/ window.innerHeight, 0.1, 1000);
        this.camera.position.setZ(30);

        this.renderer = new THREE.WebGLRenderer({
            canvas : canvas
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.renderer.render(this.scene, this.camera);
    }

    public Animate = () => {
        requestAnimationFrame( this.Animate );
        this.renderer.render(this.scene, this.camera);
    }
}