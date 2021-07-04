import * as THREE from 'three';

export class CubePartition {
    private allCubes : any[] = [];
    private paddings : number = 3;

    /**
     * @param amountOfCubes 1x1x1, 2x2x2, 3x3x3
     * @param size by cm
     */
    constructor(amountOfCubes : number = 3, size : number = 1) { 
        const offSet = (size * this.paddings);

        for(let x = 0; x < amountOfCubes; ++x){
            for(let y = 0; y < amountOfCubes; ++y){
                for(let z = 0; z < amountOfCubes; ++z){
                    const geometry = new THREE.BoxGeometry( size, size, size );
                    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                    const cube = new THREE.Mesh( geometry, material );
                    
                    const newPosition = new THREE.Vector3(x * size * this.paddings, y* size * this.paddings, z * size * this.paddings);
                    newPosition.setX(newPosition.x - offSet);
                    newPosition.setY(newPosition.y - offSet);
                    newPosition.setZ(newPosition.z - offSet);

                    cube.position.set(newPosition.x, newPosition.y, newPosition.z);

                    this.allCubes.push(cube);
                }
            }
        }
    }

    public GetCubes = () => {
        this.Debug();
        return this.allCubes;
    }

    private Debug = () => {
        this.allCubes.forEach((cube)=>{
            console.log(cube.position);
        });
    }
}