import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const size = 50;
const division = 100;

const gridHelper = new THREE.GridHelper(size, division);

const scene = new THREE.Scene();
scene.add(gridHelper);
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
document.body.appendChild(renderer.domElement);

camera.position.setZ(20);
camera.position.setX(0);
camera.position.setY(80);
control.update();
renderer.render(scene, camera);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../public/rock-wall-mortar_ao.png");
const textureDepth = textureLoader.load(
  "../public/rock-wall-mortar_normal-ogl.png"
);

const sunGeometry = new THREE.SphereGeometry(5, 32, 16);
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

// write a function to create different plantets

function createPlanet(radius, distance, color, speed) {
  const geometry = new THREE.SphereGeometry(radius, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color });
  const planet = new THREE.Mesh(geometry, material);

  const orbit = new THREE.Group();
  orbit.add(planet);
  planet.position.x = distance;
  scene.add(orbit);

  return { planet, orbit, speed };
}
const earth = createPlanet(1.5, 15, 0x0000ff, 0.01);
const mars = createPlanet(1.2, 10, 0xff0000, 0.008);

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.005;
  //
  earth.orbit.rotation.y += earth.speed;
  mars.orbit.rotation.y += mars.speed;

  control.update();
  renderer.render(scene, camera);
}
animate();
// 6. Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
