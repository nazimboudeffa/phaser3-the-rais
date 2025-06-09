import LoadScene from './scenes/LoadScene.js';
import MenuScene from './scenes/MenuScene.js';
import IntroScene from './scenes/IntroScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#1b1b1b',
    width: 800,
    height: 600,
    scene: [
        LoadScene, MenuScene, IntroScene
    ],
    scale : {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600
    },
};

const game = new Phaser.Game(config);
game.scene.start('load');