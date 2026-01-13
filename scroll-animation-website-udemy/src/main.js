import './style.css'
import * as THREE from 'three';

// canvas
const canvas = document.querySelector('#webgl');

// シーン
const scene = new THREE.Scene();


// 背景用のテクスチャ
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load("bg/bg.jpg");
scene.background = bgTexture;
// サイズ
const sizes = {
  width: innerWidth,
  height: innerHeight
}

// カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

// レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);


// オブジェクトを作成
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, -15);
box.rotation.set(1, 1, 0);

const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const tourusMaterial = new THREE.MeshNormalMaterial();
const tourus = new THREE.Mesh(torusGeometry, tourusMaterial);
tourus.position.set(0, 1, 10);

scene.add(box, tourus);

// 線系保管で滑らかに移動させる
function lerp(x, y, a) {
  return (1-a) * x + a * y;
};

function scalePersent(start, end) {
  return (scrollParcent - start) / (end - start);
};


// スクロールアニメーション
const animationScript = [];

animationScript.push({
  start: 0,
  end: 40,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.position.z = lerp(-15, 2, scalePersent(0, 40))
    tourus.position.z = lerp(10, -22, scalePersent(0, 40))
  }
});

// アニメーションを開始
function playScrollAnimation() {
  animationScript.forEach((animation) => {
    if(scrollParcent >= animation.start && scrollParcent < animation.end)
    animation.function();
  } )
};

// ブラウザのスクロール率を取得

let scrollParcent = 0;

document.body.onscroll = () => {
  scrollParcent =
  (document.documentElement.scrollTop /
    (document.documentElement.scrollHeight -
    document.documentElement.clientHeight)) * 100;

    console.log(scrollParcent);
}


// アニメーション
const tick = ()  => {
  window.requestAnimationFrame(tick);
  playScrollAnimation();

  renderer.render(scene, camera);
}

tick();

// ブラウザのリサイズ操作
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})
