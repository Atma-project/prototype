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
import Const from './utils/Const';
import Socket from './Socket';


// new socket
let socket = new Socket();

// webgl settings
let webgl = new Webgl(window.innerWidth, window.innerHeight);
document.body.appendChild(webgl.renderer.domElement);

//GUI settings
let gui = new dat.GUI();
gui.add(webgl.params, 'usePostprocessing');
// gui.add(webgl.vignette.params, 'boost' ).min(0).max(10);
// gui.add(webgl.vignette.params, 'reduction' ).min(0).max(10);
//
// gui.add(webgl.bloomPass.params, 'blendMode' ).min(0).max(10);
// gui.add(webgl.bloomPass.params, 'blurAmount' ).min(0).max(10);

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
