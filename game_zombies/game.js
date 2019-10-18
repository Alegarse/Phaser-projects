var config = {
  width: 1366,
  height: 768,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  // 1.1 set the physics to arcade
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}

var gameSettings = {
  playerSpeed: 400  // Movements speed around the screen
}

var game = new Phaser.Game(config);