import Graph from '../lib/Graph.js';
export default class PlaceScene extends Phaser.Scene {
  constructor() {
    super({ key: 'place' });
  }

  preload() {
    // Assure-toi que l'image est préchargée dans PreloadScene.js
    // this.load.image('casbah-scene', 'assets/images/casbah-scene.png');
  }

  create() {
    this.graph = new Graph();
    // Ajout des lieux dans le graphe
    this.graph.addLocation('Place');
    this.graph.addLocation('Ship');
    this.graph.addLocation('Home');

    // Connexion des lieux
    this.graph.connectLocations('Place', 'Ship');
    this.graph.connectLocations('Place', 'Home');

    // Associe les lieux aux clés d'image
    const locationImages = {
        'Place': 'scene-place',
        'Ship': 'scene-ship',
        'Home': 'scene-home'
    };

    // Récupère le nom du lieu actuel
    this.currentLocation = this.registry.get('currentLocation');

    // Affiche le nom du lieu
    this.add.text(20, 20, `Location : ${this.currentLocation}`, {
        font: '20px Arial',
        fill: '#ffffff'
    });

    // Affichage de l'image de fond
    this.add.image(400, 300, locationImages[this.currentLocation]);

    // Affiche les boutons de navigation
    const connections = this.graph.getConnections(this.currentLocation);
    connections.forEach((loc, idx) => {
        const btn = this.add.text(50, 100 + idx * 40, `Go to ${loc}`, {
            font: '18px Arial',
            fill: '#0f0',
            backgroundColor: '#222',
            padding: { x: 5, y: 3 }
        }).setInteractive({ cursor: 'pointer' });

        btn.on('pointerdown', () => {
            console.log(`Navigating to ${loc}...`);
            // Met à jour le lieu actuel dans le registre
            this.registry.set('currentLocation', loc);
            this.scene.restart();
        });
    });

    if (this.currentLocation === 'Ship') {
        const shipBtn = this.add.text(600, 500, 'Enter Ship', {
            font: '18px Arial',
            fill: '#fff',
            backgroundColor: '#007700',
            padding: { x: 10, y: 5 }
        }).setInteractive({ cursor: 'pointer' });

        shipBtn.on('pointerdown', () => {
            this.scene.start('desk');
        });
    }
  }
}