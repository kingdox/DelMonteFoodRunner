//aqui se crearà la barra de vida, creando un objeto de 2px 100 veces, representando la vida y, cada vez que pierda vida o gane
//se tenga que llamar a esta para averiguar cuanta vida posee actualmente
var pj = Phaser.Math.Between(1,2);


class Player extends Phaser.GameObjects.Sprite {
    constructor(scene){

        var x = config.width / 2;
        var y = config.height - 100;
        
      

        super(scene, x, y, "player");
        scene.add.existing(this);


        if (vida < 1) {//MUERTO
            if (pj == 1) {
                this.play("player1Dead");               
            }else{
                this.play("player2Dead");
            }
 
        } else {//VIVO
         if (pj == 1) {
            this.play("player1");             
         }else{
            this.play("player2");

         }
     
        }





        scene.physics.world.enableBody(this);
        

        scene.personaje.add(this);

    }

    update(){
    }
    
}