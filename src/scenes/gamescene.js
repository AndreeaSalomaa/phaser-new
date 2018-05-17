import Phaser from "phaser";
import background from "../assets/Background.jpg";
import floor from "../assets/floor.png";
import cactus from "../assets/Cactus.png";
import cloud from "../assets/Clouds.png";
import dude from "../assets/MainCharacter.png";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({key: "GameScene"});

  }

  preload(){
    this.load.image("background", background);
    this.load.image("floor", floor);
    this.load.image("cactus", cactus);
    this.load.image("cloud", cloud);
    this.load.spritesheet("dude", dude, { frameWidth: 75, frameHeight: 70 });
    console.log(this.assets);
  }

  create () {
    this.add.image(533,300, 'background').setScale(0.83333);
    this.assets={};
    //some cloud
    this.assets.clouds = [];
    this.assets.clouds.push(this.physics.add.sprite(533,64, 'cloud').setScale(0.4));
    this.assets.clouds.push(this.physics.add.sprite(239,124, 'cloud').setScale(0.4));
    this.assets.clouds.push(this.physics.add.sprite(728,94, 'cloud').setScale(0.2));
    this.assets.clouds.push(this.physics.add.sprite(58,84, 'cloud').setScale(0.2));
    this.assets.clouds.push(this.physics.add.sprite(798,114, 'cloud').setScale(0.3));
    //kill gravity on clouds
    this.assets.clouds.map((cloud)=>cloud.body.gravity.y= -200);


    this.assets.player = this.physics.add.sprite(100, 450, 'dude');
    this.assets.player.setBounce(0.2);
    this.assets.player.setCollideWorldBounds(true);


    //floor for our hero to walk on.
    this.assets.platforms = this.physics.add.staticGroup();
    this.assets.platforms.create(533, 600, "floor").setScale(0.83333).refreshBody();

    //Smaller cactii in the background that don't affect the player
    this.assets.bg_cactii = this.add.group();
    this.assets.bg_cactii.create(513, 600-150, "cactus").setScale(0.3);
    this.assets.bg_cactii.create(513, 300, "cactus").setScale(0.15);
    this.assets.bg_cactii.create(623, 320, "cactus").setScale(0.15);

    //"enemy"this.assets.cactii that collide with player
    varthis.assets.cactii = this.physics.add.staticGroup();
   this.assets.cactii.create(533, 600-55, "cactus").setScale(0.4).refreshBody();
   this.assets.cactii.create(310, 600-45, "cactus").setScale(0.4).refreshBody();
   this.assets.cactii.create(800, 600-50, "cactus").setScale(0.4).refreshBody();


    var this.assets.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    var this.assets.balloonsText = this.add.text(848, 16, 'Balloons: 3', { fontSize: '32px', fill: '#FFF' });

    this.physics.add.collider(this.assets.player, this.assets.platforms);
    this.cursors = this.input.keyboard.createCursorKeys();


  }
  update(deltaTime) {
      if (this.cursors.right.isDown)
      {
          this.assets.clouds.forEach((cloud)=>cloud.setVelocityX(Math.floor(Math.random() * 3)+5));
          //player.anims.play('left', true);
      }
      if (this.cursors.left.isDown)
      {
          this.assets.clouds.forEach((cloud)=>cloud.setVelocityX(-(Math.floor(Math.random() * 3)+5)));
          //player.anims.play('left', true);
      }
      if (this.cursors.down.isDown)
      {
          this.assets.clouds.forEach((cloud)=>cloud.setVelocityX(0));
          //player.anims.play('left', true);
      }
  }
}
