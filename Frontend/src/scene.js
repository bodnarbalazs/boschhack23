import * as THREE from 'three';

export function createScene(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    const render = new THREE.WebGLRenderer();

    scene.background = new THREE.Color("lightblue");
    render.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(render.domElement);

    //update camera aspect and canvas size on window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        render.setSize(window.innerWidth, window.innerHeight);
    })

    return {scene, camera, render}
}