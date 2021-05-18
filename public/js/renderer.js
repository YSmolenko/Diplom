import * as THREE from 'three';
import {OrbitControls} from './controls'
import { buildFromFile, parse } from './parser'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
const controls = new OrbitControls( camera, renderer.domElement )

// adding UI elements
document.body.appendChild( renderer.domElement )

// creating lights
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight1.position.set(200, 500, 300);
scene.add(directionalLight1)
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight2.position.set(-200, -500, -300);
scene.add(directionalLight2)

// creating helpers
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper)

buildFromFile('../resources/box.json')
    .then((obj) => {
        obj.name = 'model'
        scene.add(obj)
    })

camera.position.set( 0, 0, 700 );
controls.update();

const animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};

export const createScene = function(file) {
    const objectName = 'model'

    scene.remove(scene.getObjectByName(objectName))

    const object = parse(JSON.parse(file))
    object.name = objectName
    scene.add(object)
}

window.createScene = createScene

animate();