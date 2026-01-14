import * as THREE from 'three';

console.log(THREE);

const canvas = document.getElementById('canvas')
const scene = new THREE.Scene();
//sizes
const sizes = {
  width: innerWidth,
  height: innerHeight
};

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width /sizes.height,
  0.1,
  3000,
);
camera.position.set(0, 500, 1000);
scene.add(camera);

// rnderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.render(scene, camera);


