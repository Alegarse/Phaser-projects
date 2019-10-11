class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/images/background.png");
    
    //Charging the zombie's images
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
    //Charging the hunting's explosion
    this.load.spritesheet("explosion", "assets/spritesheets/explosion_.png",{
      frameWidth: 133,
      frameHeight: 133
    });
    //Charging the crows (Birds)
    this.load.spritesheet("crow", "assets/spritesheets/crow.png",{
      frameWidth: 97,
      frameHeight: 120
    });
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
  }
}
