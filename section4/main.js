import * as THREE from'../build/three.module.js';
import { OrbitControls } from "../jsm/controls/OrbitControls.js";
let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", init);

function init() {
  // シーンを追加
  scene = new THREE.Scene();

  // カメラを追加
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 500)

  // レンダラーを追加
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild(renderer.domElement);

  // テクスチャを追加しよう
  let textures = new THREE.TextureLoader().load('../textures/earth.jpg')

  // ジオメトリを作成
  let babllGeometry = new THREE.SphereGeometry(100, 64, 32);
  // マテリアルを作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({map: textures});
  // メッシュ化してみよう
  let ballMesh = new THREE.Mesh(babllGeometry, ballMaterial);
  scene.add(ballMesh);

  //平行光源を追加し得てみよう
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight);


  // ポイント光源をつ追加してみよう
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-200, -200, -200)
  scene.add(pointLight);

  // マウス操作が出来るようにしよう
  controls = new OrbitControls(camera, renderer.domElement)
  // ポイント光源がどこにあるかを特定する
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  window.addEventListener("resize", onWindowResize)

  animate();
}

// ブラウザのリサイズに対応しよう
function onWindowResize() {
  // レンダラーのサイズを随時更新
  renderer.setSize(window.innerWidth,  window.innerHeight);

  // カメラのアスペクト比を正す
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}


function animate() {
  // ポイント光源を急の周りを巡回しよう
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500),
  );

  // レンダリングしてみよう
  renderer.render(scene, camera);
  requestAnimationFrame(animate)
}



