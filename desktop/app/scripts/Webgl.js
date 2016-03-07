import THREE from 'three';
import Cube from './objects/cube';
import './utils/OrbitControls.js';
import 'gsap';

import WAGNER from '@superguigui/wagner';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({antialiasing: true});
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xFFFCF7);

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
    if (this.params.usePostprocessing) {
       this.composer = new WAGNER.Composer(this.renderer);

       this.vignette = new VignettePass();
       this.vignette.params.boost = 1.1;
       this.vignette.params.reduction = 0.54;

       this.bloomPass = new MultiPassBloomPass();
       this.bloomPass.params.blendMode = 6.8;
       this.bloomPass.params.blurAmount = 1.4;

       this.fxaa = new FXAAPass();
    }
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
      this.renderer.autoClearColor = true;
      this.composer.reset();
      this.composer.render(this.scene, this.camera);

      this.composer.pass(this.vignette);
      this.composer.pass(this.bloomPass);
      this.composer.pass(this.fxaa);

      this.composer.toScreen();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
    this.cube.update();
    this.controls.update();
  }
}
