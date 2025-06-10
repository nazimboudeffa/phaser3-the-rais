export default class PlaceScene extends Phaser.Scene {
  constructor() {
    super({ key: 'place' });
  }

  preload() {
    // Assure-toi que l'image est préchargée dans PreloadScene.js
    // this.load.image('casbah-scene', 'assets/images/casbah-scene.png');
  }

  create() {
    // Affichage de l'image de fond
    this.add.image(0, 0, 'place-scene').setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);

    // Titre ou texte (optionnel)
    this.add.text(this.scale.width / 2, 50, 'Welcome to the Casbah', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Georgia'
    }).setOrigin(0.5);

    // Menu avec trois boutons
    const menuItems = [
      { label: 'Go to the Ship', scene: 'ShipScene' },
      { label: 'Go Home', scene: 'HomeScene' },
    ];

    menuItems.forEach((item, index) => {
      const button = this.add.text(this.scale.width / 2, 150 + index * 60, item.label, {
        fontSize: '24px',
        color: '#ffffaa',
        backgroundColor: '#00000080',
        padding: { x: 10, y: 5 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      button.on('pointerover', () => button.setStyle({ backgroundColor: '#222222' }));
      button.on('pointerout', () => button.setStyle({ backgroundColor: '#00000080' }));
      button.on('pointerdown', () => this.scene.start('toBeContinued'));
    });
  }
}