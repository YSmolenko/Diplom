import * as THREE from "three";
import * as UTILS from "../utils"

export function render(ob) {
    let geometry = new THREE.BoxGeometry( ob.width, ob.height, ob.depth );
    let object = UTILS.buildObject(geometry, ob.color)

    if (ob.pos != null) {
        UTILS.positionObject(object, ob);
    }
    return object
}