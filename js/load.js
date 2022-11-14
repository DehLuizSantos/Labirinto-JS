var loadState = {
    preload: function(){
        var txtLoading = game.add.text(game.world.centerX, 150, 'LOADING...', {font: '15px emulogic', fill: '#fff'})
        txtLoading.anchor.set(.5)
        var progressBar = game.add.sprite(game.world.centerX, 250, 'progressBar')
        progressBar.anchor.set(.5)
        game.load.setPreloadSprite(progressBar)

        game.load.image('bg','img/bg.png')
        game.load.image('block', 'img/block.png')
        game.load.image('whitearea', 'img/white-area.png')
        game.load.image('blackarea', 'img/black-area.png')
        game.load.image('end', 'img/end.png')
        game.load.image('part', 'img/part.png')
        game.load.image('right', 'img/right.png')
        game.load.image('left', 'img/left.png')
        game.load.image('up', 'img/up.png')
        game.load.image('down', 'img/down.png')

        //Carregamento de imagem por celula (dimenções alt/larg)
        game.load.spritesheet('coin', 'img/coin.png', 32,32) 
        game.load.spritesheet('enemy', 'img/enemy.png', 24,40)
        game.load.spritesheet('player', 'img/player.png', 24, 32)

        game.load.audio('getitem','sfx/getitem.ogg' ) //''http://gustavoasilveira.github.io/content/labirinto3/sound/getitem.ogg
        game.load.audio('loseitem','sfx/loseitem.ogg') // ''http://gustavoasilveira.github.io/content/labirinto3/sound/lose.ogg
        game.load.audio('music','sfx/music.ogg') // ''http://gustavoasilveira.github.io/content/labirinto3/sound/music.ogg

        game.physics.startSystem(Phaser.Physics.ARCADE)
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
     
        game.state.start('menu')
    }
};
