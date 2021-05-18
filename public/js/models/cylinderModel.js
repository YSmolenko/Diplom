import * as THREE from "three";
import * as UTILS from "../utils"

export function render(ob) {
    const geometry = new THREE.CylinderGeometry(
        ob.radiusTop, ob.radiusBottom, ob.height,
        ob.radialSegments, 20,
        ob.openEnded,
        Math.PI * 2.00, Math.PI * ob.thetaLength * 2);
    const object = UTILS.buildObject(geometry, ob.color)
    if (ob.pos != null) {
        UTILS.positionObject(object, ob);
    }
    return object
}