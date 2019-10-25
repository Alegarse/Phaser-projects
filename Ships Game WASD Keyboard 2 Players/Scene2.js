class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");


    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.add.text(20, 20, "Playing game", {
      font: "15px Arial",
      fill: "yellow"
    });

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
      wKey:Phaser.Input.Keyboard.KeyCodes.W,
      sKey:Phaser.Input.Keyboard.KeyCodes.S,
      aKey:Phaser.Input.Keyboard.KeyCodes.A,
      dKey:Phaser.Input.Keyboard.KeyCodes.D,
      });
    // 3.3 don't let the player leave the screen
    this.player.setCollideWorldBounds(true); //Así no se va de los bordes
    this.player2.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.player2);


    // 4.1  add a key for the player fire
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //Con esto creamos el mando para el jugador WASD


  }

  update() {

    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    // this.ship1.alpha = 0;
    // this.ship2.alpha = 0;
    // this.ship3.alpha = 0;

    this.background.tilePositionY -= 0.5;

    // 3.1 call control player Así vemos que hace cada tecla
    this.movePlayerManager();

    // 4.2 Event for the player shooting, just once per key pressing
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
     console.log("Fire!");
    }

  }

  // 3.2 define control player
  movePlayerManager(){

    this.player.setVelocity(0);

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }

    this.player2.setVelocity(0);

    if(this.wasdKeys.aKey.isDown){
      this.player2.setVelocityX(-gameSettings.playerSpeed);
    }else if(this.wasdKeys.dKey.isDown){
      this.player2.setVelocityX(gameSettings.playerSpeed);
    }
    if(this.wasdKeys.wKey.isDown){
      this.player2.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.wasdKeys.sKey.isDown){
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
