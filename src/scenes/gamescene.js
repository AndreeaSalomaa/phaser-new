import Phaser from "phaser";
import background from "../assets/Background.jpg";
import floor from "../assets/floor.png";
import cactus from "../assets/Cactus.png";
import cloud from "../assets/Clouds.png";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: "GameScene"});

  }

  preload(){
    this.load.image("background", background);
    this.load.image("floor", floor);
    this.load.image("cactus", cactus);
    this.load.image("cloud", cloud);
  }

  create () {
    this.add.image(533,300, 'background').setScale(0.83333);
    this.add.image(533,64, 'cloud').setScale(0.4);
    this.add.image(239,124, 'cloud').setScale(0.4);
    this.add.image(728,94, 'cloud').setScale(0.2);
    this.add.image(58,84, 'cloud').setScale(0.2);
    this.add.image(798,114, 'cloud').setScale(0.3);
    var platforms = this.physics.add.staticGroup();

    platforms.create(533, 600-24, "floor").setScale(0.83333);

    //Smaller cactii in the background that don't affect the player
    var bg_cactii = this.physics.add.staticGroup();

    bg_cactii.create(513, 600-150, "cactus").setScale(0.3);
    bg_cactii.create(513, 300, "cactus").setScale(0.15);
    bg_cactii.create(623, 320, "cactus").setScale(0.15);

    //"enemy" cactii that collide with player
    var cactii = this.physics.add.staticGroup();

    cactii.create(533, 600-50, "cactus").setScale(0.4);
    cactii.create(310, 600-50, "cactus").setScale(0.4);
    cactii.create(800, 600-50, "cactus").setScale(0.4).refreshBody();
    var scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    var balloonsText = this.add.text(848, 16, 'Balloons: 3', { fontSize: '32px', fill: '#FFF' });



  }
  update(deltaTime) {

  }
}
