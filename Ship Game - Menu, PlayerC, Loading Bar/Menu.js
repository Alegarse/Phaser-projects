class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
  
    }
  
    create() {
        this.select = "#11A3C0";
        this.unselect = "#DDFBFB";
        this.add.text(75, 40, "Z-Ships",{fontFamily: '"Impact"', fontSize: "35px",color:"#C04911"});
        this.add.text(20, 80, "To infinity and beyond",{color:"#8C49D8"});

        this.play = this.add.text(
            20,
            160,
            "1 PLAYER",
            {color: this.select}
        );
        this.play2P = this.add.text(
            140,
            160,
            "2 PLAYERS"
        );

        // Keys manager
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        // Flags
        this.disableKeys = false;
        this.disableEnterKey = false;
        this.i = 1;
    }

    update() {
        if (this.cursorKeys.left.isDown && !this.disableKeys) {
            this.i--;
            this.disableKeys = true;

        } else if (this.cursorKeys.right.isDown && !this.disableKeys) {
            this.i++;
            this.disableKeys = true;
        }
        if (this.cursorKeys.left.isUp && this.cursorKeys.right.isUp) {
            this.disableKeys = false;
        }

        // Menu handler
        if (this.i == 1) {
            this.play.setColor(this.select);
            this.play2P.setColor(this.unselect);

        } else if (this.i == 2) {
            this.play.setColor(this.unselect);
            this.play2P.setColor(this.select);


        } else if (this.i < 1) {
            this.i = 2;

        } else if (this.i > 2) {
            this.i = 1;
        }


        if (Phaser.Input.Keyboard.JustDown(this.enterKey)
            && !this.disableEnterKey) {
            this.cameras.main.fade(1000, 0, 0, 0, false, this.changeScene);
        }
    }

    changeScene(camera, progress) {
        if (progress == 1) {
            this.scene.start("playGame", { players: this.i });
        }
    }
}