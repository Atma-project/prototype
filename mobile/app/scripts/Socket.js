import io from 'socket.io-client';

export default class Socket {
  constructor() {
    console.log('socket');

    this.host = 'http://169.254.128.122:3000';
    this.socket = io( this.host );

    this.init();
  }

  init(){
    this.socket.on('newConnection', (data) => {
      console.log('Connected');
    });

    this.socket.on('disconnect',() => {
      console.log('disconnect');
    });

    window.addEventListener('devicemotion', (e) => {
      var x = e.acceleration.x;
      var y = e.acceleration.y;
      var z = e.acceleration.z;

      this.socket.emit('acceleration', {'x':x, 'y':y, 'z':z});
    }, false);

    window.addEventListener('click', (e) => {
      this.socket.emit('click', 'click');
    }, false);
  }
}
