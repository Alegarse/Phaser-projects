class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    // 1 change from image to sprite
    this.z1 = this.add.sprite(config.width, config.height, "z1");
    this.z2 = this.add.sprite(config.width, config.height, "z2");
    this.z3 = this.add.sprite(config.width, config.height, "z3");
    this.z4 = this.add.sprite(config.width, config.height, "z4");
    this.crow = this.add.sprite(config.width, config.height, "crow");


    // 2 create animations
    this.anims.create({
      key: "z1_anim",
      frames: this.anims.generateFrameNumbers("z1"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "z2_anim",
      frames: this.anims.generateFrameNumbers("z2"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "z3_anim",
      frames: this.anims.generateFrameNumbers("z3"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "z4_anim",
      frames: this.anims.generateFrameNumbers("z4"),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    this.anims.create({
      key: "crow_anim",
      frames: this.anims.generateFrameNumbers("crow"),
      frameRate: 10,
      repeat: -1
    });


    // 3 play the animations
    this.z1.play("z1_anim");
    this.z2.play("z2_anim");
    this.z3.play("z3_anim");
    this.z4.play("z4_anim");
    this.crow.play("crow_anim");

    // 4 make the ships clickable to destroy them
    this.z1.setInteractive();
    this.z2.setInteractive();
    this.z3.setInteractive();
    this.z4.setInteractive();
    this.crow.setInteractive();


    // 5
    this.input.on('gameobjectdown', this.destroyShip, this);

    this.add.text(20, 20, "Hunting zombies and crows", {
      font: "22px Arial",
      fill: "black"
    });

  }
  update() {

    this.moveShip(this.z1, 2);
    this.moveShip(this.z2, 0.9);
    this.moveShip(this.z3, 0.5);
    this.moveShip(this.z4, 1);
    this.moveShipC(this.crow, 10);

    this.background.tilePositionX += 0.5;

  }
  //Movement left to right
  moveShip(ship, speed) {
    ship.x += speed;
    if (ship.x > config.width) {
      this.resetShipPos(ship);
    }
  }

  //Movement right to left
  moveShipC(ship, speed) {
    ship.x -= speed;
    if (ship.x <= 0) {
      this.resetShipPosC(ship);
    }
  }

  //Reset position for movement left to right
  resetShipPos(ship) {
    ship.x = 0;
    var randomY = Phaser.Math.Between(config.height / 1.7, config.height);
    ship.y = randomY;
  }

  //Reset position for movement right to left for birds
  resetShipPosC(ship) {
    ship.x = config.width;
    var randomY = Phaser.Math.Between(config.height/3, config.height/10);
    ship.y = randomY;
  }

  // 6
  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }


}