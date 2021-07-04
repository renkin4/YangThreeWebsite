import * as THREE from "three";
import { Water } from 'three/examples/jsm/objects/Water';
import WaterTexture from './textures/waternormals.jpg';
import { clamp } from 'three/src/math/MathUtils';

export class YangWater{
    private waterGeometry : THREE.PlaneGeometry;
    private water : Water;

    private bAlive : boolean = true;
    private currentScale : number = 1;

    public desireScale : number = 1;

    /**
     *
     */
    constructor() {
        this.waterGeometry = new THREE.PlaneGeometry( 600, 250 );
        this.water = new Water(
          this.waterGeometry,
          {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( WaterTexture, function ( texture ) {
              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x000000,
            distortionScale: 3.7
          }
        );
        
        this.water.position.set(0,-15,0);
        this.water.rotation.x = - Math.PI / 2;
    }

    public Tick = (deltaSec:number) =>{
        if(!this.bAlive) return;

        const dist = this.desireScale - this.currentScale;
        if(Math.abs(dist) < 0.01){
            this.currentScale = this.desireScale;
        }

        const deltaMove = dist* clamp(deltaSec * 5, 0.0, 1.0);
        this.currentScale += deltaMove;

        this.water.scale.set(this.currentScale,this.currentScale,this.currentScale);
        this.water.material.uniforms[ 'time' ].value += deltaSec;
    }

    public GetWater = () =>{
        return this.water;
    }

    public Yeet = (bShouldYeet : boolean) => {
        if(this.bAlive == !bShouldYeet) return;

        if(!bShouldYeet){
            this.water.visible = true;
            this.bAlive = !bShouldYeet;
            this.desireScale = 1;
            return;
        }else{
            this.desireScale = 0;
        }

        setTimeout(() => {
            this.bAlive = !bShouldYeet;
            this.water.visible = !bShouldYeet;
            this.currentScale = 0;
        }, 500);
    }

}