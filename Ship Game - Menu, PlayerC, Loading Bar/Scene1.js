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
    this.load.spritesheet("player", "assets/spritesheets/player.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("player2", "assets/spritesheets/player2.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    // 1.2 load the font fies
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    // 1.1 load sounds in both formats mp3 and ogg
    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);

        // #######################  PROGRESS BAR    ###########################################################

    // Create a background and prepare loading bar
    this.cameras.main.setBackgroundColor(0x2E2E2E);
    this.fullBar = this.add.graphics();
    this.fullBar.fillStyle(0xC04911, 1);
    this.fullBar.fillRect((this.cameras.main.width / 4) - 2, (this.cameras.main.height / 2) - 18, (this.cameras.main.width / 2) + 4, 20);
    this.progress = this.add.graphics();
    this.textoporcentaje = this.add.text(this.cameras.main.height / 2 -100, this.cameras.main.width / 2 - 80, "",{fontSize:'16px',fill: '#FF8000'});

    // Pass loading progress as value to loading bar and redraw as files load
    this.load.on('progress', function (value) {
      var percent = Math.floor(value*100) + "%";
      this.textoporcentaje.setText("Cargando juego: " +percent);
      this.progress.clear();
      this.progress.fillStyle(0x8C49D8, 1);
      this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height / 2) - 16, (this.cameras.main.width / 2) * value, 16);
    }, this);

    // Para ralentizar la barra de progreso
    for(let i=1;i<900;i++){
      this.load.image('load'+i,
      '../../assets/images/background.png')
    }

    // Cleanup our graphics on complete
    this.load.on('complete', function () {
      this.progress.destroy();
      this.fullBar.destroy();
    }, this);

    //##############################################################################################################################################
  }

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
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "player2_anim",
      frames: this.anims.generateFrameNumbers("player2"),
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
