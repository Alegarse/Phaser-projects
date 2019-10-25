class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOver");
  
    }
  
    create() {
        this.cursors = this.input.keyboard.addKeys(
            {Y:Phaser.Input.Keyboard.KeyCodes.Y,
            N:Phaser.Input.Keyboard.KeyCodes.N})
            this.add.text(87, 40., "GAME OVER");
            this.add.text(70, 140, "¿Play again?");
            this.add.text(60, 170, "Press Y  or  N");
    }
    update() {
        if (this.cursors.Y.isDown) {
            this.scene.start("playGame");
        }
        if (this.cursors.N.isDown) {
            this.scene.start("End");
        }
    }
}