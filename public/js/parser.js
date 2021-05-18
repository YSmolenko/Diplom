import {render as box} from "./models/boxModel"
import {render as cylinder} from "./models/cylinderModel"
import {render as ring} from "./models/ringModel"
import {render as circle} from "./models/circleModel"
import {render as sphere} from "./models/sphere"
import * as THREE from "three";
import * as UTILS from "./utils";

export async function buildFromFile(data) {
    return await fetch(data)
        .then(response => response.json())
        .then(jsonResponse => {
            return parse(jsonResponse)
        })
}

export function parse(json) {
    const group = new THREE.Group();
    console.log(json)
    for (const o in json) {
        console.log(o)
        let ob = json[o]
        if (ob.type === 'box') {
            group.add(box(ob))
        }
        if (ob.type === 'cylinder') {
            group.add(cylinder(ob))
        }
        if (ob.type === 'ring') {
            group.add(ring(ob))
        }
        if (ob.type === 'circle') {
            group.add(circle(ob))
        }
        if (ob.type === 'sphere') {
            group.add(sphere(ob))
        }
        if (ob.type === 'model') {
            const model = buildFromFile(ob.filePath)
            model.then(m => {
                if (ob.pos != null) {UTILS.positionObject(m, ob);
                }
                if (ob.color != null) {

                }
                group.add(m)
            })
        }
    }
    return group
}