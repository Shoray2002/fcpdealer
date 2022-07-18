import * as THREE from "three";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js";
let renderer, scene, camera, controls;
const loader = new GLTFLoader().setPath("./");
const params = {
  color: '#ffffff'
};
init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x23262a);
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(100, 150, 110);
  const gui = new GUI();
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xefefff, 1.5);
  dirLight.position.set(10, 10, 10);
  scene.add(dirLight);
  loader.load("theend2.glb", function (gltf) {
    let model = gltf.scene;
    model.scale.set(50, 50, 50);
    model.translateZ(70);
    model.translateY(-20);
    scene.add(model);
    gui.addColor(params, "color").onChange(function (value) {
      model.children[1].material.color.set(value);
    });
  });
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  controls = new OrbitControls(camera, renderer.domElement);
  // controls.addEventListener("change", render);
  controls.screenSpacePanning = true;
  // controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 50;
  controls.maxDistance = 400;
  controls.autoRotate = true;
  controls.autoRotationSpeed = 5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  render();
}
