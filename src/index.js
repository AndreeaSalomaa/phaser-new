import Phaser from "phaser";
import GameScene from "./scenes/gamescene";

const config = {
  type: Phaser.AUTO,
  width: 1066,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 200}
    }
  },
  scene: [GameScene]
};

const theGame = new Phaser.Game(config);


if (module.hot) {
  module.hot.accept(() => {});

  module.hot.dispose(() => {
    window.location.reload();
  });
}
