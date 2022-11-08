var loadState = {

   
    preload: function(){
        var txtLoading = game.add.text(game.world.centerX, 150, 'LOADING...', {font: '15px emulogic', fill: '#fff'})
        txtLoading.anchor.set(.5)
        var progressBar = game.add.sprite(game.world.centerX, 250, 'progressBar')
        progressBar.anchor.set(.5)
        game.load.setPreloadSprite(progressBar)

        game.load.image('bg','img/bg.png')
        game.load.image('block', 'img/block.png')
        game.load.image('end', 'img/end.png')
        game.load.image('part', 'img/part.png')

        //Carregamento de imagem por celula (dimenções alt/larg)
        game.load.spritesheet('coin', 'img/coin.png', 32,32) 
        game.load.spritesheet('enemy', 'img/enemy.png', 24,40)
        game.load.spritesheet('player', 'img/player.png', 24, 32)

        game.load.audio('getitem','sfx/getitem.ogg' ) //''http://gustavoasilveira.github.io/content/labirinto3/sound/getitem.ogg
        game.load.audio('loseitem','sfx/loseitem.ogg') // ''http://gustavoasilveira.github.io/content/labirinto3/sound/lose.ogg
        game.load.audio('music','sfx/music.ogg') // ''http://gustavoasilveira.github.io/content/labirinto3/sound/music.ogg
         // Load the gamepad spritesheet. Note that the width must equal height
        // of the sprite.
        this.load.spritesheet('gamepad', 
            'img/gamepad_spritesheet.png', 100, 100);

        game.physics.startSystem(Phaser.Physics.ARCADE)
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
     
        game.state.start('menu')
    }
};
