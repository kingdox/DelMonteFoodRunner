var button;


class Start extends Phaser.Scene {
    constructor() {
      super("startGame");
    }
  create(){ 
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.home = this.add.sprite(0, 0, "home").setDepth(1).setInteractive().setOrigin(0, 0).play("home");
    this.DMR = this.add.sprite(-10, 0, "DMR").setDepth(1);
    this.DMR.setOrigin(0, 0);
    this.DMR.play("DMR");
    
    


    this.button1 = this.add.sprite(config.width - 150, config.height - 75, "button").setDepth(4).setInteractive();
    this.button1.setOrigin(0, 0);
    this.button1.play("buttonJ");
      
    this.button1.on('pointerdown',() => {
      this.jugar();
    });

    this.button2 = this.add.sprite(0, config.height - 75, "button").setDepth(4).setInteractive();
    this.button2.setOrigin(0, 0);
    this.button2.play("buttonD");

    this.button2.on('pointerdown',() => {
      if (this.ask[2]) {
        this.clearHow();
      }else{this.howTo();
      }
    });

    this.ask= [false,false,false];


    this.obs1;
    this.obs2;
    this.obs3;
    this.fru1;
    this.fru2;
    this.fru3;
    this.scoreLabel;


  }


  update(){
    // this.efecto.tilePositionX -= 0.1 ;
    // this.efecto.tilePositionY -= 0.1 ;
  
    this.elegir();
    if (!this.ask[2]) {   //solo le puedes dar 1 vez
      if (this.ask[1]) {
        this.doHow();

      }

    }


    if (this.ask[3]) {
      if (contAp > 3) {
          this.ask[1] = false;
          this.ask[2] = false;
          this.ask[3] = false;
      }
    }



  }

  elegir(){
    if(this.cursorKeys.left.isDown){
      if (this.ask[2]) {
        this.clearHow();
      }else{
        this.howTo();
      }
    } else if (this.cursorKeys.right.isDown) {
      this.jugar();
    }
  }

  clearHow(){
    this.obs1.destroy();
    this.obs2.destroy();
    this.obs3.destroy();
    this.fru1.destroy();
    this.fru2.destroy();
    this.fru3.destroy();
    this.scoreLabel.destroy();
    this.button2.play("buttonD");
    this.opt.destroy();
    this.ask[3] = true;
    contAp = 0
    //this.ask[1] = false;
    //this.ask[2] = false;

  }

  doHow(){
    if (!this.ask[2]) {
      if (contAp>4){
        this.ask[2] = true;
        this.obs1 = this.add.sprite(config.width / 2 - 75, config.height / 2 + 125, "obstacle").setDepth(10).setScale(0.5);this.obs1.play("hamburguesa");
        this.obs2 = this.add.sprite(config.width / 2 - 25, config.height / 2 + 125, "obstacle").setDepth(10).setScale(0.5);this.obs2.play("papas");
        this.obs3 = this.add.sprite(config.width / 2 + 25, config.height / 2 + 125, "obstacle").setDepth(10).setScale(0.5);this.obs3.play("doritos");
         
        this.fru1 = this.add.sprite(config.width / 2 - 75, config.height / 2 + 75, "fruta").setDepth(10).setScale(0.5);this.fru1.play("uva");
        this.fru2 = this.add.sprite(config.width / 2 - 25, config.height / 2 + 75, "fruta").setDepth(10).setScale(0.5);this.fru2.play("kiwi");
        this.fru3 = this.add.sprite(config.width / 2 + 25, config.height / 2 + 75, "fruta").setDepth(10).setScale(0.5);this.fru3.play("cereza");
        this.scoreLabel = this.add.bitmapText(85, 85,"pixelFont",`Bienvenido a
Del Monte Race!

Usa las flechas
" < " y  " > "
para jugar

Come esto:

Evita esto:

              Suerte !
`,32).setDepth(1);
      }  


    }
  }
  howTo(){

    if (!this.ask[1]) {
      console.log("Ask");
      contAp = 0;
      this.opt = this.add.sprite(50, 50, "opt").setDepth(1);
      this.opt.setOrigin(0, 0);
      this.opt.play("opt");      
    }
    this.ask[1] = true;
 
    
  }


  jugar(){
    vida = 100;
    changeStage = 0;
    contAp = 0;
    gameOver = false;
    pj = Phaser.Math.Between(1,2);
    this.scene.start("playGame");
  }

}