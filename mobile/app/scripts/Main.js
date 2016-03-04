/**
 * scripts/main.js
 *
 * This is a sample CommonJS module.
 * Take a look at http://browserify.org/ for more info
 */

import io from 'socket.io-client';

export default class Main {

  connectToWebSocket () {
    this.socket = io('http://localhost:3000');
    console.log('connected to socket');

    window.addEventListener('devicemotion', (e) => {
      console.log(e);
      var x = e.accelerationIncludingGravity.x;
      var y = e.accelerationIncludingGravity.y;
      var z = e.accelerationIncludingGravity.z;

      // send data over the socket
      this.socket.emit('acceleration', {'x':x, 'y':y, 'z':z});
    }, false);

    window.addEventListener('click', (e) => {
      console.log('click');

      this.socket.emit('click', 'click');
    }, false);
  }
}
