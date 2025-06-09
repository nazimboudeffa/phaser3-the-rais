export default class ToBeContinuedScene extends Phaser.Scene {
    constructor() {
        super({ key: 'toBeContinued' });
    }

    create() {
        this.add.text(200, 200, 'To Be Continued...', {
            font: '32px Arial',
            fill: '#ff0000',
            backgroundColor: '#000',
            padding: { x: 10, y: 5 }
        });

        const btn = this.add.text(250, 300, 'Return to Main Menu', {
            font: '18px Arial',
            fill: '#0f0',
            backgroundColor: '#222',
            padding: { x: 5, y: 3 }
        }).setInteractive({ cursor: 'pointer' });

        btn.on('pointerdown', () => {
            console.log('Returning to Main Menu...');
            this.scene.start('menu'); // Assuming 'intro' is the key for the main menu scene
        });
    }
}