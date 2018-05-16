import  Phaser from "phaser";
import logo from "../assets/phaserlogo.png";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: "GameScene"});

  }

  preload(){
    this.load.image("logo", logo);
  }

  create () {
    this.logoSprite = this.physics.add.sprite(400, 300, "logo");
    this.logoSprite.setBounce(0.8);
    this.logoSprite.setCollideWorldBounds(true);
    this.logoSprite.setGravityY(400);
    this.logoSprite.body.velocity.x = 250;
    this.logoSprite.body.velocity.y = 150;
  }
  update(deltaTime) {

  }
}
