class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // 4.1 make the background a tile sprite
    //this.background = this.add.image(0, 0, "background");
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, "ship");
    this.ship1.angle = 90;
    this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2");
    this.ship2.angle = 90;
    this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "ship3");
    this.ship3.angle = 90;

    this.add.text(20, 20, "Playing game", {
      font: "15px Arial",
      fill: "yellow"
    });

  }

  // 0 add the update function
  update() {

    // 1.1 call a function to move the ships vertically
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    // 4.2 scroll the background
    this.background.tilePositionX -= 2;

  }

  // 1.2 create the function to move the ships
  moveShip(ship, speed) {
    // increase the position of the ship on the vertical axis
    ship.x -= speed;
    // if the ship hits the bottom of the screen call the reset function
    if (ship.x < 0) {
      // 2.1 call a reset position function
      this.resetShipPos(ship);
    }
  }

  // 2.2 create the reset position function
  resetShipPos(ship){
    // put the ship on the top
    ship.x = config.width;
    // put the ship on a random position on the y axis
    var randomY = Phaser.Math.Between(0, config.height);
    ship.y = randomY;
  }


}
