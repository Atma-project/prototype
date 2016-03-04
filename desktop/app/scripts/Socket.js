import io from 'socket.io-client';

export default class Socket {
  constructor() {
    console.log('socket');

    this.host = 'http://localhost:3000/';
    this.socket = io( this.host );

    this.init();
  }

  init(){
    this.socket.on('newConnection', (data) => {
      console.log('Connected');
    });

    this.socket.on('event', (data) => {
      console.log('event');
    });

    this.socket.on('disconnect',() => {
      console.log('disconnect');
    });
  }
}
