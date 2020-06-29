
var config={//objeto literal llamado config uso de configuraciones
  width:  350,
  height: 500,
  scale: {
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH, /*ENVELOP,*/ /*RESIZE,*/
    autoCenter: Phaser.Scale.CENTER_BOTH,
    autoRound: true,

    min: {
      width:  350,
      height: 500,
    },
    max: {
      width:  1050,
      height: 1500,
    },
  },
  backgroundColor: 0xff00FF,
  scene: [Scene1,Start, Scene2, NewStage,End],
  physics:{
      default: "arcade",
      arcade: {
          debug: false
      }
  }


};

var game = new Phaser.Game(config);


//meter music = game.add.audio("music");
//music.play('',0,1,true)
