import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader';
import { createScene } from './scene.js'
import { createCity } from './city.js'

let animationAllowed = false //this is a flag to stop the animation loop
let status = "success" //this is the status of the speed process bar, it can be "danger", "warning" or else

const speedProcess = document.querySelector(".progress div")
const speedNumber = document.querySelector(".speed span b")

function updateSpeedData(speed, status){
    //Status can be "danger", "warning" or else
    speedNumber.textContent = Math.ceil(speed)
    speedProcess.setAttribute("aria-valuenow", speed/50*100)
    speedProcess.style.width = `${speed/50*100}%`

    if(status == "danger"){
        speedProcess.classList.add("bg-danger")
        speedProcess.classList.remove("bg-success")
        speedProcess.classList.remove("bg-warning")
    }
    else if(status == "warning"){
        speedProcess.classList.add("bg-warning")
        speedProcess.classList.remove("bg-success")
        speedProcess.classList.remove("bg-danger")
    }
    else{
        speedProcess.classList.add("bg-success")
        speedProcess.classList.remove("bg-danger")
        speedProcess.classList.remove("bg-warning")
    }
}


async function loadDatas(){
    const response = await fetch("./data/combined_datasets.json")
    if(!response.ok)
        throw new Error("Error while fetching data")
    const data = await response.json()
    return data
}


function animate(render, scene, camera, city, frameCount) {
    if(!animationAllowed) 
        return

    // console.log(`Frame: ${frameCount}`) //logging the frame count to the console

    city.position.z -= datas.datasetNew_data[frameCount].VehicleSpeed / 12
    updateSpeedData(datas.datasetNew_data[frameCount].VehicleSpeed * 3.6, status)


    let mainCar = getActor("mainCar", scene)
    if(mainCar){
        mainCar.rotateY(datas.datasetNew_data[frameCount].YawRate / 12)
        camera.rotateY(datas.datasetNew_data[frameCount].YawRate / 12)

        if(datas.datasetNew_data[frameCount].Break == 1){
            status = "warning"
            setTimeout(() => {
                animationAllowed = false
                updateSpeedData(0, "danger")
            }, 1000)
        }
    }


    let actor1 = getActor(window.actors[0].name, window.actors[0].scene)
    if(actor1){
        console.log(actor1.position.x, actor1.position.z)
        actor1.position.set(datas.datasetNew_data[frameCount].FirstObjectDistance_Y-3, 0.25,  datas.datasetNew_data[frameCount].FirstObjectDistance_X)
        actor1.rotateY(Math.PI / 2)
    }

    let actor2 = getActor(window.actors[1].name, window.actors[1].scene)
    if(actor2){
        console.log(actor2.position.x, actor2.position.z)
        actor2.position.set(datas.datasetNew_data[frameCount].SecondObjectDistance_Y-3, 0.25,  datas.datasetNew_data[frameCount].SecondObjectDistance_X)
        actor2.rotateY(Math.PI / 2)
    }

    let actor3 = getActor(window.actors[2].name, window.actors[2].scene)
    if(actor3){
        console.log(actor3.position.x, actor3.position.z)
        actor3.position.set(datas.datasetNew_data[frameCount].ThirdObjectDistance_Y-3, 0.25,  datas.datasetNew_data[frameCount].ThirdObjectDistance_X)
        actor3.rotateY(Math.PI / 2)
    }

    let actor4 = getActor(window.actors[3].name, window.actors[3].scene)
    if(actor4){
        console.log(actor4.position.x, actor4.position.z)
        actor4.position.set(datas.datasetNew_data[frameCount].FourthObjectDistance_Y-3, 0.25,  datas.datasetNew_data[frameCount].FourthObjectDistance_X)
        actor4.rotateY(Math.PI / 2)
    }
    
    render.render(scene, camera)
    setTimeout(() => {
        requestAnimationFrame(() => animate(render, scene, camera, city, ++frameCount))
    }, 1000 / 10);
}

window.addEventListener("load", async () => {
    window.datas = await loadDatas()
    console.log(datas)

    let { scene, camera, render} = createScene()
    scene.add(new THREE.DirectionalLight(0xffffff, 1))

    let city = createCity(datas.datasetMap, scene)
    scene.add(city)

    //creating actors
    window.actors = []
    createMainCar(scene)
    scene = addActor("car", "car1", scene, datas.datasetNew_data[0].FirstObjectDistance_Y-3, 0.25,  datas.datasetNew_data[0].FirstObjectDistance_X, 1)
    scene = addActor("car", "car2", scene, datas.datasetNew_data[0].SecondObjectDistance_Y-3, 0.25,  datas.datasetNew_data[0].SecondObjectDistance_X, 1)
    scene = addActor("car", "car3", scene, datas.datasetNew_data[0].ThirdObjectDistance_Y-3, 0.25,  datas.datasetNew_data[0].ThirdObjectDistance_X, 1)
    scene = addActor("car", "car4", scene, datas.datasetNew_data[0].FourthObjectDistance_Y-3, 0.25,  datas.datasetNew_data[0].FourthObjectDistance_X, 1)

    camera.position.y = 3;
    camera.position.z = -5;
    camera.position.x = -1;
    camera.rotateY(Math.PI)
    camera.rotateX(-Math.PI / 15)
    // camera.rotateX(-Math.PI / 2)

    animationAllowed = true
    animate(render, scene, camera, city, 0)
})


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
    window.actors.push({name, scene})

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

    return scene
}


function getActor(name, scene){
    return scene.getObjectByName(name)
}