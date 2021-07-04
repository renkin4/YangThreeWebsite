import * as THREE from 'three';
import { clamp } from 'three/src/math/MathUtils';

export class CubePartition {
    private allCubes : any[][][] = [];
    private paddings : number = 1;
    private size : number;

    public desirePadding : number = 2;
    public interpSpeed : number = 1;

    public rotationSpeed : number = 0.5;
    public rotation : THREE.Vector3 = new THREE.Vector3(1,1,1);

    public root : THREE.Object3D;

    /**
     * @param amountOfCubes 1x1x1, 2x2x2, 3x3x3
     * @param size by cm
     */
    constructor(amountOfCubes : number = 3, size : number = 1) { 
        this.root = new THREE.Object3D();
        this.root.position.set(0,0,0);

        const offSet = (size * this.paddings);
        this.size = size;

        for(let x = 0; x < amountOfCubes; ++x){
            this.allCubes.push([]);
            for(let y = 0; y < amountOfCubes; ++y){
                this.allCubes[x].push([]);
                for(let z = 0; z < amountOfCubes; ++z){
                    const geometry = new THREE.BoxGeometry( size, size, size );
                    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                    const cube = new THREE.Mesh( geometry, material );
                    
                    const newPosition = new THREE.Vector3(x * size * this.paddings, y* size * this.paddings, z * size * this.paddings);
                    newPosition.setX(newPosition.x - offSet);
                    newPosition.setY(newPosition.y - offSet);
                    newPosition.setZ(newPosition.z - offSet);

                    cube.position.set(newPosition.x, newPosition.y, newPosition.z);

                    this.allCubes[x][y].push(cube);
                    this.root.add(cube);
                }
            }
        }
    }

    public Tick = (deltaSec : number) => {
        this.SetCubesPosition(deltaSec);
    }

    private SetCubesPosition = (deltaSec : number) =>{ 
        if(this.interpSpeed <= 0.0){
            this.paddings = this.desirePadding;
        }

        const dist = this.desirePadding - this.paddings;
        if(Math.abs(dist) < 0.01){
            this.paddings = this.desirePadding;
        }

        const deltaMove = dist * clamp(deltaSec* this.interpSpeed, 0.0, 1.0);
        this.paddings += deltaMove;
        
        this.root.rotation.set(this.root.rotation.x + (deltaSec*this.rotation.x), 
                                this.root.rotation.y + (deltaSec*this.rotation.y), 
                                this.root.rotation.z + (deltaSec*this.rotation.z));

        const offSet = (this.size * this.paddings);

        for (let x = 0; x < this.allCubes.length; x++) {
            for (let y = 0; y < this.allCubes[x].length; y++) {
                for (let z = 0; z < this.allCubes[x][y].length; z++) {
                    const element = this.allCubes[x][y][z] as THREE.Mesh;

                    const newPosition = new THREE.Vector3(x * this.size * this.paddings, y* this.size * this.paddings, z * this.size * this.paddings);
                    newPosition.setX(newPosition.x - offSet);
                    newPosition.setY(newPosition.y - offSet);
                    newPosition.setZ(newPosition.z - offSet);

                    element.position.set(newPosition.x, newPosition.y, newPosition.z);
                }
                
            }
            
        }
    }

    public GetRoot = () => {
        return this.root;
    }

    public GetCubes = () => {
        var cubesArr : any[] = [];

        for (let i = 0; i < this.allCubes.length; i++) {
            for (let j = 0; j < this.allCubes[i].length; j++) {
                const element = this.allCubes[i][j];
                cubesArr = cubesArr.concat(element);
            }
        }
        return cubesArr;
    }
}