export default class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'load'});
    }

    preload ()
    {
        // Dimensions
        const { width, height } = this.cameras.main;

        // Barre visuelle
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        // Texte de chargement
        const loadingText = this.add.text(width / 2, height / 2 - 60, 'Loading...', {
            font: '20px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        const percentText = this.add.text(width / 2, height / 2, '0%', {
            font: '18px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Mise à jour du pourcentage
        this.load.on('progress', (value) => {
            percentText.setText(`${Math.floor(value * 100)}%`);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        // Clean-up une fois terminé
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Chargement des ressources
        this.load.image('scene-menu', 'assets/menu-800x600.png');
        this.load.image('start', 'assets/start.png');
        this.load.image('scene-intro', 'assets/intro-800x600.png');
        this.load.image('scene-place', 'assets/place-800x600.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('scene-ship', 'assets/ship-800x600.png');
        this.load.image('scene-desk', 'assets/desk-800x600.png');
        this.load.image('scene-mission', 'assets/mission-800x600.png');
        this.load.image('scene-home', 'assets/home-800x600.png');
        this.load.image('scene-home-interior', 'assets/home-interior-800x600.png');
        this.load.image('inventory-map', 'assets/map-1536x1024.png'); // Assurez-vous que le chemin est correct
        this.load.image('scene-battle', 'assets/battle-800x600.png');
    }

    create ()
    {
        this.scene.start('menu');
    }
}