export default class MissionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mission' });
    }

    create() {
        this.add.image(400, 300, 'scene-mission');
        this.input.on('pointerdown', () => {
            this.scene.start('toBeContinued');
        });
    }
}
