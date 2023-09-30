// import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader'

export function createMainCar(){
    const loader = new OBJLoader();

    const car = loader.load('./objects/car1.obj', function (obj) {
        // Create a mesh from the loaded object
        // const mesh = new THREE.Mesh(obj.children[0].geometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
        // Add the mesh to the scene
        obj.position.set(0, 0, 0)
        obj.scale.set(0.02, 0.02, 0.02)
        obj.rotateY(Math.PI / 2)
        obj.position.x -= 1.3
        obj.position.z -= 0
        obj.position.y += 0.2
        
        return obj
    });

    console.log(car)

    return car
}