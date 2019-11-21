class End extends Phaser.Scene {
    constructor() {
        super("End");

    }

    create() {

        this.add.text(60, 120, "GAME OVER",{font: "22px Arial",color:"#FF0000"});
    }

}