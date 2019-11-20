class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
  
    }
  
    create() {
        this.cursors = this.input.keyboard.addKeys(
            {O:Phaser.Input.Keyboard.KeyCodes.O,
            T:Phaser.Input.Keyboard.KeyCodes.T})
        this.add.text(95, 40., "Z-Ships");
        this.add.text(20, 60, "To infinity and beyond")
        this.add.text(20, 160, "1 Player     2 Players");
        this.add.text(20, 180, " Press O      Press T");
    }
    update() {
        if (this.cursors.O.isDown) {
            this.scene.start("playGame");
        }
        if (this.cursors.T.isDown) {
            this.scene.start("playGame2");
        }
    }
}