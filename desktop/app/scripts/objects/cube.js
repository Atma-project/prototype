import THREE from 'three';
let coord = null;

export default class Cube extends THREE.Object3D {
  constructor() {
    super();
    this.geom = new THREE.BoxGeometry(10, 10, 10);
    this.mat = new THREE.MeshBasicMaterial({
      color: 0x323FEF,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);
  }

  getCoord(data) {
    // console.log(data.x);
    coord = data;
  }

  update() {
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
    console.log(coord.x)
    if(coord) {
      this.position.x = coord.x;
    }
  }
}
