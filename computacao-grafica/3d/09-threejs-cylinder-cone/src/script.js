import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, light, cylinder, cone, controls;

window.onload = () => {
  init();
  animate();

  window.addEventListener("resize", onWindowResize, false);
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 1, 1).normalize();
  scene.add(light);

  cylinder = initCylinder();
  scene.add(cylinder);

  cone = initCone();
  scene.add(cone);

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
  cylinder.rotation.y += 0.01;
  cone.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

function initCylinder() {
  const geometry = new THREE.CylinderGeometry(5, 5, 20, 4);
  const material = new THREE.MeshPhongMaterial({ color: 0x2222ff });

  geometry.translate(8, 0, 0);
  cylinder = new THREE.Mesh(geometry, material);
  return cylinder;
}

function initCone() {
  const geometry = new THREE.ConeGeometry(5, 20, 4);
  const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });

  geometry.translate(-8, 0, 0);
  cone = new THREE.Mesh(geometry, material);
  return cone;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}