export default class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'map' });
    }

    preload() {
        this.load.image('inventory-map', 'assets/map.png'); // adapte le chemin
    }

    create() {
        this.mapImage = this.add.image(0, 0, 'inventory-map').setOrigin(0, 0);
        this.cameras.main.setBounds(0, 0, this.mapImage.width, this.mapImage.height);

        // Camera movement for navigating the map
        let cam = this.cameras.main;

        this.input.on("pointermove", function (p) {
            if (!p.isDown) return;
        
            cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
            cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
        });

        const backBtn = this.add.text(20, 20, '← Back', {
            font: '20px Arial',
            fill: '#ffffff',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 }
        })
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0) // ← Fixe à l’écran
        .setDepth(10)       // ← Toujours au-dessus

        backBtn.on('pointerdown', () => {
            this.scene.start('home-interior');
        });
    }
}