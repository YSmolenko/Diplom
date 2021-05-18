import * as THREE from "three";
import * as UTILS from "../utils"

export function render(ob) {
    let geometry = new THREE.SphereGeometry(
        ob.radius,
        30, 30,
        Math.PI * 2.00, Math.PI * 2.00,
        0, Math.PI * ob.theta);
    let object = UTILS.buildObject(geometry, ob.color)
    if (ob.pos != null) {
        ob.pos.rotateX += 180 // rotating from top to the bottom
        UTILS.positionObject(object, ob);
    }
    return object
}