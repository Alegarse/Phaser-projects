class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");

  }

  create(data) {

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

    this.playerCount = data.players;

    this.physics.world.setBoundsCollision();

    this.players = this.add.group();


    // 3.1 Add HUD background
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 40);
    graphics.lineTo(0, 40);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    // 2.1 add a score property
    this.score = 0;

    // 4.3 format the score
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont","SCORE P1: " + scoreFormated, 16);

    if (data.players == 1) {

      this.player = new Player(this, config.width / 2 - 8, config.height - 40, "player", 1);

      this.vidasLabel = this.add.bitmapText(10, 20, "pixelFont", "VIDAS P1: " + this.player.vidas, 16);


    } else if (data.players == 2) {

      this.player = new Player(this, config.width / 2 - 26, config.height - 40, "player", 1);
      this.player2 = new Player(this, config.width / 2 + 12, config.height - 40, "player2", 2);

      this.vidasLabel = this.add.bitmapText(10, 20, "pixelFont", "VIDAS P1: " + this.player.vidas, 16);
      this.vidas2Label = this.add.bitmapText(150, 20, "pixelFont", "VIDAS P2: " + this.player2.vidas, 16);

      this.score2 = 0;
      var score2Formated = this.zeroPad(this.score2, 6);
      this.score2Label = this.add.bitmapText(150, 5, "pixelFont", "SCORE P2: " + score2Formated, 16);

    }

    this.projectiles = this.add.group();

    this.physics.add.collider(this.projectiles, this.powerUps, function (projectile, powerUp) {
      projectile.destroy();
    });
    this.physics.add.overlap(this.players, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    // 1.2 create the sounds to be used
    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");

    // 2.1 create music
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
    //this.music.play(musicConfig);

  }  // END OF CREATE


  hurtPlayer(player, enemy) {

    this.resetShipPos(enemy);

    if (this.player.alpha < 1) {
      return;
    }

    var explosion = new Explosion(this, player.x, player.y);

    player.disableBody(true, true);

    player.quitavida();

    if (!player.muerto || player.body.enable) {
      this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        args: [player],
        callbackScope: this,
        loop: false
      });
    }


  }

  resetPlayer(player) {
    var x = config.width / 2;
    var y = config.height +100;
    player.enableBody(true, x, y, true, true);


    player.alpha = 0.5;

    var tween = this.tweens.add({
      targets: player,
      y: config.height - 40,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: function () {
        player.alpha = 1;
      },
      callbackScope: this
    });
  }

  hitEnemy(projectile, enemy) {
    
    var explosion = new Explosion(this, enemy.x, enemy.y);
    this.resetShipPos(enemy);
    projectile.destroy();

    
    
    
    // 2.2 increase score
    this.score += 15;
    this.score2 += 15;


    // 4.2 format the score
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE P1: " + scoreFormated;

    var score2Formated = this.zeroPad(this.score2, 6);
    this.score2Label.text = "SCORE P2: " + score2Formated;

    // 1.4 play sounds
    this.explosionSound.play();
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


    if (this.playerCount == 1) {
      this.vidasLabel.setText('VIDAS P1: ' + this.player.vidas);
    } else {
      this.vidasLabel.setText('VIDAS P1: ' + this.player.vidas);
      this.vidas2Label.setText('VIDAS P2: ' + this.player2.vidas);
    }

    let gameOver = 0;

    this.players.getChildren().forEach(item => {
      item.update();
      if (item.muerto) {
        this.matar(item);
        gameOver += 1;
      }
    });

    if ((this.playerCount == 2 && gameOver == 2) ||
      (this.playerCount == 1 && gameOver == 1)) {
      this.scene.start("gameOver", {
        players: this.playerCount
      });
    }

    this.background.tilePositionY -= 0.5;

    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  shootBeam() {
    var beam = new Beam(this);
    // 1.3 play sounds
    this.beamSound.play();
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

  matar(player) {
    player.body.setEnable(false);
    player.setVisible(false);
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

}