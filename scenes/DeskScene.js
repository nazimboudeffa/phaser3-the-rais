export default class DeskScene extends Phaser.Scene {
    constructor() {
        super({ key: 'desk' });
    }

    create() {
        this.showMissionSelection();
    }

    showMissionSelection() {
        // Affiche le fond de la scène du navire
        this.add.image(400, 300, 'scene-desk'); 

        // Affiche le titre et la liste des missions disponibles
        this.add.text(20, 20, 'Available Missions:', { font: '24px Arial', fill: '#ffffff' });
        
        const missions = [
            {
                title: "Escort a merchant ship to Netherlands",
                danger: "Moderate",
                reward: 150,
                duration: "2 days"
            },
            {
                title: "Protect a convoy bound for Tunis",
                danger: "High",
                reward: 300,
                duration: "4 days"
            },
            {
                title: "Escort a local trader to Ajaccio",
                danger: "Low",
                reward: 100,
                duration: "1 day"
            }
        ];

        const startY = 100;
        const spacing = 120;

        missions.forEach((mission, index) => {
            const y = startY + index * spacing;

            this.add.text(100, y, mission.title, { font: '20px Arial', fill: '#ffffff' });
            this.add.text(100, y + 25, `Danger: ${mission.danger} | Reward: ${mission.reward} coins | Duration: ${mission.duration}`, { font: '16px Arial', fill: '#cccccc' });

            const button = this.add.text(100, y + 55, 'Accept Mission', { font: '16px Arial', fill: '#00ff00' })
                .setInteractive({ cursor: 'pointer' })
            button.on('pointerdown', () => this.startMission(mission));
        });
    }

    startMission(mission) {
        // Ici tu peux stocker les données de mission dans un système de gestion globale
        console.log("Mission accepted :", mission.title);
        // Transition vers une autre scène de navigation ou d’escorte
        this.scene.start('mission', { mission });
    }
}