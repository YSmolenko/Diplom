import * as THREE from "three";
import * as UTILS from "../utils"

export function render(ob) {

    const ring1 = new THREE.RingGeometry(
        ob.innerRadius, ob.outerRadius,
        300, 5,
        Math.PI * 2.00, Math.PI * 2.00);
    const r1 = UTILS.buildObject(ring1, ob.color)
    r1.position.x = 0
    r1.position.y = 0
    r1.position.z = 0

    const r2 = UTILS.buildObject(ring1, ob.color)
    r2.position.x = 0
    r2.position.y = 0
    r2.position.z = ob.height

    const innerCylinder = new THREE.CylinderGeometry(
        ob.innerRadius, ob.innerRadius, ob.height,
        50, 50,
        true,
        Math.PI * 2.00, Math.PI * 2.00);
    const c1 = UTILS.buildObject(innerCylinder, ob.color)
    c1.position.x = 0
    c1.position.y = 0
    c1.position.z = ob.height / 2 // placing cylinder to 0 by Z axes
    c1.rotateX(THREE.Math.degToRad(90))
    c1.rotateY(THREE.Math.degToRad(0))
    c1.rotateZ(THREE.Math.degToRad(0))

    const outerCylinder = new THREE.CylinderGeometry(
        ob.outerRadius, ob.outerRadius, ob.height,
        50, 50,
        true,
        Math.PI * 2.00, Math.PI * 2.00);
    const c2 = UTILS.buildObject(outerCylinder, ob.color)
    c2.position.x = 0
    c2.position.y = 0
    c2.position.z = ob.height / 2 // placing cylinder to 0 by Z axes
    c2.rotateX(THREE.Math.degToRad(90))
    c2.rotateY(THREE.Math.degToRad(0))
    c2.rotateZ(THREE.Math.degToRad(0))

    const group = new THREE.Group();
    group.add( r1 );
    group.add( r2 );
    group.add( c1 );
    group.add( c2 );

    if (ob.pos != null) {
        UTILS.positionObject(group, ob);
    }

    return group
}