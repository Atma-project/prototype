/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 * See https://babeljs.io/docs/learn-es2015/ for info on ES6
 */

import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';

import App from './Main';
import Const from './utils/Const';

let app = new App();
app.init();

let webgl;
let gui;

// webgl settings
webgl = new Webgl(window.innerWidth, window.innerHeight);
document.body.appendChild(webgl.renderer.domElement);

//GUI settings
gui = new dat.GUI();
gui.add(webgl.params, 'usePostprocessing');

// handle resize
window.addEventListener('resize', resizeHandler);

// let's play !
animate();

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  raf(animate);
  webgl.render();
}
