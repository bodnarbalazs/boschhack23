import * as THREE from 'three'
import { createScene } from './scene.js'
import { createCity } from './city.js'

let animationAllowed = false //this is a flag to stop the animation loop

const mapChuncks = [
    {turn: null, length: 10},
    {turn: "right", length: 5},
    {turn: "left", length: 15},
    {turn: "left", length: 20},
    {turn: "right", length: 2}
]

function animate(render, scene, camera, frameCount = 0) {
    if(!animationAllowed) 
        return

    // console.log(`Frame: ${frameCount}`) //logging the frame count to the console

    
    render.render(scene, camera)
    requestAnimationFrame(() => animate(render, scene, camera, ++frameCount))
}


window.onload = () => {
    let { scene, camera, render} = createScene()

    scene = createCity(mapChuncks, scene)

    camera.position.y = 1.5;
    camera.position.z = 0;

    camera.lookAt(0, 0, 5)

    animationAllowed = true
    animate(render, scene, camera)
}