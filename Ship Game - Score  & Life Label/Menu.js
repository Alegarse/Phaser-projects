class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
  
    }
  
    create() {
        this.cursors = this.input.keyboard.addKeys(
            {ENTER:Phaser.Input.Keyboard.KeyCodes.ENTER})
        this.add.text(95, 40., "Z-Ships");
        this.add.text(20, 60, "To infinity and beyond")
        this.add.text(70, 160, "Press ENTER");
    }
    update() {
        if (this.cursors.ENTER.isDown) {
            this.scene.start("playGame");
        }
    }
}