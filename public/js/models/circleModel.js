import * as THREE from "three";
import * as UTILS from "../utils"

export function render(ob) {
    const circle = new THREE.RingGeometry(
        ob.innerRadius, ob.outerRadius,
        300, 5,
        Math.PI * 2.00, Math.PI * 2.00);
    const obj = UTILS.buildObject(circle, ob.color)
    if (ob.pos != null) {
        UTILS.positionObject(obj, ob);
    }
    return obj
}