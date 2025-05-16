import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById("solar-canvas"),
});

const control = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.setZ(30);
renderer.render(scene, camera);
//

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../public/rock-wall-mortar_ao.png");
const textureDepth = textureLoader.load(
  "../public/rock-wall-mortar_normal-ogl.png"
);

const sunGeometry = new THREE.SphereGeometry(15, 32, 16);
const sunMaterial = new THREE.MeshPhongMaterial({
  map: texture,
  emissiveMap: textureDepth,
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
const ambienLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);
scene.add(sun);

scene.add(pointLight, ambienLight);

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.x += 0.01;
  sun.rotation.y += 0.01;
  control.update();
  renderer.render(scene, camera);
}
animate();
