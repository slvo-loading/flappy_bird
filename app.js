let my_width = window.innerWidth - 20;
let my_height = window.innerHeight - 20;

let config = {
  renderer: Phaser.AUTO,
  width: my_width,
  height: my_height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/background.png');
  this.load.image('bird', 'assets/bird.png', {
    frameWidth: 64,
    frameHeight: 96,
  });
  this.load.image('column', 'assets/column.png');
  this.load.image('road', 'assets/road.png');
}

let bird;
let hasLanded = false;
let curser;
let hasBumped = false;
let isGameStarted = false;
let messageToPlayer;

function create() {
  const background = this.add
    .image(0, 0, 'background')
    .setOrigin(0, 0)
    .setDisplaySize(my_width, my_height - 100);

  const roads = this.physics.add.staticGroup();

  const topColumns = this.physics.add.staticGroup({
    key: 'column',
    repeat: 1,
    setXY: { x: 300, y: 50, stepX: 500 },
  });

  const bottomColumns = this.physics.add.staticGroup({
    key: 'column',
    repeat: 1,
    setXY: { x: 550, y: 400, stepX: 500 },
  });

  const road = roads.create(400, 568, 'road').setScale(2).refreshBody();

  bird = this.physics.add.sprite(0, 50, 'bird').setScale(2);
  bird.setBounce(0.2); //bounces slightly when it hits something
  bird.setCollideWorldBounds(true);

  this.physics.add.overlap(bird, road, () => (hasLanded = true), null, this);
  this.physics.add.collider(bird, road);

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.overlap(
    bird,
    topColumns,
    () => (hasBumped = true),
    null,
    this
  );
  this.physics.add.overlap(
    bird,
    bottomColumns,
    () => (hasBumped = true),
    null,
    this
  );
  this.physics.add.collider(bird, topColumns);
  this.physics.add.collider(bird, bottomColumns);

  messageToPlayer = this.add.text(0, 0, 'press SPACE to start', {
    fontSize: '32px',
    fill: '#000',
  });
  Phaser.Display.Align.In.BottomCenter(messageToPlayer, background, 0, 50);
}

function update() {
  if (cursors.space.isDown && !isGameStarted) {
    isGameStarted = true;
    messageToPlayer.text = 'press UP key to fly and avoid the columns';
  }

  if (cursors.up.isDown && !hasLanded && !hasBumped) {
    bird.setVelocityY(-160);
  }

  if (!isGameStarted) {
    bird.setVelocityY(-160);
  }

  if (!hasLanded && !hasBumped) {
    bird.body.velocity.x = 50;
  }

  if (hasLanded || hasBumped || !isGameStarted) {
    bird.body.velocity.x = 0;
  }

  if (hasLanded || hasBumped) {
    messageToPlayer.text = 'Game Over! press F5 to restart';
  }
}
