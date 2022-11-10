var menuState = {
    create: function(){
        this.music = game.add.audio('music')
        this.music.loop = true
        this.music.volume = 1        
        this.music.play()

        if(!localStorage.getItem('labirinto_hightScore')){
            localStorage.setItem('labirinto_hightScore', 0)
        }

        if(game.global.hightScore > localStorage.getItem('labirinto_hightScore')){
            localStorage.setItem('labirinto_hightScore', game.global.hightScore)
        }else{
            game.global.hightScore = localStorage.getItem('labirinto_hightScore')
        }

        var txtHightScore = 
        game.add.text(game.world.centerX, 350, 'HIGHT SCORE: '+ game.global.hightScore, {font: '20px emulogic', fill: '#D26111'})
        txtHightScore.anchor.set(.5)
        txtHightScore.alpha = 0


        var txtLabiringo = game.add.text(game.world.centerX, 150, 'LABIRINTO', {font: '40px emulogic', fill:'#fff'})
        txtLabiringo.anchor.set(.5)

        var txtPressStart = game.add.text(game.world.centerX, 550, 'PRESS START', {font: '20px emulogic', fill: '#fff'})
        txtPressStart.anchor.set(.5)

        //Efeito de animação para ir de cima para baixo (eixo Y, segundos, quando vai acontecer)
        game.add.tween(txtPressStart).to({y: 250}, 1000).start()

        //Evento disparado depois de 1 segundo
        game.time.events.add(1000, function(){
            //HightScore na tela inicial aparece depois de 0.5s e fica piscando em loop
            game.add.tween(txtHightScore).to({alpha: 1}, 500).to({alpha: 0}, 500).loop().start()
        }, this)

        //Entra no jogo apertando enter
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        enterKey.onDown.addOnce(this.startGame, this)

        

        //Entra no jogo automaticamente depois de 5s
        game.time.events.add(5000, function(){
            this.startGame()
        }, this)    
    },

    update: function(){
        if(game.input.activePointer.isDown){
            this.startGame()
        }
    },

    startGame: function(){
        this.music.stop()
        game.state.start('stage1')
    }
};
