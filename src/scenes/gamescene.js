import Phaser from "phaser";
import background from "../assets/Background.jpg";
import floors from "../assets/floor.png";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: "GameScene"});

  }

  preload(){
    this.load.image("floor", floors);
    this.load.image("background", background);
  }

  create () {
    this.add.image(533,300, 'background').setScale(0.83333).refreshBody();
    var platforms = this.physics.add.staticGroup();

    platforms.create(533, 600-24, "floor").setScale(0.83333).refreshBody();

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  }
  update(deltaTime) {

  }
}
