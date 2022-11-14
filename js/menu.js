class StartScene extends Phaser.Scene{
	constructor(){
		super('Menu')
	}
	create(){
		this.sndMusic = this.sound.add('music');
		this.sndMusic.play({
			volume: 0,
			loop: true
		})
		
		
		
		/* if(!localStorage.getItem('labirinto_highScore')){
			localStorage.setItem('labirinto_highScore',0);
		} */
		
		/* if(game.global.highScore > localStorage.getItem('labirinto_highScore')){
			localStorage.setItem('labirinto_highScore',game.global.highScore);
		} else {
			game.global.highScore = localStorage.getItem('labirinto_highScore');
		} */
		
		var txtHighScore = this.add.text(game.config.width / 2,350,'HIGH SCORE: ' + 100,{font:'20px emulogic',fill:'#D26111'});
			txtHighScore.setOrigin(.5).setAlpha(0)
		
	
		var txtLabirinto = this.add.text(game.config.width / 2,150,'LABIRINTO',{font:'40px emulogic',fill:'#fff'});
			txtLabirinto.setOrigin(.5);
			
		var txtPressStart = this.add.text(game.config.width / 2,250,'PRESS START',{font:'20px emulogic',fill:'#fff'});
			txtPressStart.setOrigin(.5);
		
		this.tweens.add({
			targets: txtPressStart,
			to: 250,
			duration:1000,
			yoyo: true,
			loop: -1
	
		});
		
			this.tweens.add({
				targets: txtHighScore,
				alphaTopLeft: { value: 1, duration: 500, ease: 'Power1' },
				alphaBottomRight: { value: 1, duration: 500, ease: 'Power1' },
				alphaBottomLeft: { value: 1, duration: 500, ease: 'Power1', delay: 500 },				
				yoyo: true,
				loop: -1
		
			});
		
			this.input.keyboard.addKey('enter')
				.on('down',()=>{
					this.scene.start('Scene01')
			})

		
	}
	
	startGame(){
		this.music.stop();
		this.scene.start('Stage1');
	}
}

