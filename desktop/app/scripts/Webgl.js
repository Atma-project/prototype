import THREE from 'three';
import Cube from './objects/cube';
import './utils/OrbitControls.js';
import 'gsap';

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({antialiasing: true});
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xB6DCFE);

    this.composer = null;
    this.initPostprocessing();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
    this.cube.scale.set(0.01, 0.01, 0.01);
    this.scene.add(this.cube);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }
    /* Add the effect composer of your choice */
  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render(e) {
    if (this.params.usePostprocessing) {
      console.warn('WebGL - No effect composer set.');
    } else {
      this.renderer.render(this.scene, this.camera);
    }
    this.cube.update();
    this.controls.update();
  }
}
