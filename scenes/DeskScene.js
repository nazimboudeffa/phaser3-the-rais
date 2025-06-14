export default class DeskScene extends Phaser.Scene {
    constructor() {
        super({ key: 'desk' });
    }

    init(data) {
        this.completedMission = null; // ✅ Always reset first
        this.missionSuccess = false; // ✅ Always reset first

        if (data) {
            this.completedMission = data.completedMission || null;
            this.missionSuccess = data.missionSuccess || false;
        }

        console.log('Completed mission:', this.completedMission);
        console.log('Loot:', this.loot);
    }

    create() {
        // Appliquer la récompense si on revient d’une mission
        if (this.completedMission && this.missionSuccess) {
            const gold = this.registry.get('gold') || 0;
            const reward = parseInt(this.completedMission.reward);
            this.registry.set('gold', gold + reward); // Ajoute la récompense à l’or

            const missions = this.registry.get('missions');
            const updated = missions.map(m => {
                if (m.id === this.completedMission.id) {
                    return { ...m, completed: true };
                }
                return m;
            });
            this.registry.set('missions', updated);
        }

        // Initialise les données de la scène
        this.showMissionSelection();

        // Bouton retour
        const backBtn = this.add.text(600, 500, '← Back', {
            font: '20px Arial',
            fill: '#fff',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 }
        }).setInteractive({ cursor: 'pointer' }).setDepth(1);

        backBtn.on('pointerdown', () => {
            this.scene.start('place');
        });
    }

    showMissionSelection() {
        // Affiche le fond de la scène du navire
        this.add.image(400, 300, 'scene-desk'); 

        // Affiche le titre et la liste des missions disponibles
        this.add.text(20, 20, 'Available Cruises:', { font: '24px Arial', fill: '#ffffff' });

        const allMissions = this.registry.get('missions');
        const availableMissions = allMissions.filter(m => !m.completed);

        const startY = 100;
        const spacing = 120;

        availableMissions.forEach((mission, index) => {
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