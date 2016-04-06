// const spacebroClient = require('spacebro-client')
import spacebroClient from 'spacebro-client';

export default class Space {
  constructor() {
    console.log('space');
    this.init();
    this.getThings();
  }

  init(){
    var actionList = [
      {
        name: 'shoot',
        trigger: function (data) {
          console.log('SHOOOT !')
        }
      },
      {
        name: 'orientation',
        trigger: function (data) {
          console.log('orientation')
        }
      }
    ]

    spacebroClient.iKnowMyMaster('localhost', 8888)
    spacebroClient.registerToMaster(actionList, 'new-media')
  }

  getThings() {
    window.addEventListener('click', (e) => {
      spacebroClient.emit('shoot', {data: 'click'})
    }, false);

    window.addEventListener('deviceorientation', (e) => {

        if (e.absolute)
            console.log("référentiel terrestre");
        else
            console.log("référentiel appareil")

        var alpha = e.alpha;
        var beta = e.beta;
        var gamma = e.gamma;

        //spacebroClient.emit('orientation', {'alpha':alpha, 'beta':beta, 'gamma':gamma});
    }, false);
  }
}
