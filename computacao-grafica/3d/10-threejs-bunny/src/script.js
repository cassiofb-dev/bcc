import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, light, bunny, controls;
const BUNNY_URL = "https://raw.githubusercontent.com/viisantos/trabsComputacaoGrafica/main/load_obj_Vitoria/bunny.obj";

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

  const loader = new OBJLoader();
  loader.load(BUNNY_URL, (obj) => {
    obj.scale.setScalar(64);
    scene.add(obj);
    bunny = obj;
  });

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
  if (bunny?.rotation?.y !== undefined) bunny.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}