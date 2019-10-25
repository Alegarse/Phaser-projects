class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "assets/images/background.png");

    //Charging the zombie's images
    this.load.spritesheet("z1", "assets/spritesheets/z1.png", {
      frameWidth: 133,
      frameHeight: 133
    });
    this.load.spritesheet("z2", "assets/spritesheets/z2.png", {
      frameWidth: 133,
      frameHeight: 133
    });
    this.load.spritesheet("z3", "assets/spritesheets/z3.png", {
      frameWidth: 133,
      frameHeight: 124
    });
    this.load.spritesheet("z4", "assets/spritesheets/z4.png", {
      frameWidth: 133,
      frameHeight: 128
    });
    //Charging the hunting's explosion
    this.load.spritesheet("explosion", "assets/spritesheets/explosion_.png", {
      frameWidth: 133,
      frameHeight: 133
    });
    //Charging the crows (Birds)
    this.load.spritesheet("crow", "assets/spritesheets/crow.png", {
      frameWidth: 97,
      frameHeight: 120
    });
    //Chargind the players
    this.load.spritesheet("player1", "assets/spritesheets/p1.png", {
      frameWidth: 130,
      frameHeight: 130
    });
    this.load.spritesheet("player2", "assets/spritesheets/p2.png", {
      frameWidth: 130,
      frameHeight: 130
    });
  } // End of preload

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");

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
    this.anims.create({
      key: "player1_anim",
      frames: this.anims.generateFrameNumbers("player1"),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "player2_anim",
      frames: this.anims.generateFrameNumbers("player2"),
      frameRate: 10,
      repeat: -1
    });
  } // End of create


} // End of main (Scene1) class