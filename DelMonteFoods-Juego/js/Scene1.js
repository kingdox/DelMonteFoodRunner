class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){ 

    this.load.image("background", "images/background.png");//Fondo
    this.load.image("bar", "images/bar.png");//Barra
    this.load.image("life", "images/life.png");//objeto vida
    this.load.image("endBG", "images/endBG.png");//Fondo


    //
    
    
    //
    this.load.spritesheet("LB1","images/spritesheets/LB1.png",{
    frameWidth: 175,
    frameHeight: 500,
    });
    this.load.spritesheet("RB1","images/spritesheets/RB1.png",{
    frameWidth: 175,
    frameHeight: 500,
    });
    //
    
    
    
    this.load.spritesheet("home", "images/spritesheets/home.png",{
      frameWidth: 350,
      frameHeight: 500
    });

    this.load.spritesheet("player", "images/spritesheets/player.png",{ //Personaje
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("dead", "images/spritesheets/muerte.png",{ //Personaje
      frameWidth: 50,
      frameHeight: 50
    });

    this.load.spritesheet("obstacle", "images/spritesheets/obstacle.png",{//Obstaculo(verduras)
      frameWidth: 50,
      frameHeight: 50
    });

    this.load.spritesheet("fruta", "images/spritesheets/fruta.png",{//Frutas(puntos)
      frameWidth: 50,
      frameHeight: 50
    });
    
    this.load.spritesheet("toxic", "images/spritesheets/toxic.png",{ //barra de toxicidad, va debajo de la de vida
      frameWidth: 250,
      frameHeight: 50
    });
    this.load.spritesheet("health", "images/spritesheets/health.png",{ //salud eff
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("veneno", "images/spritesheets/veneno.png",{ //salud eff
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet("win", "images/spritesheets/win.png",{ //salud eff
      frameWidth: 50,
      frameHeight: 50
    });

    //Botones
    this.load.spritesheet("button", "images/spritesheets/button.png",{ 
      frameWidth: 150,
      frameHeight: 75
    });



    this.load.spritesheet("DMR", "images/spritesheets/DMR.png",{ //DMR
      frameWidth: 375,
      frameHeight: 250
    });

    this.load.spritesheet("decor", "images/spritesheets/decor.png",{ //Personaje
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.spritesheet("gameOver", "images/spritesheets/gameOver.png",{ //Personaje
      frameWidth: 350,
      frameHeight: 100
    });

    this.load.spritesheet("opt", "images/spritesheets/options.png",{ //Personaje
      frameWidth: 250,
      frameHeight: 400
    });

    //FUENTE
    this.load.bitmapFont("pixelFont","font/font.png","font/font.xml");
  }
  create() { 
    
    this.scene.start("startGame");//a partir de aqui inicia la escena 2


    this.anims.create({
      key: "LB1_animado",
      frames: this.anims.generateFrameNumbers("LB1"),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: "RB1_animado",
      frames: this.anims.generateFrameNumbers("RB1"),
      frameRate: 15,
      repeat: 0
    });



    //PERSONAJES
    this.anims.create({
      key: "player1",
      frames: this.anims.generateFrameNumbers("player",{
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "player2",
      frames: this.anims.generateFrameNumbers("player",{
        start: 10,
        end: 19
      }),
      frameRate: 7,
      repeat: -1
    });
    //Muerte de personajes
    this.anims.create({
      key: "player1Dead",
      frames: this.anims.generateFrameNumbers("dead",{
        start: 0,
        end: 5
      }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "player2Dead",
      frames: this.anims.generateFrameNumbers("dead",{
        start: 6,
        end: 11
      }),
      frameRate: 3,
      repeat: -1
    });
    //CHUCHES
    this.anims.create({
      key: "hamburguesa",
      frames: this.anims.generateFrameNumbers("obstacle",{
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "papas",
      frames: this.anims.generateFrameNumbers("obstacle",{
        start: 4,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "doritos",
      frames: this.anims.generateFrameNumbers("obstacle",{
        start: 8,
        end: 11
      }),
      frameRate: 10,
      repeat: -1
    });
    //FRUTA
    this.anims.create({
      key: "uva",
      frames: this.anims.generateFrameNumbers("fruta",{
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "kiwi",
      frames: this.anims.generateFrameNumbers("fruta",{
        start: 4,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "cereza",
      frames: this.anims.generateFrameNumbers("fruta",{
        start: 8,
        end: 11
      }),
      frameRate: 10,
      repeat: -1
    });
    
    //BARRA TOXIC
    this.anims.create({
      key: "toxic",
      frames: this.anims.generateFrameNumbers("toxic"),
      frameRate: 10,
      repeat: -1
    });

    //buff&Debuff
    this.anims.create({
      key: "health",
      frames: this.anims.generateFrameNumbers("health"),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: true
    })
    this.anims.create({
      key: "veneno",
      frames: this.anims.generateFrameNumbers("veneno"),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: true
    })


    //home
    this.anims.create({
      key: "home",
      frames: this.anims.generateFrameNumbers("home"),
      frameRate: 5,
      repeat: -1
    });
    //options
    this.anims.create({
      key: "opt",
      frames: this.anims.generateFrameNumbers("opt"),
      frameRate: 15,
      repeat: 0
    });

    //win
    this.anims.create({
      key: "win",
      frames: this.anims.generateFrameNumbers("win",{
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "win2",
      frames: this.anims.generateFrameNumbers("win",{
        start: 8,
        end: 15
      }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: "DMR",
      frames: this.anims.generateFrameNumbers("DMR"),
      frameRate: 10,
      repeat: -1
    });
    //Buttons
    this.anims.create({
      key: "buttonJ",
      frames: this.anims.generateFrameNumbers("button",{
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: 0
    });

    
    this.anims.create({
      key: "buttonD",
      frames: this.anims.generateFrameNumbers("button",{
        start: 1,
        end: 1
      }),
      frameRate: 1,
      repeat: 0
    });
    this.anims.create({
      key: "buttonS",
      frames: this.anims.generateFrameNumbers("button",{
        start: 2,
        end: 2
      }),
      frameRate: 1,
      repeat: 0
    });


    this.anims.create({
      key: "gameOver",
      frames: this.anims.generateFrameNumbers("gameOver"),
      frameRate: 1,
      repeat: 0
    });

    //Decoraciones
    this.anims.create({
      key: "decor",
      frames: this.anims.generateFrameNumbers("decor",{
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: "decor1",
      frames: this.anims.generateFrameNumbers("decor",{
        start: 2,
        end: 4
      }),
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key: "decor2",
      frames: this.anims.generateFrameNumbers("decor",{
        start: 5,
        end: 7
      }),
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key: "decor3",
      frames: this.anims.generateFrameNumbers("decor",{
        start: 8,
        end: 10
      }),
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key: "decor4",
      frames: this.anims.generateFrameNumbers("decor",{
        start: 11,
        end: 14
      }),
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key: "decor5",
      frames: this.anims.generateFrameNumbers("decor",{
        start: 15,
        end: 16
      }),
      frameRate: 2,
      repeat: -1
    });
  }
  
  
}
