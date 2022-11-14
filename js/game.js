let game

window.onload = function(){
	const config = {
		type: Phaser.Canvas,
		width: 720,
		height: 475,
		global:{
			score: 0
		},
		scene: [Preload,StartScene,Scene01,Scene02,EndScene],		
		physics: {
			default: 'arcade'			
		},
	}

	game = new Phaser.Game(config)
}
