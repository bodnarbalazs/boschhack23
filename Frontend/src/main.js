import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader';
import { createScene } from './scene.js'
import { createCity } from './city.js'

let animationAllowed = false //this is a flag to stop the animation loop

const mapChuncks = [
    {turn: null, length: 20},
    {turn: "left", length: 10},
    {turn: "left", length: 15}
]

function animate(render, scene, camera, city, frameCount) {
    if(!animationAllowed) 
        return

    // console.log(`Frame: ${frameCount}`) //logging the frame count to the console

    city.position.z -= 0.1
    
    render.render(scene, camera)
    setTimeout(() => {
        requestAnimationFrame(() => animate(render, scene, camera, city, ++frameCount))
    }, 1000 / 10);
}


window.onload = () => {
    let { scene, camera, render} = createScene()
    scene.add(new THREE.DirectionalLight(0xffffff, 1))

    let city = createCity(mapChuncks, scene)
    scene.add(city)

    const loader = new OBJLoader();
    loader.load('./objects/car1.obj', function (obj) {
        // Create a mesh from the loaded object
        // const mesh = new THREE.Mesh(obj.children[0].geometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
        // Add the mesh to the scene
        obj.position.set(0, 0, 0)
        obj.scale.set(0.02, 0.02, 0.02)
        obj.rotateY(Math.PI / 2)
        obj.position.x -= 1.3
        obj.position.z -= 5
        obj.position.y += 0.2
        scene.add(obj);
    });


    camera.position.y = 3;
    camera.position.z = -10;
    camera.position.x = -1;
    camera.rotateY(Math.PI)
    camera.rotateX(-Math.PI / 15)
    //camera.rotateX(-Math.PI / 2)

    animationAllowed = true
    animate(render, scene, camera, city, 0)
}