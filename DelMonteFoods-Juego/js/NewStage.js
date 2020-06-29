var timerPJ = window.setInterval(appear, 125);
var contAp = 0;
var win = false;

function appear(){

    if (contAp < 8) {
        contAp++       
    }

}

class NewStage extends Phaser.Scene {
    constructor() {
      super("newStage");
    }


    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height , "background");
        this.background.setOrigin(0, 0);


        //Barra de puntaje
    var graphics = this.add.graphics().setDepth(1);
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(30,220);
    graphics.lineTo(config.width - 30 ,220);//Punta superior derecha
    graphics.lineTo(config.width - 30,305);//Punta inferior derecha
    graphics.lineTo(30,305);//Punta inferior izquierda
    graphics.lineTo(30,220);//Punta superior izquierda
    graphics.closePath();
    graphics.fillPath();


        console.log("Estoy en New Stage")
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.button1 = this.add.sprite(0, config.height - 75, "button").setInteractive();
        this.button1.setOrigin(0, 0);
        this.button1.play("buttonS");
        this.button1.on('pointerdown',() => {
            if (contAp > 7) {
            this.casa();
            }
        });


        this.button2 = this.add.sprite(config.width - 150, config.height - 75, "button").setDepth(1).setInteractive();
        this.button2.setOrigin(0, 0);
        this.button2.play("buttonJ");
        this.button2.on('pointerdown',() => {
            if (contAp > 7) {
                this.jugar();
            }
            
        });


        if (aceleracion > 4) {
            this.scoreLabel = this.add.bitmapText(config.width / 2 -130,config.height / 2 - 25,"pixelFont",`Has superado las zonas 
Hora del modo infinito !`,32).setDepth(1);
        }else{
        this.scoreLabel = this.add.bitmapText(config.width / 2 -130,config.height / 2 - 25,"pixelFont",`Has superado la zona ${stage} 
             Eres increible !`,32).setDepth(1);
        }
        this.win = this.add.sprite(config.width / 2, config.height - 100, "win").setDepth(1);
        
        switch (pj) {
            case 1:
                    this.win.play("win");                
                break;
        
            case 2:
                    this.win.play("win2");

                break;
        }    
        
        this.scoreLabel = this.add.bitmapText(config.width / 2 - 50,config.height / 2 + 30,"pixelFont",`Puntos: ${globalScore}`,32).setDepth(1);

    }

    update(){
        if (contAp > 7) {
            this.winG();
        }

    }

    winG(){
        if (win == false) {
            this.select();//seleccionas

        }
    }

    select(){

        if(this.cursorKeys.left.isDown){
            this.casa();
        }else if(this.cursorKeys.right.isDown){
            this.jugar();
        }
    }


    casa(){
        win = true;
        stage = 1;
        this.scene.start("startGame");
    }

    jugar(){
        win = true;
        aceleracion = aceleracion + 1;
        changeStage = 0;
        vida = 100;
        stage++
        console.log("aceleracion actual = ",aceleracion);
        this.scene.start("playGame");
    }

}
