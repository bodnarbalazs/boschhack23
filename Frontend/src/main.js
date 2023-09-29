import * as THREE from 'three'
import { createScene } from './scene.js'

let animationAllowed = false //this is a flag to stop the animation loop

function animate(render, scene, camera, frameCount = 0) {
    if(!animationAllowed) 
        return

    console.log(`Frame: ${frameCount}`) //logging the frame count to the console

    
    render.render(scene, camera)
    requestAnimationFrame(() => animate(render, scene, camera, ++frameCount))
}


window.onload = () => {
    let { scene, camera, render} = createScene()


    animationAllowed = true
    animate(render, scene, camera)
}