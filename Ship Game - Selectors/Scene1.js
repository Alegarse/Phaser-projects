class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/images/background.png");
    //
    this.load.spritesheet("ship", "assets/spritesheets/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "assets/spritesheets/player.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    // Load Font files
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    // Load sounds ( Formats .mp3 and .ogg)
    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);


    // #######################  PROGRESS BAR    ###########################################################

    // Create a background and prepare loading bar
    this.cameras.main.setBackgroundColor(0x2a0503);
    this.fullBar = this.add.graphics();
    this.fullBar.fillStyle(0xda7a34, 1);
    this.fullBar.fillRect((this.cameras.main.width / 4) - 2, (this.cameras.main.height / 2) - 18, (this.cameras.main.width / 2) + 4, 20);
    this.progress = this.add.graphics();
    //this.textoporcentaje = this.add.text(16, 16, "",{fontSize:'32px',fill: '#FFFFFF'});
    this.textoporcentaje = this.add.text(this.cameras.main.height / 2 - 2, this.cameras.main.width / 2 - 16, "",{fontSize:'32px',fill: '#FFFFFF'});

    // Pass loading progress as value to loading bar and redraw as files load
    this.load.on('progress', function (value) {
      var percent = Math.floor(value*100) + "%";
      this.textoporcentaje.setText(percent);
      this.progress.clear();
      this.progress.fillStyle(0xfff6d3, 1);
      this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height / 2) - 16, (this.cameras.main.width / 2) * value, 16);
    }, this);

    // Para ralentizar la barra de progreso
    for(let i=1;i<1000;i++){
      this.load.image('load'+i,
      '../../assets/images/background.png')
    }

    // Cleanup our graphics on complete
    this.load.on('complete', function () {
      this.progress.destroy();
      this.fullBar.destroy();
    }, this);

    //##############################################################################################################################################

  } // END OF PRELOAD

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("Menu");

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
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
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });

  }
}
