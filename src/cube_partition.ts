import * as THREE from 'three';

export class CubePartition {
    private allCubes : any[] = [];

    /**
     * @param amountOfCubes 1x1x1, 2x2x2, 3x3x3
     * @param size by cm
     */
    constructor(amountOfCubes : number = 3, size : number = 1) {
        for(let x = 0; x < amountOfCubes; ++x){
            for(let y = 0; y < amountOfCubes; ++y){
                for(let z = 0; z < amountOfCubes; ++z){
                    const geometry = new THREE.BoxGeometry( size, size, size );
                    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                    const cube = new THREE.Mesh( geometry, material );
                    
                    cube.position.set(x * size , y* size , z * size );

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