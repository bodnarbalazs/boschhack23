import * as THREE from 'three'
import { createScene } from './scene.js'
import { createCity } from './city.js'

let animationAllowed = false //this is a flag to stop the animation loop

const mapChuncks = [
    //minta
    {turn: null, length: 20},
    {turn: "left", length: 10},
    {turn: "left", length: 15}
]

//itt frissítünk
function animate(render, scene, camera, city, frameCount) {
    if(!animationAllowed) 
        return

    // console.log(`Frame: ${frameCount}`) //logging the frame count to the console

    city.position.z -= 0.1
    
    render.render(scene, camera)
    requestAnimationFrame(() => animate(render, scene, camera, city, ++frameCount))
}


function setup() {
    let { scene, camera, render} = createScene()
    scene.add(new THREE.DirectionalLight(0xffffff, 1))

    let city = createCity(mapChuncks, scene)
    city.name="city" //scene-ben keressük city.rotateY(rad)
    //ezt kell forgatni, ha úgy van
    scene.add(city)

    camera.position.y = 3;
    camera.position.z = 0;
    camera.rotateX(-Math.PI / 8)
    
    createMainCar(scene);
    //xyz változási mértéke, nem az, hogy hova teszi
    //alapból 0-ba teszi le
    addActor("kid","kid1",city,)

    animationAllowed = true
    animate(render, scene, camera, city, 0)
}
window.setup = setup;
function createMainCar(scene){
    const loader = new OBJLoader();

    loader.load('./objects/car1.obj', function (obj) {
        obj.position.set(0, 0, 0)
        obj.scale.set(0.02, 0.02, 0.02)
        obj.rotateY(Math.PI / 2)
        obj.position.x -= 1.3
        obj.position.z -= 0
        obj.position.y += 0.2
        obj.name = "mainCar"

        scene.add(obj);
    });
}

function addActor(type, name, scene, x = 0, y = 0, z = 0, r = 0){
    const loader = new OBJLoader();

    if(type === "kid"){
        loader.load('./objects/kid.obj', function (obj) {
            obj.position.set(0, 0, 0)
            obj.scale.set(0.35,0.35,0.35)
            obj.rotateY(Math.PI / r)
            obj.position.x += x
            obj.position.z += z
            obj.position.y += y
            obj.name = name

            scene.add(obj);
        });
    }
    else if(type==="mother"){
        loader.load('./objects/mother.obj', function (obj) {
            obj.position.set(0, 0, 0)
            obj.scale.set(0.01,0.01,0.01)
            obj.rotateY(Math.PI / r)
            obj.position.x += x
            obj.position.z += z
            obj.position.y += y
            obj.name = name

            scene.add(obj);
        });
    }
    else if(type==="car"){
        loader.load('./objects/car1.obj', function (obj) {
            obj.position.set(0, 0, 0)
            obj.scale.set(0.01,0.01,0.01)
            obj.rotateY(Math.PI / r)
            obj.position.x += x
            obj.position.z += z
            obj.position.y += y
            obj.name = name

            scene.add(obj);
        });
    }
}
//megvan az elem, tudjuk állítani, hogy mi hol lesz
function getActor(scene,name){
   return scene.children.find(child=>child.name==name)[0];
}

async function loadJson(){
    const res=await fetch("../Assets/CityMap.json")
    if(res.status==200) return await(res.json);
}