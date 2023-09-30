import * as THREE from 'three'

export function createCity(mapChuncks, scene){
    let position = {x: 0, y: 0, z: 0}
    let prevChunckDirection = null

    console.log(mapChuncks)

    let road = new THREE.Group();

    for(let chunk of mapChuncks){
        chunk.direction = getDirection(prevChunckDirection, chunk.turn)
        chunk.start = {
            x: position.x,
            y: position.y,
            z: position.z
        }

        for(let i = 0; i < chunk.length; i++){
            if(i == 0 && chunk.turn != null){
                let result = placeCrossRoad(position, chunk, road)
                position = result.position
                road = result.road
                chunk.start.position = {
                    x: position.x,
                    y: position.y,
                    z: position.z
                }
            }
                
            let geometry = new THREE.BoxGeometry( 6, 0.5, 1 );

            const textureLoader = new THREE.TextureLoader();
            const roadTexture = textureLoader.load('./textures/texture2.jpg');
            roadTexture.wrapS = THREE.RepeatWrapping;
            roadTexture.repeat.set(1, .3); 
            const roadMaterial = new THREE.MeshBasicMaterial({ map: roadTexture });
            let cube = new THREE.Mesh( geometry, roadMaterial );
            cube.position.set(position.x, position.y, position.z)
            

            if(chunk.direction === "forward"){
                position.z += 1
            }
            else if(chunk.direction === "right"){
                position.x -= 1
                cube.rotation.y = Math.PI/2
            }
            else if(chunk.direction === "left"){
                position.x += 1
                cube.rotation.y = Math.PI/2
            }
            else if(chunk.direction === "backward"){
                position.z -= 1
            }
            
            road.add( cube );
        }
        prevChunckDirection = chunk.direction
        chunk.end = {
            x: position.x,
            y: position.y,
            z: position.z
        }
    }

    let city = new THREE.Group()
    
    city = placePlain(position, city)
    city.add(road)

    return city
}

function getDirection(prevDirection, turn){
    // console.log(prevDirection, turn)
    if(prevDirection == null){
        return "forward"
    }
    if(prevDirection === "forward"){
        if(turn === "right"){
            return "right"
        }
        if(turn === "left"){
            return "left"
        }
    }
    if(prevDirection === "right"){
        if(turn === "right"){
            return "backward"
        }
        if(turn === "left"){
            return "forward"
        }
    }
    if(prevDirection === "left"){
        if(turn === "right"){
            return "forward"
        }
        if(turn === "left"){
            return "backward"
        }
    }
    if(prevDirection === "backward"){
        if(turn === "right"){
            return "left"
        }
        if(turn === "left"){
            return "right"
        }
    }
}


function placeCrossRoad(position, chunk, road){
    let geometry = new THREE.BoxGeometry( 6, 0.58, 6 );
    const textureLoader = new THREE.TextureLoader();
    const roadTexture = textureLoader.load('./textures/texture2_corner.jpg');
    roadTexture.wrapS = THREE.RepeatWrapping;
    roadTexture.repeat.set(1, 0.5); 
    const roadMaterial = new THREE.MeshBasicMaterial({ map: roadTexture });
    let cube = new THREE.Mesh( geometry, roadMaterial );
    cube.position.set(position.x, position.y, position.z)
    road.add( cube );

    if(chunk.direction === "forward"){
        position.z += 3
    }
    else if(chunk.direction === "right"){
        position.x -= 3
    }
    else if(chunk.direction === "left"){
        position.x += 3
    }
    else if(chunk.direction === "backward"){
        position.z -= 3
    }

    return {position, road}
}


function placePlain(position, city){
    let width = 1000
    let depth = 1000

    let geometry = new THREE.BoxGeometry( width, 0.5, depth );
    let material = new THREE.MeshBasicMaterial( {color: "wheat"} );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(0, -0.1, 0)
    city.add( cube );
    return city
}