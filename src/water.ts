import * as THREE from "three";
import { Water } from 'three/examples/jsm/objects/Water';
import WaterTexture from './textures/waternormals.jpg';

export class YangWater{
    private waterGeometry : THREE.PlaneGeometry;
    private water : Water;

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
        this.water.material.uniforms[ 'time' ].value += deltaSec;
    }

    public GetWater = () =>{
        return this.water;
    }

}