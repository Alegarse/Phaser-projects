class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/images/background.png");
    // 0 chnage the path to spritesheets
    // this.load.image("ship", "assets/images/ship.png");
    // this.load.image("ship2", "assets/images/ship2.png");
    // this.load.image("ship3", "assets/images/ship3.png");
    // to
    this.load.spritesheet("z1", "assets/spritesheets/z1.png",{
      frameWidth: 133,
      frameHeight: 133
    });
    this.load.spritesheet("z2", "assets/spritesheets/z2.png",{
      frameWidth: 133,
      frameHeight: 133
    });
    this.load.spritesheet("z3", "assets/spritesheets/z3.png",{
      frameWidth: 133,
      frameHeight: 124
    });
    this.load.spritesheet("z4", "assets/spritesheets/z4.png",{
      frameWidth: 133,
      frameHeight: 128
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion_.png",{
      frameWidth: 133,
      frameHeight: 133
    });
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
  }
}
