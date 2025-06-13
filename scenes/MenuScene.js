export default class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'menu' });
    }

    create ()
    {
        this.add.image(400, 300, 'scene-menu');
        let startButton = this.add.image(400, 450, 'start');
        startButton.setInteractive({ cursor: 'pointer' });
        this.tweens.add({
            targets: startButton,
            alpha: 0,
            ease: 'Linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        });
        startButton.on('pointerdown', () => {
            this.scene.start('intro');
        });
    }
}