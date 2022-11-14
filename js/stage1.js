class Scene01 extends Phaser.Scene{
	constructor(){
		super('Scene01')
		this.onGame = true;
	}
	create(){
		//Música e sons
		this.onGame = true;
		this.catchingCoin = false
		this.sndCoin = this.sound.add('getitem');
		
		this.sndLoseCoin = this.sound.add('loseitem');	
		
		this.bg = this.add.image(0,0,'bg').setOrigin(0)
		this.bg.displayWidth = 750
		this.bg.displayHeight = 500
		
		this.maze = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,3,0,0,0,0,0,0,0,0,0,0,0,3,1],
			[1,0,1,1,0,1,0,1,1,1,0,1,1,0,1],
			[1,0,1,3,0,1,3,0,0,1,0,3,1,0,1],
			[1,0,0,0,1,1,1,1,0,1,0,1,1,0,1],
			[1,0,0,0,0,1,0,2,0,0,0,0,0,0,1],
			[1,0,1,3,0,0,0,0,1,0,0,3,1,0,1],
			[1,0,1,1,1,1,0,1,1,0,1,1,1,0,1],
			[1,3,0,0,0,0,0,3,1,0,0,0,0,3,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		];
		
		this.blocks = this.physics.add.group();
		this.blocks.enableBody = true		
		this.coinPositions = [];
		
		for(var row in this.maze){
			for(var col in this.maze[row]){
				var tile = this.maze[row][col];
				
				var x = col * 50;
				var y = row * 50;
				
				if(tile === 1){
						var block = this.blocks.create(x,y,'block');
						this.physics.world.enable(block)
						block.body.immovable = true;
				} else
				if(tile === 2){
					this.player = this.add.sprite(x + 25,y + 25,'player');
					this.player.setOrigin(1);
					this.player.collideWorldBounds = true
					this.physics.world.enable(this.player)

				
				} else
				if(tile === 3){
					var position = {
						x: x + 25,
						y: y + 25
					};
					this.coinPositions.push(position);
				}
			}
		}
		
		//Inimigo
		this.enemy = this.add.sprite(75,75,'enemy');
		this.enemy.setOrigin(1);
		this.enemy.collideWorldBounds = true	
		this.enemy.direction = 'DOWN';
		this.physics.world.enable(this.enemy)

		
		//Criar a moeda
		this.coin = this.physics.add.group();		
		this.coin.position = this.newPosition();
		this.coin = this.add.sprite(position.x,position.y,'coin');
		this.coin.setOrigin(1);
		this.coin.collideWorldBounds = true
		this.physics.world.enable(this.coin)
		this.coin.play('spin')
		

		
		//coletar moeda
		this.coins = 0;
		this.txtCoins = this.add.text(15,15,'COINS: ' + this.getText(this.coins),{font:'15px emulogic',fill:'#fff'});
		
		//exibir score
		this.txtScore = this.add.text(game.config.width/2 ,15,'SCORE: ' + this.getText(100),{font:'15px emulogic',fill:'#fff'});
		this.txtScore.setOrigin(.5, 0);
		
		//controles
		this.controls = this.input.keyboard.createCursorKeys();
		
	
		
		
		   //Inicializa o timer
		this.timer = 10
		this.txtTimer = this.add.text(window.innerWidth / 2, 15, 'TIME: ' + this.time, {font: '15px emulogic', fill:'#fff'})
		   
		this.time.addEvent({
			delay: 1000,
			loop:true,
			callbackScope: this,
			callback: function(){
				this.txtTimer.text = 'TIME: ' + this.timer
				this.timer --
				if(this.timer < 0){
					this.timer = 0
				}
			}
		   })


		
		this.physics.add.overlap(this.player,this.coin,this.getCoin, null, this);
		this.physics.add.overlap(this.player,this.enemy,this.loseCoin,null,this);
		this.physics.add.collider(this.player,this.blocks);		
	}
	
	
	

	timerFunc(){
		this.timer--;
		this.txtTimer.text = 'TIME: ' + this.getText(this.timer);
	}
	
	gameOver(){
		this.onGame = false
		this.time.addEvent(this.timer).paused = true

		this.player.anims.stop();	
		this.enemy.anims.stop();	
	
		if(this.coins >= 10){
			var txtLevelComplete = this.add.text(375, 250, "LEVEL COMPLETE", {font:'20px emulogic',fill:'#fff'})
			txtLevelComplete.setAlign(1)
			this.time.addEvent({
				delay:5000,
				callback: () => {
					this.sound.pauseAll()
					this.scene.start('stage2')
				}
			})
		}else{
			var txtGameOver = this.add.text(game.config.width / 2, 250, "GAME OVER", {font: '20px emulogic', fill: '#fff'})
			txtGameOver.setAlign(1)
			this.time.addEvent({
				delay: 5000,
				callback: () => {
					this.sound.pauseAll()
					this.scene.start('Menu')
				}
			})
		}
		
	  }
	
	loseCoin(){
		this.sndLoseCoin.play();
		
		if(this.coins > 0){
			/* this.emitter.x = this.player.position.x;
			this.emitter.y = this.player.position.y;
			this.emitter.add(particles); */
			
			this.coins = 0;
			this.txtCoins.text = 'COINS: ' + this.getText(this.coins);
		}
	}
	
	moveEnemy(){
		if(Math.floor(this.enemy.x -25)%50 === 0 && Math.floor(this.enemy.y -25)%50 === 0){
			var enemyCol = Math.floor(this.enemy.x/50);
			var enemyRow = Math.floor(this.enemy.y/50);
			var validPath = [];
			
			if(this.maze[enemyRow][enemyCol-1] !== 1 && this.enemy.direction !== 'RIGHT'){
				validPath.push('LEFT');
			}
			if(this.maze[enemyRow][enemyCol+1] !== 1 && this.enemy.direction !== 'LEFT'){
				validPath.push('RIGHT');
			}
			if(this.maze[enemyRow-1][enemyCol] !== 1 && this.enemy.direction !== 'DOWN'){
				validPath.push('UP');
			}
			if(this.maze[enemyRow+1][enemyCol] !== 1 && this.enemy.direction !== 'UP'){
				validPath.push('DOWN');
			}
			
			this.enemy.direction = validPath[Math.floor(Math.random()*validPath.length)];
		}
		
		switch(this.enemy.direction){
			case 'LEFT':
				this.enemy.x -= 1;
				this.enemy.play('goLeftEnemy',true);
				break;
			case 'RIGHT':
				this.enemy.x += 1;
				this.enemy.play('goRightEnemy',true);
				break;
			case 'UP':
				this.enemy.y -= 1;
				this.enemy.play('goUpEnemy',true);
				break;
			case 'DOWN':
				this.enemy.y += 1;
				this.enemy.play('goDownEnemy',true);
				break;
			
		}
	}

	explode(pos){
		this.particles = this.add.particles('part')
		this.emitter = this.particles.createEmitter({			
			speed:20,
			maxParticles: 10,
        	lifespan: { min: 500, max: 600 },
			alpha: { start: 1, end: 0 },			
			x: pos.x,
			y:pos.y
		})
	}
	
	getCoin(){
		if(this.catchingCoin){		
			return	
		}	
		this.coin.alpha = 0
		this.explode({x: this.coin.x, y: this.coin.y})
		this.sndCoin.play();
		this.coins++;
		this.txtCoins.text = 'COINS: ' + this.getText(this.coins);
		this.catchingCoin = true
		this.repositeCoin(this.newPosition())
		
		// game.global.score += 5;
		// this.txtScore.text = 'SCORE: ' + this.getText(game.global.score);
		
		// if(game.global.score > game.global.highScore){
		// 	game.global.highScore = game.global.score;
		// }		
	}

	repositeCoin(pos){	
		this.coin = this.add.sprite(pos.x,pos.y,'coin');		
		this.coin.setOrigin(1);
		this.coin.collideWorldBounds = true
		this.physics.world.enable(this.coin)
		this.coin.play('spin')
		this.coin.alpha = 1
	}
	
	getText(value){
		if(value < 10){
			return '00' + value.toString();
		}
		if(value < 100){
			return '0' + value.toString();
		}
		return value.toString();
	}
	
	movePlayer(){
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		
		if(this.controls.left.isDown && !this.controls.right.isDown){
			this.player.body.velocity.x = -100;
			this.player.direction = "left";
		} else
		if(this.controls.right.isDown && !this.controls.left.isDown){
			this.player.body.velocity.x = 100;
			this.player.direction = "right";
		}
		
		if(this.controls.up.isDown && !this.controls.down.isDown){
			this.player.body.velocity.y = -100;
			this.player.direction = "up";
		} else
		if(this.controls.down.isDown && !this.controls.up.isDown){
			this.player.body.velocity.y = 100;
			this.player.direction = "down";
		}
		
		switch(this.player.direction){
			case "left":
				this.player.play('goLeft', true); break;
			case "right":
				this.player.play('goRight', true); break;
			case "up":
				this.player.play('goUp', true); break;
			case "down":
				this.player.play('goDown', true); break;
		}
		
		if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
			this.player.anims.stop();
		}
	}
	
	newPosition(){	
		var pos = this.coinPositions[Math.floor(Math.random() * this.coinPositions.length)];
		
		while(this.coin.position === pos){
			pos = this.coinPositions[Math.floor(Math.random() * this.coinPositions.length)];
		}
		return pos;
	}

	update(){
		if(this.onGame){		
			this.moveEnemy();
			this.movePlayer();
			
			if(this.timer === 0 || this.coins >= 10){
				this.gameOver();
			}
			
		}
	}
}

