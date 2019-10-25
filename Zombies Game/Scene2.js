class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    // Change from Image  to Sprite
    this.z1 = this.add.sprite(config.width, config.height, "z1");
    this.z2 = this.add.sprite(config.width, config.height, "z2");
    this.z3 = this.add.sprite(config.width, config.height, "z3");
    this.z4 = this.add.sprite(config.width, config.height, "z4");
    this.crow = this.add.sprite(config.width, config.height, "crow");

    // Set the players
    this.player1 = this.physics.add.sprite(config.width, config.height, "player1");
    this.player1.flipX = true;
    // This line for limit the size of player1 in collide
    this.player1.setSize(50,82);
    this.player2 = this.physics.add.sprite(config.width, config.height, "player2");
    this.player2.flipX = true;
    // This line for limit the size of player2 in collide
    this.player2.setSize(50,82);

    // Playing the animations
    this.z1.play("z1_anim");
    this.z2.play("z2_anim");
    this.z3.play("z3_anim");
    this.z4.play("z4_anim");
    this.crow.play("crow_anim");
    this.player1.play("player1_anim");
    this.player2.play("player2_anim");

    // Make the zombies and crow clickables to destroy them
    this.z1.setInteractive();
    this.z2.setInteractive();
    this.z3.setInteractive();
    this.z4.setInteractive();
    this.crow.setInteractive();

    // Join the click action with the method
    this.input.on('gameobjectdown', this.destroyShip, this);
    // Typing the bottom text on the screen
    this.add.text(20, 20, "¡¡Hunting zombies and crows!!", {
      font: "22px Arial",
      fill: "red"
    });


    // IMPLEMENTS THE REAL PLAY

    // Creating cursor keys for Player 1
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    // Creating WASD keys for Player 2
    this.wasdKeys = this.input.keyboard.addKeys({
      wKey:Phaser.Input.Keyboard.KeyCodes.W,
      sKey:Phaser.Input.Keyboard.KeyCodes.S,
      aKey:Phaser.Input.Keyboard.KeyCodes.A,
      dKey:Phaser.Input.Keyboard.KeyCodes.D,
      });

    // Entablish limits game for the players cant leaves the screen
    this.player1.setCollideWorldBounds(true);
    this.player2.setCollideWorldBounds(true);

    // Implements Players impact
    this.physics.add.collider(this.player1, this.player2);

  } // End of create

  // MOVEMENTS INTO THE GAME

  update() {

    this.moveShip(this.z1, 2);
    this.moveShip(this.z2, 0.9);
    this.moveShip(this.z3, 0.5);
    this.moveShip(this.z4, 1);
    this.moveShipC(this.crow, 10);

    this.background.tilePositionX += 0.5;

    // Call the control player (What do every keys)
    this.movePlayerManager();

  } // End of update



  // BEGINS METHODS


  // FOR THE PLAYERS'S MOVEMENT
  movePlayerManager(){

    // Player 1
    this.player1.setVelocity(0);

    if(this.cursorKeys.left.isDown){
      this.player1.setVelocityX(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player1.setVelocityX(gameSettings.playerSpeed);
    }
    if(this.cursorKeys.up.isDown){
      this.player1.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player1.setVelocityY(gameSettings.playerSpeed);
    }

    // Player 2
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


  // FOR ZOMBIES AND CROW

  // Movement left to right
  moveShip(ship, speed) {
    ship.x += speed;
    if (ship.x > config.width) {
      this.resetShipPos(ship);
    }
  }
  // Movement right to left
  moveShipC(ship, speed) {
    ship.x -= speed;
    if (ship.x <= 0) {
      this.resetShipPosC(ship);
    }
  }
  // Reset position for movement left to right
  resetShipPos(ship) {
    ship.x = 0;
    var randomY = Phaser.Math.Between(config.height / 1.7, config.height);
    ship.y = randomY;
  }
  // Reset position for movement right to left for birds
  resetShipPosC(ship) {
    ship.x = config.width;
    var randomY = Phaser.Math.Between(config.height / 3, config.height / 10);
    ship.y = randomY;
  }
  // Method for destroy with a click over the object
  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

    // ENDS METHODS


} // End of main (Scene2) class