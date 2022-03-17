import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, light, earth, cloud, controls;

window.onload = () => {
  init();
  animate();

  window.addEventListener("resize", onWindowResize, false);
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, 1).normalize();
  scene.add(light);

  earth = initEarth();
  scene.add(earth);

  cloud = initCloud();
  scene.add(cloud);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 100;

  camera.position.z = 20;
}

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.01;
  cloud.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}

function initEarth() {
  const geometry = new THREE.SphereGeometry(8, 32, 32);
  const loader = new THREE.TextureLoader();
  const earthTexture = loader.load("https://i.imgur.com/5Kde8zA.jpg");
  const earthBumpTexture = loader.load("https://i.imgur.com/sB1hQ4u.jpg");
  const earthSpecularTexture = loader.load("https://i.imgur.com/5ngEzAc.jpg");
  const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: earthBumpTexture,
    specularMap: earthSpecularTexture,
    specular: 0x222222,
  });

  earth = new THREE.Mesh(geometry, material);

  return earth;
}

function initCloud() {
  const geometry = new THREE.SphereGeometry(8.05, 32, 32);
  const loader = new THREE.TextureLoader();
  const cloudTexture = loader.load("https://i.imgur.com/8xn2Gb6.jpg");
  const material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    side: THREE.DoubleSide,
    opacity: 0.4,
    transparent: true,
    depthWrite: false,
  });

  cloud = new THREE.Mesh(geometry, material);

  return cloud;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}