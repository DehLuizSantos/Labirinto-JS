var stage1State = {
    create: function(){
        this.music = game.add.audio('music')
        this.music.loop = true
        this.music.volume = 1        
        this.music.play()

        this.sndCoin = game.add.audio('getitem')
        this.sndCoin.volume = .5

        this.sndLoseCoin = game.add.audio('loseitem')
        this.sndLoseCoin.volume = .5
        //Background do jogo
        game.add.sprite(0,0, 'bg')


        //Matriz do labirinto
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
        ]
        //Posição das coins
        this.coinPositions = []
        //Bloco
        this.blocks = game.add.group()

        this.blocks.enableBody = true

        //Estrutura do labirinto
        for(var row in this.maze){
            for(var col in this.maze[row]){
                var tile = this.maze[row][col]

                var x = col * 50
                var y = row * 50

                if(tile === 1){
                    //Cria os blocos imoveis (item 1 do array)
                    var block = this.blocks.create(x, y, 'block')
                    block.body.immovable = true
                }
                if(tile === 2){
                    //Renderiza o player no centro matriz
                    this.player = game.add.sprite(x + 25, y + 25, 'player')
                    this.player.anchor.set(.5)
                    //Liga o corpo fisico do player
                    game.physics.arcade.enable(this.player)
                    //Animação do boneco com a imagem 12 frames por segundo e loop
                    this.player.animations.add('goDown',[0,1,2,3,4,5,6,7], 12, true)
                    this.player.animations.add('goUp',[8,9,10,11,12,13,14,15], 12, true)
                    this.player.animations.add('goLeft',[16,17,18,19,20,21,22,23], 12, true)
                    this.player.animations.add('goRight',[24,25,26,27,28,29,30,31], 12, true)
                }else
                if(tile === 3){
                    var position = {
                        x: x + 25,
                        y: y + 25
                    }
                    this.coinPositions.push(position)

                }
            }
        }

        //Inimigo
        this.enemy = game.add.sprite(75, 75, 'enemy')
        this.enemy.anchor.set(.5)
        game.physics.arcade.enable(this.enemy)
        this.enemy.animations.add('goDown',[0,1,2,3,4,5,6,7], 12, true)
        this.enemy.animations.add('goUp',[8,9,10,11,12,13,14,15], 12, true)
        this.enemy.animations.add('goLeft',[16,17,18,19,20,21,22,23], 12, true)
        this.enemy.animations.add('goRight',[24,25,26,27,28,29,30,31], 12, true)
        this.enemy.direction = 'DOWN'

        //Criar a moeda, moeda roda e está ligada a eventos fisicos
        this.coin = {}
        this.coin.position = this.newPosition()
        this.coin = game.add.sprite(this.coin.position.x, this.coin.position.y, 'coin')
        this.coin.anchor.set(.5)
        this.coin.animations.add('spin',[0,1,2,3,4,5,6,7,8,9], 10, true).play()
        game.physics.arcade.enable(this.coin)

        //Coletar moedas
        this.coins = 0
        this.txtCoins = game.add.text(15,15, 'COINS: ' + this.getText(this.coins), {font: '15px emulogic', fill: '#fff'})

        //Controler
        this.controls = game.input.keyboard.createCursorKeys()

        //Particulas
        this.emitter = game.add.emitter(0,0,15)
        this.emitter.makeParticles('part')
        this.emitter.setXSpeed(-50, 50)
        this.emitter.setYSpeed(-50, 50)
        this.emitter.gravity.y = 0

    },

    //Função que ocorre a cada mudança
    update: function(){
        //Declara que o player e os blocos são "fisicos" e colidem
        game.physics.arcade.collide(this.player, this.blocks)
        //Declara que o player e as moedas são "fisicas" e quando você passa por cima, dispara a função (ultimo parametro função verificadora)
        game.physics.arcade.overlap(this.player,this.coin,this.getCoin,null,this);
        //Colisão do player com o inimigo
        game.physics.arcade.overlap(this.player, this.enemy, this.loseCoin, null, this)

        this.movePlayer()
        this.moveEnemy()
    },

    loseCoin: function(){
        this.sndLoseCoin.play()
        
        if(this.coins > 0){
            //Dispara a particula caso seja a mesma posição
            this.emitter.x = this.player.position.x
            this.emitter.y = this.player.position.y
            //Cria a colição caso tenha moedas a perder
            this.emitter.start(true, 500, null, 15)

            this.coins = 0
            this.txtCoins.text = 'COINS: ' + this.getText(this.coins)
        }
    },

    moveEnemy: function(){
        //Se o inimigo está no centro de uma celula
        if(Math.floor(this.enemy.x - 25)%50 === 0 && (this.enemy.y - 25)%50 === 0){
            //Captura o endereço da coluna e linha
            var enemyCol = Math.floor(this.enemy.x / 50)
            var enemyRow = Math.floor(this.enemy.y / 50)
            //Posiveis caminhos para onde ele pode ir
            var validPath = []
            //Se a "celula do personagem estiver vazia (!== bloco || moeda), e ele não estiver indo para o outro lado"
            if(this.maze[enemyRow][enemyCol-1] !== 1 && this.enemy.direction !== "RIGHT"){
                //Caso seja um caminho valido, inclua a direção no validPath
                validPath.push("LEFT")
            }
            if(this.maze[enemyRow][enemyCol+1] !== 1 && this.enemy.direction !== "LEFT"){
                validPath.push("RIGHT")
            }
            if(this.maze[enemyRow-1][enemyCol] !== 1 && this.enemy.direction !== "DOWN"){
                validPath.push("UP")
            }
            if(this.maze[enemyRow+1][enemyCol] !== 1 && this.enemy.direction !== "RIGHT"){
                validPath.push("DOWN")
            }
            //Direção aleatoria do inimigo
            this.enemy.direction = validPath[Math.floor(Math.random()*validPath.length)]
        }

        switch(this.enemy.direction){
            case 'LEFT':
                this.enemy.x -= 1
                this.enemy.animations.play("goLeft")
                break
            case 'RIGHT':
                this.enemy.x += 1
                this.enemy.animations.play("goRight")
                break
            case 'UP':
                this.enemy.y -= 1
                this.enemy.animations.play("goUp")
                break
            case 'DOWN':
                this.enemy.y += 1
                this.enemy.animations.play("goDown")
                break
        }
    },

    //Pega a moeda
    getCoin: function(){
        this.emitter.x = this.player.position.x
        this.emitter.y = this.player.position.y
        //Cria a colição caso tenha moedas a perder
        this.emitter.start(true, 500, null, 15)
        
        //Toca o som de pegar a moeda
        this.sndCoin.play()
        //Aumenta o coin pra + 1
        this.coins++
        //Altera o texto para coins novamente (coin + 1)
        this.txtCoins.text = 'COINS: ' + this.getText(this.coins)
        //Da uma nova posição para o coin
        this.coin.position = this.newPosition()
    },

    //Formata o valor padrão da pontuação
    getText: function(value){
        if(value < 10){
            return '00' + value.toString()
        }
        if(value < 100){
            return '0' + value.toString()
        }
        return value.toString()
    },
    movePlayer: function(){
        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0
        if(this.controls.left.isDown && !this.controls.right.isDown){
            this.player.body.velocity.x = -100
            this.player.direction = 'left'
        } else

        if(this.controls.right.isDown && !this.controls.left.isDown){
            this.player.body.velocity.x = 100
            this.player.direction = 'right'
        } else

        if(this.controls.up.isDown && !this.controls.down.isDown){
            this.player.body.velocity.y = -100
            this.player.direction = 'up'
        } else

        if(this.controls.down.isDown && !this.controls.up.isDown){
            this.player.body.velocity.y = 100
            this.player.direction = 'down'
        }
        switch(this.player.direction){
            case 'left':
                this.player.animations.play('goLeft')
                break
            case 'right':
                this.player.animations.play('goRight')
                break
            case 'up':
                this.player.animations.play('goUp')
                break
            case 'down':
                this.player.animations.play('goDown')
                break            
        }
        if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
            this.player.animations.stop()
        }
    },

    newPosition: function(){
        //Gera um valor aleatorio entre 0 e 6
        var pos = this.coinPositions[Math.floor(Math.random() * this.coinPositions.length)]
        while(this.coin.position === pos){
          pos = this.coinPositions[Math.floor(Math.random() * this.coinPositions.length)]
        }

        return pos
    }
};
