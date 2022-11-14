class Preload extends Phaser.Scene{
	constructor(){
		super('Preload')
	}	
		preload(){
			var txtLoading = this.add.text(game.config.width/2,game.config.height/2,'LOADING...',{font:'15px emulogic',fill:'#fff'});
				txtLoading.setOrigin(.5);
		
			var progressBar = this.add.sprite(game.config.width/2,250,'progressBar');
				progressBar.setOrigin(.5);
				
			
			this.load.image('bg','img/bg.png');
			this.load.image('block','img/block.png');
			this.load.image('end','img/end.png');
			this.load.image('part','img/part.png');
			
			this.load.spritesheet('coin','img/coin.png', {frameWidth: 32, frameHeight: 32});
			this.load.spritesheet('enemy','img/enemy.png', {frameWidth: 24, frameHeight: 40});
			this.load.spritesheet('player','img/player.png', {frameWidth: 24, frameHeight: 32});
			
			this.load.audio('getitem','sfx/getitem.ogg');
			this.load.audio('loseitem','sfx/loseitem.ogg');
			this.load.audio('music','sfx/music.ogg');
			
		}
		
		create(){
			this.anims.create({
				key: 'goDown',
				frames: this.anims.generateFrameNumbers('player', {
					start: 0,
					end: 7
				}),
				frameRate: 12,
				repeat: -1
			})
			this.anims.create({
				key: 'goUp',
				frames: this.anims.generateFrameNumbers('player', {
					start: 8,
					end: 15
				}),
				frameRate: 12,
				repeat: -1
			})
			this.anims.create({
				key: 'goLeft',
				frames: this.anims.generateFrameNumbers('player', {
					start: 16,
					end: 23
				}),
				frameRate: 12,
				repeat: -1
			})
			this.anims.create({
				key: 'goRight',
				frames: this.anims.generateFrameNumbers('player', {
					start: 24,
					end: 31
				}),
				frameRate: 12,
				repeat: -1
			})
			this.anims.create({
				key: 'spin',
				frames: this.anims.generateFrameNumbers('coin', {
					start: 0,
					end: 9
				}),
				frameRate: 10,
				repeat: -1
			})
			this.anims.create({
				key: 'goDownEnemy',
				frames: this.anims.generateFrameNumbers('enemy', {
					start: 0,
					end: 7
				}),
				frameRate: 12,
				repeat: -1
			})
			this.anims.create({
				key: 'goUpEnemy',
				frames: this.anims.generateFrameNumbers('enemy', {
					start: 8,
					end: 15
				}),
				frameRate: 12,
				repeat: -1
			})
			this.anims.create({
				key: 'goLeftEnemy',
				frames: this.anims.generateFrameNumbers('enemy', {
					start: 16,
					end: 23
				}),
				frameRate: 12,
				repeat: -1
			})
			this.anims.create({
				key: 'goLeftEnemy',
				frames: this.anims.generateFrameNumbers('enemy', {
					start: 16,
					end: 23
				}),
				frameRate: 12,
				repeat: -1
			})
			this.anims.create({
				key: 'goRightEnemy',
				frames: this.anims.generateFrameNumbers('enemy', {
					start: 24,
					end: 31
				}),
				frameRate: 12,
				repeat: -1
			})
			
			this.scene.start('Menu');
		}
	
}
