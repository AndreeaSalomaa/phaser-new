import Phaser from "phaser";
import background from "../assets/Background.jpg";
import floor from "../assets/floor.png";
import cactus from "../assets/Cactus.png";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: "GameScene"});

  }

  preload(){
    this.load.image("background", background);
    this.load.image("floor", floor);
    this.load.image("cactus", cactus);
  }

  create () {
    this.add.image(533,300, 'background').setScale(0.83333);
    var platforms = this.physics.add.staticGroup();

    platforms.create(533, 600-24, "floor").setScale(0.83333);

    var cactii = this.physics.add.staticGroup();
    cactii.create(533, 600-50, "cactus").setScale(0.4);
    cactii.create(310, 600-50, "cactus").setScale(0.4);
    cactii.create(800, 600-50, "cactus").setScale(0.4).refreshBody();
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });

  }
  update(deltaTime) {

  }
}
