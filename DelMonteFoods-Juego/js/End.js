class End extends Phaser.Scene {
    constructor() {
      super("endGame");
    }

    preload(){
    }
    create(){
        this.endBG = this.add.image(config.width / 2, config.height / 2, "endBG");

        this.buttonB = this.add.sprite(config.width - 150, config.height - 75, "button").setInteractive();
        this.buttonB.setOrigin(0, 0);
        this.buttonB.play("buttonJ");
        this.buttonB.on('pointerdown',() => {
            if (contAp > 7) {
                this.jugar();
            }
          });

        this.buttonH = this.add.sprite(0, config.height - 75, "button").setInteractive();
        this.buttonH.setOrigin(0, 0);
        this.buttonH.play("buttonS");
        this.buttonH.on('pointerdown',() => {
            if (contAp > 7) {
                this.casa();
            }
          });

        this.gO = this.add.sprite(0, 75, "gameOver");
        this.gO.setOrigin(0, 0);
        this.gO.play("gameOver");



        this.personaje = this.add.group();
        this.player = new Player(this);



        this.scoreLabel = this.add.bitmapText(config.width - 100, config.height - 75,"pixelFont",`Puntos: ${globalScore}`,16).setDepth(1);
        this.scoreLabel.setOrigin(0, 0);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
    }

    update(){
        if (contAp>6){
         this.movement();   
        }
    }


    movement(){

        if(this.cursorKeys.left.isDown){
            this.casa();
        }else if(this.cursorKeys.right.isDown){//sale a pantalla de inicio
            this.jugar();

        }
    }
    casa(){
        aceleracion = 4;
        changeStage = 0;
        stage = 1;
        console.log("exit");
        this.scene.start("startGame");
    }
    jugar(){
        console.log("restart");
        vida = 100;
        changeStage = 1;
        gameOver = false;
        this.scene.start("playGame");
    }

}