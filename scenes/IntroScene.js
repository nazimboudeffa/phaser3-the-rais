export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'intro' });
    }

    create() {
        this.add.image(400, 300, 'the-casbah');       

        const story = [
            "Born in the heart of Algiers, your destiny is bigger than its narrow streets.",
            "Forgotten maps and amazing cruises are calling from the deep.",
            "Forge your legend in the heart of the Empire.",
            "Welcome to the Casbah..."
        ];

        this.textIndex = 0;
        this.textDisplay = this.add.text(100, 200, 'Introduction...', {
            font: '24px Courier',
            fill: '#0f0',
            backgroundColor: '#070704',
            padding: { x: 10, y: 5 },
            wordWrap: { width: 600 }
        });

        this.time.addEvent({
            delay: 2000,
            repeat: story.length - 1,
            callback: () => {
                this.textDisplay.setText(story[this.textIndex]);
                this.textIndex++;
            }
        });

        // Start button appears after all lines
        this.time.delayedCall(story.length * 2000, () => {
            const btn = this.add.text(300, 500, 'Enter the Casbah', {
                font: '18px Arial',
                fill: '#0f0',
                backgroundColor: '#222',
                padding: { x: 5, y: 3 }
            }).setInteractive({ cursor: 'pointer' });

            btn.on('pointerdown', () => {
                console.log('Entering the Casbah...');
                this.scene.start('toBeContinued'); // Assuming 'toBeContinued' is the next scene
            });
        });
    }
}
