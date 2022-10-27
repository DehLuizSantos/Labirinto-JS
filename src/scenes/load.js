import Phaser, {Scene} from "phaser"
import {game} from '../game'

class loadState extends Scene {
    constructor() {
        super("load");
    }
    preload(){
        var txtLoading = this.add.text(window.innerWidth / 2, window.innerHeight / 2,  'LOADING...', {font: '15px emulogic', fill: '#fff'})
        // txtLoading.anchor.set(.5)
        var progressBar = this.add.sprite(game.world.centerX, 250, 'progressBar')
        progressBar.anchor.set(.5)
        this.load.setPreloadSprite(progressBar)

        this.load.image('bg','img/bg.png')
        this.load.image('block', 'img/block.png')
        this.load.image('end', 'img/end.png')
        this.load.image('part', 'img/part.png')

        //Carregamento de imagem por celula (dimenções alt/larg)
        this.load.spritesheet('coin', 'img/coin.png', 32,32) 
        this.load.spritesheet('enemy', 'img/enemy.png', 24,40)
        this.load.spritesheet('player', 'img/player.png', 24, 32)

        this.load.audio('getitem','sfx/getitem.ogg' ) //''http://gustavoasilveira.github.io/content/labirinto3/sound/getitem.ogg
        this.load.audio('loseitem','sfx/loseitem.ogg') // ''http://gustavoasilveira.github.io/content/labirinto3/sound/lose.ogg
        this.load.audio('music','sfx/music.ogg') // ''http://gustavoasilveira.github.io/content/labirinto3/sound/music.ogg

        this.physics.startSystem(Phaser.Physics.ARCADE)
    }
    create(){
        console.log(this)
        this.game.scene.start('menu')
    }
};

export default loadState