import * as THREE from 'three'

export function createCity(mapChuncks, scene){
    let position = {x: 0, y: 0, z: 0}
    let prevChunckDirection = null

    console.log(mapChuncks)

    for(let chunk of mapChuncks){
        chunk.direction = getDirection(prevChunckDirection, chunk.turn)

        for(let i = 0; i < chunk.length; i++){
            if(i == 0 && chunk.turn != null){
                let result = placeCrossRoad(position, chunk, scene)
                position = result.position
                scene = result.scene
            }
                
            let geometry = new THREE.BoxGeometry( 6, 0.5, 1 );
            let material = new THREE.MeshBasicMaterial( {color: "gray"} );
            let cube = new THREE.Mesh( geometry, material );
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
            
            scene.add( cube );
        }
        prevChunckDirection = chunk.direction
    }

    console.log(position)

    scene = placePlain(position, scene)

    return scene
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


function placeCrossRoad(position, chunk, scene){
    let geometry = new THREE.BoxGeometry( 6, 0.5, 6 );
    let material = new THREE.MeshBasicMaterial( {color: "gray"} );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(position.x, position.y, position.z)
    scene.add( cube );

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

    return {position, scene}
}


function placePlain(position, scene){
    let width = 30
    let depth = 30

    let geometry = new THREE.BoxGeometry( width, 0.5, depth );
    let material = new THREE.MeshBasicMaterial( {color: "wheat"} );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(0, -0.1, depth/2-2)
    scene.add( cube );
    return scene
}