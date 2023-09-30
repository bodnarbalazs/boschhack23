import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const render = new THREE.WebGLRenderer();

render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);



const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
camera.position.y = -2;

const points = []
points.push(new THREE.Vector3(-2, -2, 0))
points.push(new THREE.Vector3(-2, 2, 0))
points.push(new THREE.Vector3(2, 2, 0))
points.push(new THREE.Vector3(2, -2, 0))
points.push(new THREE.Vector3(-2, -2, 0))
const geometry2 = new THREE.BufferGeometry().setFromPoints(points)
const material2 = new THREE.LineBasicMaterial({ color: "blue" })
const line = new THREE.Line(geometry2, material2)
scene.add(line)


function trackObjectWithText(textObj, trackObj){
    const box = new THREE.Box3().setFromObject(trackObj)
    const position = new THREE.Vector3()
    const size = new THREE.Vector3()

    box.getSize(size)

    position.setFromMatrixPosition(trackObj.matrixWorld);
    size.x /= 2
    size.y /= 2
    position.add(size)
    position.project(camera);

    // let offset = new THREE.Vector3()
    // const Y = new THREE.Vector3(0, 1, 0)
    // offset.copy(trackObj.position)
    // offset.sub(camera.position)
    // offset.normalize()
    // offset.applyAxisAngle(Y, -Math.PI / 2)
    // offset.multiplyScalar(0.5)
    // position.add(offset)





    let widthHalf = window.innerWidth / 2;
    let heightHalf = window.innerHeight / 2;

    position.x = (position.x * widthHalf) + widthHalf + 10;
    position.y = -(position.y * heightHalf) + heightHalf;

    textObj.style.left = position.x + 'px';
    textObj.style.top = position.y + 'px';
}


function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function animate(frameIndex) {
    console.log(`Frame index: ${frameIndex}`)
    render.render(scene, camera);

    scene.background = new THREE.Color("green");

    line.material.color.set(getRandomColor())

    camera.position.y += 0.01;
    camera.position.x += 0.01;
    camera.position.z += 0.01;

    //camera.lookAt(0, 0, 0); //fixálni fogjuk a kamera nézetét a kocsira

    trackObjectWithText(document.querySelector(".objSpeed"), line)

    //set FPS
    let fps = 10
    setTimeout(() => {
        requestAnimationFrame(() => animate(frameIndex + 1));
    }, 1000 / fps);
}
animate(0)



window.addEventListener('resize', () => {
    render.setSize(window.innerWidth, window.innerHeight);
});