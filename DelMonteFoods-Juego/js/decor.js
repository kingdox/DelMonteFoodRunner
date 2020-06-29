var changeDir = true;

class Decor extends Phaser.GameObjects.Sprite {
    constructor(scene) {

           switch (changeDir) {
             case true:
                var x = 45;
                changeDir = false;

                break;
            case false:
                var x = 305;
                changeDir = true;

                break;
        }
        
        var y = -150;

        super(scene, x, y, "decor");
        scene.add.existing(this);
        
        switch (Phaser.Math.Between(1,30)) {
            case 1:
                this.play("decor");
                
                break;
            case 2:

                this.play("decor4");
                
                break;
            case 3:

            this.play("decor5");
                    
                break;

            default:
                switch (Phaser.Math.Between(1,3)) {
                    case 1:
                        this.play("decor1");
                        
                        break;
                
                    case 2:
                        this.play("decor2");

                        break;
                    case 3:
                        this.play("decor3");


                    }

        }

        scene.physics.world.enableBody(this);
        this.body.velocity.y  = + 47.5 * aceleracion;//colocar aceleraciòn

        scene.decoracion.add(this);
    }

    update(){

        if (this.y > config.height + 50) {//si sale de pantalla se elimina
            this.destroy();
        }

    }
}