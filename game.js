// based on http://www.lessmilk.com/tutorial/2d-platformer-phaser
var mainState = {
    preload: function () {
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
    },

    create: function () {
        game.stage.backgroundColor = '#ffffff';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        this.player = game.add.sprite(90, 100, 'player');

        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin

        behaviorPlugin.enable(this.player); // enable the plugin on the player

        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 300,
            jumpStrength: 450,
            gravity: 1300
        });

        // Map Builder
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();

        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            '!         !          x',
            '!                 o  x',
            '!         o          x',
            '!                    x',
            '!     o   !    x     x',
            'xxxxxxxxxxxxxxxx!!!!!x'
        ];
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                if (level[i][j] === 'x') {
                    var wall = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                } else if (level[i][j] === 'o') {
                    var coin = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'coin');
                    this.coins.add(coin);
                } else if (level[i][j] === '!') {
                    var enemy = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'enemy');
                    this.enemies.add(enemy);
                }
            }
        }

        // collision handlers
        this.player.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
            targets: this.walls
        });

        this.player.behaviors.set('collide-on-enemy', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.enemies,
            collideCallback: this.restart
        });

        this.player.behaviors.set('collect-coin', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.coins,
            collideCallback: this.takeCoin
        });
    },

    takeCoin: function (player, coin) {
        coin.kill();
    },

    restart: function () {
        game.state.start('main');
    }
};

var game = new Phaser.Game(768, 288), behaviorPlugin;
game.state.add('main', mainState);
game.state.start('main');
