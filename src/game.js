import Phaser, {Game} from "phaser";
import './css/main.css'
import loadState from './scenes/load'
import bootState from './scenes/boot'
import menuState from './scenes/menu'
import stage1State from './scenes/stage1'
import stage2State from './scenes/stage2'
import endState from './scenes/end'



const canvas = document.getElementById('game-canvas')
const config = {
	type: Phaser.WEB_GL,
	width: window.innerWidth,
	height: window.innerHeight,
	canvas,	
	physics: {
	  default: 'arcade',	  
	},
	scene: [
	  loadState,
	  bootState,
	  menuState,
	  stage1State,
	  stage2State,
	  endState

	]
}

export const game = new Game(config)

console.log(game, 'aqui')

game.scene.start('boot')

