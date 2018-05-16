import Phaser from "phaser";
import {GameScene} from "./scenes/gamescene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 200}
    }
  },

};

const theGame = new Phaser.Game(config);
