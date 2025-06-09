export default class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'menu', active: false });
    }

    create ()
    {
        this.add.image(400, 300, 'the-rais');
        let startButton = this.add.image(400, 450, 'start');
        startButton.setInteractive({ cursor: 'pointer' });
        this.tweens.add({
            targets: startButton,
            alpha: 0,
            ease: 'Linear1',
            duration: 500,
            repeat: -1,
            yoyo: true
        });
        startButton.on('pointerdown', () => {
            this.scene.start('intro');
        });
    }
}