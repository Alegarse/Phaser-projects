class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, playerNum) {

        super(scene, x, y, texture);

        scene.add.existing(this);

        scene.physics.world.enableBody(this);

        this.scene = scene;

        this.body.setCollideWorldBounds(true);

        scene.players.add(this);

        if(playerNum == 1){
            this.play("player_anim");

            this.playerKeys = scene.input.keyboard.createCursorKeys();

            this.shootKey = scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            );

        } else {
            this.play("player2_anim");

            this.playerKeys = scene.input.keyboard.addKeys(
                {
                    up: Phaser.Input.Keyboard.KeyCodes.W,
                    left: Phaser.Input.Keyboard.KeyCodes.A,
                    down: Phaser.Input.Keyboard.KeyCodes.S,
                    right: Phaser.Input.Keyboard.KeyCodes.D
                }
            );

           this.shootKey = scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.MINUS
            );
        }

        this.vidas = 3;

        this.muerto = false;

    }

    update() {
        this.movimientoJugador();


        if(Phaser.Input.Keyboard.JustDown(this.shootKey)){
            new Beam(this.scene, this);
        }

        if(this.vidas == 0){
            this.muerto = true;
        }
    }

    movimientoJugador() {

        this.body.setVelocity(0);

        if (this.playerKeys.left.isDown) {
            this.body.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.playerKeys.right.isDown) {
            this.body.setVelocityX(gameSettings.playerSpeed);
        }

        if (this.playerKeys.up.isDown) {
            this.body.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.playerKeys.down.isDown) {
            this.body.setVelocityY(gameSettings.playerSpeed);
        }
    }

    quitavida(){
        this.vidas -= 1;
    }
}