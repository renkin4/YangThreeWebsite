import * as THREE from 'three';

export class CubePartition {
    private allCubes : any[][][] = [];
    private paddings : number = 3;

    /**
     * @param amountOfCubes 1x1x1, 2x2x2, 3x3x3
     * @param size by cm
     */
    constructor(amountOfCubes : number = 3, size : number = 1) { 
        const offSet = (size * this.paddings);

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
                }
            }
        }
    }

    public Tick = (deltaSec : number) => {

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