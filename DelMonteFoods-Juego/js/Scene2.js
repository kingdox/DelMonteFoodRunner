var stage = 1;
var changeStage = 0;
var aceleracion = 3;
var tiempo = 0;
var cont = 0;
var obsTime = 0;
var fruTime = 0;
var decTime = 0;
var ms = window.setInterval(contador, 1000);//aceleracion
var timing = window.setInterval(movimiento, 85);
var timeObs = window.setInterval(obsT, Phaser.Math.Between(500,1000));
var timeFru = window.setInterval(fruT, Phaser.Math.Between(400,800));//400/800//
var timeDec = window.setInterval(decT, Phaser.Math.Between(400,450));
var timeVid = window.setInterval(vidT,500);

var player;
var vida = 100 * 1;
var gameOver = false;
var globalScore = 0;


function contador(){
 changeStage++
}
function movimiento(){ 
  cont = 1 ;

}
function obsT(){
  obsTime = 1;
}
function vidT(){
  tiempo++
}
function fruT(){
  fruTime++
}
function decT(){
decTime = 1;
}

class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  
  
  //CREATE
  create() {


    this.LB1 = this.add.sprite( 85, config.height - 225, "LB1").setDepth(4).setInteractive().setScale(1);
    this.LB1.on('pointerdown',() => {
      this.LB1.play("LB1_animado");
      this.moveL();
    })

    this.RB1 = this.add.sprite( config.width -85, config.height - 225, "RB1").setDepth(4).setInteractive();
    this.RB1.on('pointerdown',() => {
      this.RB1.play("RB1_animado");
      this.moveR();
    })



    //Fondo
    this.background = this.add.tileSprite(0, 0, config.width, config.height , "background");
    this.background.setOrigin(0, 0);
    //Barra de puntaje
    var graphics = this.add.graphics().setDepth(1);
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0,0);
    graphics.lineTo(config.width ,0);//Punta superior derecha
    graphics.lineTo(config.width,30);//Punta inferior derecha
    graphics.lineTo(0,30);//Punta inferior izquierda
    graphics.lineTo(0,0);//Punta superior izquierda
    graphics.closePath();
    graphics.fillPath();
    //SCORE
    this.score = 0;
    this.scoreLabel = this.add.bitmapText(5,5,"pixelFont","Puntos: 0000",32).setDepth(1);//creas una lectura iamginaria

    this.toxic = this.add.sprite(config.width - 300, config.height - 75, "toxic").setDepth(1);
    this.toxic.setOrigin(0, 0);
    this.toxic.play("toxic");


    this.bar = this.add.image(config.width - 300, config.height - 75, "bar").setDepth(1);
    this.bar.setOrigin(0, 0);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.projectiles = this.add.group();//chuches
    this.premios = this.add.group();//frutas
    this.personaje = this.add.group();//PJ
    this.barVida = this.add.group();//Barra de vida
    this.decoracion = this.add.group();//grupo decor

    this.player = new Player(this);//Crea al personaje

    
    //CONTACTOS
    this.physics.add.overlap(this.projectiles,this.projectiles,this.eraseClonChuche,null,this);
    this.physics.add.overlap(this.personaje,this.projectiles,this.chuche,null,this);
    this.physics.add.overlap(this.personaje,this.premios,this.fruta,null,this);
    this.physics.add.overlap(this.projectiles,this.premios,this.quitarFrut,null,this);
    this.physics.add.overlap(this.premios,this.premios,this.eraseClonFruta,null,this);
    this.physics.add.overlap(this.decoracion,this.decoracion,this.eraseClonDecoracion,null,this);


    
    this.makeVida();//barra de vida
    

    this.efectoPos;
  }


  zeroPad(number,size){
    var stringNumber = String(number);
    while (stringNumber.length < (size || 0)) {
     stringNumber = "0" + stringNumber; 
    }
    return stringNumber;
  }
  eraseClonChuche(projectiles1,projectiles2){
    projectiles1.destroy(true,true);

  }
  chuche(personaje, projectiles){
    
    projectiles.destroy(true,true);

    vida = vida - Phaser.Math.Between(10,20);
    this.askVida();
    this.eraseVida();
    this.makeVida();
    this.efectoNeg = this.add.sprite(this.player.x,this.player.y, "veneno").setDepth(1);
    this.efectoNeg.play("veneno");
  }
  fruta(personaje,premios){
    premios.destroy(true,true);
    vida = vida + Phaser.Math.Between(1,10);
    this.askVida();
    this.eraseVida();
    this.makeVida();

    this.score += stage * Phaser.Math.Between(10,50);
    this.doScore();

    this.efectoPos = this.add.sprite(this.player.x,this.player.y, "health").setDepth(1);
    this.efectoPos.play("health");
    
  }
  quitarFrut(projectiles,premios){
    premios.destroy(true,true);
  }
  eraseClonFruta(fruta1,fruta2){
    fruta1.destroy(true,true);

  }
  eraseClonDecoracion(decoracion1,decoracion2){
    decoracion1.destroy(true,true);
  }

  //Update
  update() {

    if (gameOver)
    { globalScore = this.score; 
      contAp = 0;  
      this.scene.start("endGame");
        return;
    }


    if (changeStage > 31) {
      this.newStage();
    }

    this.background.tilePositionY -= 0.8  * aceleracion;
  
    if (cont > 0) {
      this.movePlayerManager();
      cont = 0;
       
    }
    
    if (obsTime > 0) {
      this.makeObstacle();
      obsTime = 0;  
    }
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var obstacle = this.projectiles.getChildren()[i];
      obstacle.update();

    }

    //Premios
    if (fruTime > 0) {
      this.makeFruits();
      fruTime = 0;
      this.score += stage * Phaser.Math.Between(1,10);;
      this.doScore();
    }
    for(var i = 0; i < this.premios.getChildren().length; i++){
      var fruta = this.premios.getChildren()[i];
      fruta.update();

    }
    
    if (tiempo > 0) {
      vida--;
      this.askVida();
      this.eraseVida();
      this.makeVida();
      tiempo = 0;
    }

    //Decoracion
    if (decTime > 0) {
      this.makeDecor();
      decTime = 0;
    }
    for(var i = 0; i < this.decoracion.getChildren().length; i++){
      var decUpt = this.decoracion.getChildren()[i];
      decUpt.update();

    }

  }



  movePlayerManager(){
    
    if(this.cursorKeys.left.isDown){// MOVE IZQ
      if (this.player.x > 150) { 
        this.player.x = this.player.x - 50;
       }

    }else if(this.cursorKeys.right.isDown){// MOVE DER
      
      if (this.player.x < 200) { 
        this.player.x = this.player.x + 50;
        
       } 
    }
  }

 moveL(){
  if (this.player.x > 150) { 
    this.player.x = this.player.x - 50;
   }
 }
 moveR(){
  if (this.player.x < 200) { 
    this.player.x = this.player.x + 50;
    
   } 
 }



  makeObstacle(){
    var obstacle = new Obstacle(this);//llama a la clase obstacle
    if (aceleracion >3) {
    var obstacle = new Obstacle(this);//llama a la clase obstacle
      
    }
  }
  makeFruits(){
    var fruta = new Fruta(this);
    if (aceleracion < 4) {
      switch (Phaser.Math.Between(1,2)) {
        case 1:
          var fruta = new Fruta(this);
           break;
        case 2: var obstacle = new Obstacle(this);
          break;
      }
    }
  }
  makeDecor(){
    var decor = new Decor(this);
    this.decoracion.add(decor);//añadir cada nuevo objeto decorativo a el grupo decoracion
  }
  makeVida(){
    for (let i = 0; i < vida; i++) {   //crear barra
      var life = this.add.image(config.width - 279 + i * 2, config.height - 50, "life").setDepth(1);  
      this.barVida.add(life);  
    }
  }
  eraseVida(){
      this.barVida.clear(true);
    }
  askVida(){
    if (vida <= 0) {
      vida = 0;
      //Fin del juego
      this.physics.pause();
      this.projectiles.clear(true);
      this.premios.clear(true);
      this.personaje.clear(true);
      this.barVida.clear(true);
      gameOver = true;
    }
    if (vida >= 100) {
      vida = 100;
    }
  }
  doScore(){
    if (this.score > 999999) {
      this.score = 999999;
    }
    var scoreFormated = this.zeroPad(this.score,6);
    this.scoreLabel.text = "Puntos: " + scoreFormated;

  }
  newStage(){
    if (aceleracion < 6 && gameOver == false){
      contAp = 0;
      win = false;
      globalScore = this.score;
      this.scene.start("newStage");

    } 
  }
}