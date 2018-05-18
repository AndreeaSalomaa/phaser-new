import Phaser from "phaser";
import background from "../assets/Background.jpg";
import floor from "../assets/floor.png";
import cactus from "../assets/Cactus.png";
import cloud from "../assets/Clouds.png";
import dude from "../assets/MainCharacter.png";
import coin from "../assets/CoinSprite.png";
import balloon  from "../assets/balloonSprite.png";

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
    this.load.spritesheet("coin", coin, { frameWidth: 256, frameHeight: 256});
    this.load.spritesheet("balloon", balloon, { frameWidth: 150, frameHeight: 180});
  }

  create () {
    //initialize the assets object
    this.assets = {};
    var assets = this.assets;

    //background
    this.add.image(533,300, 'background').setScale(0.83333);

    //some clouds
    assets.clouds = [];
    assets.clouds.push(this.physics.add.sprite(533,64, 'cloud').setScale(0.4));
    assets.clouds.push(this.physics.add.sprite(239,124, 'cloud').setScale(0.4));
    assets.clouds.push(this.physics.add.sprite(728,94, 'cloud').setScale(0.2));
    assets.clouds.push(this.physics.add.sprite(58,84, 'cloud').setScale(0.2));
    assets.clouds.push(this.physics.add.sprite(798,114, 'cloud').setScale(0.3));
    //kill gravity on clouds
    assets.clouds.map((cloud)=>cloud.body.gravity.y= -200);


    //floor for our hero to walk on.
    assets.platforms = this.physics.add.staticGroup();
    assets.platforms.create(533, 600, "floor").setScale(0.83333).refreshBody();

    //Smaller cactii in the background that don't affect the this.assets.player
    assets.bg_cactii = this.add.group();
    assets.bg_cactii.create(513, 600-150, "cactus").setScale(0.3);
    assets.bg_cactii.create(513, 300, "cactus").setScale(0.15);
    assets.bg_cactii.create(623, 320, "cactus").setScale(0.15);

    //"enemy" cactii that collide with this.assets.player
    assets.cactii = this.physics.add.staticGroup();
    assets.cactii.create(533, 600-55, "cactus").setScale(0.4).refreshBody();
    assets.cactii.create(310, 600-45, "cactus").setScale(0.4).refreshBody();
    assets.cactii.create(800, 600-50, "cactus").setScale(0.4).refreshBody();


    //score and balloon count
    assets.score = 0;
    assets.balloons = 3;
    assets.balloonsText = this.add.text(800, 16, 'Cactii: ' + assets.balloons, { fontSize: '32px', fill: '#FFF' });
    assets.scoreText = this.add.text(16, 16, 'Score: ' + assets.score, { fontSize: '32px', fill: '#FFF' });


    this.cursors = this.input.keyboard.createCursorKeys();

    assets.player = this.physics.add.sprite(100, 450, 'dude'); // default: this.assets.player = this.physics.add.sprite(100, 450, 'dude');

    assets.player.setBounce(0.2);
    assets.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }), // default: frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10, // default: frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 3 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6  }), // default: frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    //coins
    assets.coins = this.physics.add.group();
    assets.coins.create(128, 256, 'coin').setScale(0.2);
    assets.coins.create(258, 256, 'coin').setScale(0.2);
    assets.coins.create(378, 256, 'coin').setScale(0.2);
    assets.coins.create(498, 256, 'coin').setScale(0.2);
    assets.coins.create(689, 256, 'coin').setScale(0.2);

    //balloon
    assets.balloon = this.physics.add.sprite(100, 450, 'balloon').setScale(0.9);
    

    //coin animation
    this.anims.create({
      key: 'coin_anim',
      frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
    });

    //go through coins
    assets.coins.children.iterate(function (coin) {
    //  Give each coin a slightly different bounce
      coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(this.assets.coins, this.assets.platforms);

    //initialize container for callback functions
    assets.functions = {};
    assets.functions.collectCoin = function (player, coin){
      coin.disableBody(true, true);

      //  Add and update the score
      assets.score += 10;
      assets.scoreText.setText('Score: ' + this.assets.score);

      if (assets.coins.countActive(true) === 0)
      {
          // A new batch of stars to collect
          assets.coins.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
      });
      }
      
  };
  assets.functions.popBalloon = function (cactus, ball){
    console.log('balloon');
    ball.disableBody(true, true);

    //  Add and update the score
    assets.balloons -= 1;
    assets.balloonsText.setText('Cactii: ' + this.assets.balloons);
    if(assets.balloons < 1) assets.balloonsText.setText('YOU WIN');

    

  var x = (this.assets.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  };

  this.physics.add.overlap(assets.player, assets.coins, assets.functions.collectCoin, null, this);
  this.physics.add.overlap(assets.balloon, assets.cactii, assets.functions.popBalloon, null, this);
  //  Checks to see if the player overlaps with any of the coins, if he does call the collectStar function


  this.physics.add.collider(assets.player, assets.platforms);
  



  //  Collide the player and the coins with the platforms
  this.physics.add.collider(assets.player, assets.platforms);

  //Collide the balloons with the player
  this.physics.add.collider(assets.balloon, assets.platforms);
  

}

update(deltaTime) {
  var assets = this.assets;

  if (this.cursors.left.isDown)
  {
    assets.clouds.map((cloud)=>cloud.setVelocityX(-(Math.floor(Math.random() * 3)+5)));
    //this.assets.player.anims.play('left', true);

    assets.player.setVelocityX(-160);
    assets.balloon.setVelocityX(-160);
    
    assets.player.anims.play('left', true);


  }
  else if (this.cursors.right.isDown)
  {
    assets.clouds.map((cloud)=>cloud.setVelocityX(Math.floor(Math.random() * 3)+5));
    //this.assets.player.anims.play('left', true);

    assets.player.setVelocityX(160);
    assets.balloon.setVelocityX(160);

    assets.player.anims.play('right', true);

  }
  else
  {
    assets.player.setVelocityX(0);
    assets.balloon.setVelocityX(0);

    assets.player.anims.play('turn');
  }

  if (this.cursors.down.isDown)
  {
    assets.clouds.map((cloud)=>cloud.setVelocityX(0));
    //this.assets.player.anims.play('left', true);


  }

  if (this.cursors.up.isDown && this.assets.player.body.touching.down)
  {
    assets.player.setVelocityY(-220);
    assets.balloon.setVelocityY(-220);
  }
  assets.coins.children.iterate((coin) => coin.play('coin_anim', true));
}
}
