import Phaser, { Scene } from "phaser"

class bootState extends Scene {
    constructor() {
        super("boot");
    }    
    preload(){
        game.load.image('progressBar', 'img/progressBar.png')
    }
    create(){
        game.scene.start('load')
    }
};
export default bootState