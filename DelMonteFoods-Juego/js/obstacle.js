var weax = 0;


class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene){

        switch (Phaser.Math.Between(1,3)) {
             case 1:
                weax = 125;
                break;
            case 2:
                weax = 175;
                break;
            case 3:
                weax = 225;
                break;
        }

        var x = weax;
        var y = -50;//inicia fuera de pantalla
        
        super(scene, x, y, "obstacle");
        
        scene.add.existing(this);

        // 3.3
        switch (Phaser.Math.Between(1,3)) {
            case 1:
                this.play("hamburguesa");
                
                break;
        
            case 2:
                this.play("papas");

                break;
            case 3:
                 this.play("doritos");//Aqui va las Hamburguesas


            }



        scene.physics.world.enableBody(this);
        
        this.body.velocity.y = + 100 * aceleracion;//colocar aceleraciòn


        scene.projectiles.add(this);

        
    }


    update(){

        if (this.y > config.height + 25) {//si sale de pantalla se elimina
            this.destroy();
        }

    }


}
