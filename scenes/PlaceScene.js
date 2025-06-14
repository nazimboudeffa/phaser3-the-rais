import Graph from '../lib/Graph.js';
import Missions from '../lib/Missions.js';
export default class PlaceScene extends Phaser.Scene {
  constructor() {
    super({ key: 'place' });
  }

  preload() {
    // Assure-toi que l'image est préchargée dans PreloadScene.js
    // this.load.image('casbah-scene', 'assets/images/casbah-scene.png');
  }

  create() {
    // Initialiser les valeurs une seule fois
    if (!this.registry.has('gold')) {
        this.registry.set('gold', 50);
    }

    if (!this.registry.has('inventory')) {
        this.registry.set('inventory', ['Map']);
    }

    if (!this.registry.has('missions')) {
        this.registry.set('missions', Missions);
    }

    // Crée un graphe pour gérer les lieux
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


    const gold = this.registry.get('gold');
    if (gold === undefined) {
      this.registry.set('gold', 0);
    }
    this.add.image(750, 50, 'coin').setOrigin(0.5).setScale(0.5); // Affiche l'icône de la pièce d'or
    this.add.text(750, 100, `${this.registry.get('gold')}`, {
        font: '20px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);

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
            this.scene.start('desk', {});
        });
    }

    if (this.currentLocation === 'Home') {
        const homeBtn = this.add.text(600, 500, 'Enter Home', {
            font: '18px Arial',
            fill: '#fff',
            backgroundColor: '#007700',
            padding: { x: 10, y: 5 }
        }).setInteractive({ cursor: 'pointer' });

        homeBtn.on('pointerdown', () => {
            this.scene.start('home-interior');
        });
    }
  }
}