import THREE from 'three';
import Cube from './objects/Cube';
import './utils/OrbitControls.js';

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

    this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
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
