

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
      }
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
  this.load.image('bird', 'assets/bird.png', {frameWidth: 64, frameHeight: 96});
  this.load.image('column', 'assets/column.png');
  this.load.image('road', 'assets/road.png');
}

function create() {
  const background = this.add.image(0, 0, 'background')
    .setOrigin(0, 0)
    .setDisplaySize(my_width, my_height - 100);

    const roads = this.physics.add.staticGroup();
    const road = roads.create(400, 568, 'road')
        .setScale(2)
        .refreshBody();
}

function update() {}
