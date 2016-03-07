import THREE from 'three';
import '../utils/OBJLoader.js';
const glslify = require('glslify');
let start = Date.now();
let coord = null;
let clickedData = null;
let loadedObject;
let material;

export default class Cube extends THREE.Object3D {
  constructor() {
    super();

    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };

    this.manager.onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };

    this.manager.onError = function ( xhr ) {
      console.log('error');
    };

    material = new THREE.ShaderMaterial( {
        uniforms: {
            tSnow: {
                type: "t",
                value: THREE.ImageUtils.loadTexture( './assets/images/texture.jpg' )
            },
            time: {
                type: "f",
                value: 0.0
            },
            move: {
              type: "f",
              value: 0.0
            },
            ice: {
              type: "f",
              value: 0.0
            },
            space: {
              type: "f",
              value: 0.0
            }
        },
        vertexShader: glslify('../shaders/vertex.glsl'),
        fragmentShader: glslify('../shaders/fragment.glsl')
    });

    var self = this;

    this.loader = new THREE.OBJLoader( this.manager );
    this.loader.load( './assets/3d/heart.obj', function ( object ) {
      loadedObject = object;

      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          child.material = material;
          child.material.uniforms.needsUpdate = true;
          child.geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );
          child.geometry.verticesNeedUpdate = true;
        }
      });
      self.add(loadedObject);
    }, this.manager.onProgress, this.manager.onError );
  }

  getClick(data) {
    clickedData ^= true;

    if (clickedData) {
      TweenMax.to(material.uniforms.ice, 1, {value: 10.0, ease: Power2.easeOut});
      TweenMax.to(material.uniforms.space, 1, {value: 500.0, ease: Power2.easeOut});
    } else {
      TweenMax.to(material.uniforms.ice, 1, {value: 0.0, ease: Power2.easeOut});
      TweenMax.to(material.uniforms.space, 1, {value: 0.0, ease: Power2.easeOut});
    }
  }

  getCoord(data) {
    // console.log(data.x);
    coord = data;
  }

  update() {
    material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
    //console.log(coord.x)
    if(coord) {
      // this.position.x = coord.x * 10;
      // this.position.y = -coord.y * 10;

      // this.rotation.x = coord.y / 10;
      // this.rotation.y = -coord.x / 10;

    }
    if (loadedObject) {
      loadedObject.rotation.x += 0.001;
      loadedObject.rotation.y += 0.001;
    }
  }
}
