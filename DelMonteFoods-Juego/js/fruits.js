var posFruit = 0;


class Fruta extends Phaser.GameObjects.Sprite {
    constructor(scene){

        switch (Phaser.Math.Between(1,3)) {
             case 1:
                posFruit = 125;
                break;
            case 2:
                posFruit = 175;
                break;
            case 3:
                posFruit = 225;
                break;
            }

        var x = posFruit;
        var y = -51;//inicia fuera de pantalla
        
        super(scene, x, y, "fruta");
        
        scene.add.existing(this);



        switch (Phaser.Math.Between(1,3)) {
            case 1:
                this.play("uva");
                
                break;
        
            case 2:
                this.play("kiwi");

                break;
            case 3:
                 this.play("cereza");
                 break;

        }


        scene.physics.world.enableBody(this);
        
        this.body.velocity.y = + 100 * aceleracion;//colocar aceleraciòn


        scene.premios.add(this);

        
    }


    update(){

        if (this.y > config.height + 25) {//si sale de pantalla se elimina
            this.destroy();
        }

    }

}
