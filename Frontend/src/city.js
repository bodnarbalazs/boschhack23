import * as THREE from 'three'

export function createCity(mapChuncks, scene){
    const position = {x: 0, y: 0, z: 0}
    let prevChunckDirection = null

    console.log(mapChuncks)

    for(let chunk of mapChuncks){
        chunk.direction = getDirection(prevChunckDirection, chunk.turn)

        for(let i = 0; i < chunk.length; i++){
            let geometry = new THREE.BoxGeometry( 1, 0.5, 1 );
            let material = new THREE.MeshBasicMaterial( {color: "gray"} );
            let cube = new THREE.Mesh( geometry, material );
            cube.position.set(position.x, position.y, position.z)
            scene.add( cube );
        
            console.log(chunk.length, chunk.direction, position)

            if(chunk.direction === "forward"){
                position.z += 1
            }
            else if(chunk.direction === "right"){
                position.x -= 1
            }
            else if(chunk.direction === "left"){
                position.x += 1
            }
            else if(chunk.direction === "backward"){
                position.z -= 1
            }   
        }
        prevChunckDirection = chunk.direction
    }

    return scene
}

function getDirection(prevDirection, turn){
    console.log(prevDirection, turn)
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