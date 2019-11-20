class Scene3 extends Phaser.Scene {
    constructor() {
        super("playGame2");

    }

    create() {

        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");

        // Add the ships to a group with physics
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);


        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);

        this.physics.world.setBoundsCollision();

        this.powerUps = this.physics.add.group();


        for (var i = 0; i < gameSettings.maxPowerups; i++) {
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

            if (Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("gray");
            }

            powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);

        }

        // 2.1 ADD THE PLAYER SHIP
        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
        this.player.play("thrust"); //Aqui ejecuta la animacion del player
        this.player2 = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player2");
        this.player2.play("thrust2"); //Aqui ejecuta la animacion del player

        // 2.2 create the cursorKeys
        this.cursorKeys = this.input.keyboard.createCursorKeys(); //Así podemos manejarlo con el teclado
        this.wasdKeys = this.input.keyboard.addKeys({
            wKey: Phaser.Input.Keyboard.KeyCodes.W,
            sKey: Phaser.Input.Keyboard.KeyCodes.S,
            aKey: Phaser.Input.Keyboard.KeyCodes.A,
            dKey: Phaser.Input.Keyboard.KeyCodes.D,
        });

        // 3.3 don't let the player leave the screen
        this.player.setCollideWorldBounds(true); //Así no se va de los bordes
        this.player2.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.player2);


        // 4.1  add a key for the player fire
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.projectiles = this.add.group();

        this.physics.add.collider(this.projectiles, this.powerUps, function (projectile, powerUp) {
            projectile.destroy();
        });

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        // 3.1 Add HUD background
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        //
        graphics.closePath();
        graphics.fillPath();

        // 2.1 add a score property
        this.score = 0;
        this.lives = 3

        // 1.3 new text using bitmap font
        //this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);

        // 4.3 format the score
        var scoreFormated = this.zeroPad(this.score, 6);
        var livesFormated = this.zeroPad(this.lives, 1);
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + scoreFormated, 16);
        this.livesLabel = this.add.bitmapText(config.width / 1.25, 5, "pixelFont", "LIVES " + livesFormated, 16);

        // Sounds and music to be used
        this.beamSound = this.sound.add("audio_beam");
        this.explosionSound = this.sound.add("audio_explosion");
        this.pickupSound = this.sound.add("audio_pickup");

        // Music to be used
        this.music = this.sound.add("music");

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        this.music.play(musicConfig);


    } //END OF CREATE

    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true);

        if (this.lives < 3) {
            this.lives++;
            var livesFormated = this.zeroPad(this.lives, 1);
            this.livesLabel.text = "LIVES " + livesFormated;
        }

    }

    hurtPlayer(player, enemy) {
        this.resetShipPos(enemy);

        if (this.player.alpha < 1) {
            return;
        }

        var explosion = new Explosion(this, player.x, player.y);

        player.disableBody(true, true);

        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });

        player.x = config.width / 2 - 8;
        player.y = config.height - 64;
        this.lives--;
        var livesFormated = this.zeroPad(this.lives, 1);
        this.livesLabel.text = "LIVES " + livesFormated;

        if (this.lives < 1) {
            this.scene.start("gameOver");
        }
    }

    resetPlayer() {
        var x = config.width / 2 - 8;
        var y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);


        this.player.alpha = 0.5;

        var tween = this.tweens.add({
            targets: this.player,
            y: config.height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function () {
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }

    hitEnemy(projectile, enemy) {
        projectile.destroy();
        this.resetShipPos(enemy);
        // 2.2 increase score
        this.score += 15;

        // 2.3 update the score scoreLabel
        //this.scoreLabel.text = "SCORE " + this.score;

        // 4.2 format the score
        var scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE " + scoreFormated;
    }


    // 4.1 zero pad format function
    zeroPad(number, size) {
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }




    update() {


        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);
        // for testing purpouses
        // this.ship1.destroy();
        // this.ship2.destroy();
        // this.ship3.destroy();

        this.background.tilePositionY -= 0.5;


        this.movePlayerManager();


        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBeam();
        }

        if (Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.shootBeam();
        }


        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }


    }

    shootBeam() {
        var beam = new Beam(this);
        this.beamSound.play();
    }


    movePlayerManager() {

        this.player.setVelocity(0);

        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }

        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }

        this.player2.setVelocity(0);

        if (this.wasdKeys.aKey.isDown) {
            this.player2.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.wasdKeys.dKey.isDown) {
            this.player2.setVelocityX(gameSettings.playerSpeed);
        }
        if (this.wasdKeys.wKey.isDown) {
            this.player2.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.wasdKeys.sKey.isDown) {
            this.player2.setVelocityY(gameSettings.playerSpeed);
        }
    }



    moveShip(ship, speed) {
        ship.y += speed;
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }



    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }


}