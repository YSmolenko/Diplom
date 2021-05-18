import * as THREE from "three";

export function positionObject(object, rawObject) {
    object.position.x = rawObject.pos.x
    object.position.y = rawObject.pos.y
    object.position.z = rawObject.pos.z
    object.rotateX(THREE.Math.degToRad(rawObject.pos.rotateX))
    object.rotateY(THREE.Math.degToRad(rawObject.pos.rotateY))
    object.rotateZ(THREE.Math.degToRad(rawObject.pos.rotateZ))
}

export function buildObject(geometry, color= '0xFF0000') {
    const material = new THREE.MeshStandardMaterial( { color } );
    material.side = THREE.DoubleSide
    return new THREE.Mesh( geometry, material );
}