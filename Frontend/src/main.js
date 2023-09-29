import * as THREE from 'three'
import { createScene } from './scene.js'

let animationAllowed = false //this is a flag to stop the animation loop

function animate(render, scene, camera, frameCount = 0) {
    if(!animationAllowed) 
        return

    requestAnimationFrame(() => animate(render, scene, camera))
    render.render(scene, camera)
}


window.onload = () => {
    let { scene, camera, render} = createScene()


    animationAllowed = true
    animate(render, scene, camera)
}