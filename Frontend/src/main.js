import * as THREE from 'three'
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
    requestAnimationFrame(() => animate(render, scene, camera, city, ++frameCount))
}


window.onload = () => {
    let { scene, camera, render} = createScene()
    scene.add(new THREE.DirectionalLight(0xffffff, 1))

    let city = createCity(mapChuncks, scene)
    scene.add(city)

    camera.position.y = 3;
    camera.position.z = 0;
    camera.rotateX(-Math.PI / 8)

    animationAllowed = true
    animate(render, scene, camera, city, 0)
}