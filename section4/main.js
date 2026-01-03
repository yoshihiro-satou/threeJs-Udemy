import * as THREE from'./build/three.module.js';

let scene, camera;

// 市０んを追加
scene = new THREE.Scene();

// カメラを追加
camera = new THREE.PerspectiveCamara(
  50,
  windew.innerwidth / window.innerHeight,
  0.1,
  1000
)
