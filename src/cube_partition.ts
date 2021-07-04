import * as THREE from 'three';
import { clamp } from 'three/src/math/MathUtils';

export class CubePartition {
    private allCubes : any[][][] = [];
    private paddings : number = 1;
    private size : number;

    public desirePadding : number = 2;
    public interpSpeed : number = 1;

    public rotationSpeed : number = 0.75;
    public rotation : THREE.Vector3 = new THREE.Vector3(1,1,1);

    public root : THREE.Object3D;

    private accumulatedTime : number = 0;
    private cacheTime : number = 0; 
    private triggerNewAnim : number = 5;

    private bAlive : boolean = true;

    private paddingPattern : number[] = [
        2, 1, 3, 5, 1, 7, 1, 3 , 2
    ];
    private currentPattern : number = 0;

    /**
     * @param amountOfCubes 1x1x1, 2x2x2, 3x3x3
     * @param size by cm
     */
    constructor(amountOfCubes : number = 3, size : number = 1, material : THREE.Material) { 
        this.root = new THREE.Object3D();
        this.root.position.set(0,0,0);

        this.desirePadding = this.paddingPattern[0];

        const offSet = (size * this.paddings);
        this.size = size;

        for(let x = 0; x < amountOfCubes; ++x){
            this.allCubes.push([]);
            for(let y = 0; y < amountOfCubes; ++y){
                this.allCubes[x].push([]);
                for(let z = 0; z < amountOfCubes; ++z){
                    const geometry = new THREE.BoxGeometry( size, size, size ); 
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
        if(!this.bAlive) return;

        this.accumulatedTime += deltaSec;
        this.SetCubesPosition(deltaSec);
        if(this.cacheTime + this.triggerNewAnim < this.accumulatedTime){
            this.SwitchPattern();
        }
    }

    public SwitchPattern = () => {
        this.cacheTime = this.accumulatedTime;

        this.desirePadding = this.paddingPattern[this.currentPattern % this.paddingPattern.length];
        this.currentPattern++;
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
        
        this.root.rotation.set(this.root.rotation.x + (this.rotationSpeed* deltaSec*this.rotation.x), 
                                this.root.rotation.y + (this.rotationSpeed* deltaSec*this.rotation.y), 
                                this.root.rotation.z + (this.rotationSpeed* deltaSec*this.rotation.z));

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

    public Yeet = (bShouldYeet) => {
        if(this.bAlive == !bShouldYeet) return;

        if(bShouldYeet){
            this.desirePadding = 50;
        }else{
            this.desirePadding = this.paddingPattern[this.currentPattern];
        }

        setTimeout(() => {
            this.bAlive = !bShouldYeet;     
            this.root.traverse(function(child){
                child.visible = !bShouldYeet;
            });       
        }, 500);
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