export default class MissionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mission' });
    }

    init(data) {
        this.mission = data.mission;
    }

    create() {
        this.add.image(400, 300, 'scene-mission');

        this.add.text(20, 20, `Mission: ${this.mission.title}`, { font: '20px Arial', fill: '#ffffff' });

        this.createProgressBar();

        // Ajoute ici ton navire, ennemi, etc.
    }

    createProgressBar() {
        const days = parseInt(this.mission.duration);
        const totalTime = days * 3000;

        const bg = this.add.rectangle(100, 60, 400, 20, 0x444444).setOrigin(0, 0.5);
        this.progressBar = this.add.rectangle(100, 60, 0, 20, 0x00aa00).setOrigin(0, 0.5);

        this.elapsed = 0;
        this.totalTime = totalTime;

        // Marqueurs d’événement : 25%, 50%, 75%
        this.eventTriggers = [0.25, 0.5, 0.75];
        this.triggered = [];

        this.progressTimer = this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.elapsed += 100;
                const percent = Phaser.Math.Clamp(this.elapsed / this.totalTime, 0, 1);
                this.progressBar.width = 400 * percent;

                // Check si on a atteint un point de rencontre
                this.eventTriggers.forEach(trigger => {
                    if (percent >= trigger && !this.triggered.includes(trigger)) {
                        this.triggered.push(trigger);
                        this.triggerEncounter(trigger);
                    }
                });

                if (percent >= 1) {
                    this.missionSuccess();
                }
            }
        });
    }

    triggerEncounter(trigger) {
        const encounterTypes = ["enemy", "storm", "ally", "loot"];
        const type = Phaser.Utils.Array.GetRandom(encounterTypes);

        switch (type) {
            case "enemy":
                this.showDialogue("Enemy ship approaching! Prepare for battle!");
                this.spawnEnemy();
                break;
            case "storm":
                this.showDialogue("A sudden storm hits! Visibility drops.");
                // Tu peux simuler ralentissement ou perte de contrôle
                break;
            case "ally":
                this.showDialogue("An allied ship passes by and offers supplies.");
                // Bonus fictif ou boost ?
                break;
            case "loot":
                this.showDialogue("Floating cargo found in the water!");
                // Ajoute un mini objectif secondaire
                break;
        }
    }

    showDialogue(text) {
        if (this.dialogueBox) this.dialogueBox.destroy();

        this.dialogueBox = this.add.text(100, 100, text, {
            font: '18px Arial',
            fill: '#ffffaa',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });

        this.time.delayedCall(3000, () => {
            if (this.dialogueBox) this.dialogueBox.destroy();
        });
    }

    missionSuccess() {
        if (this.missionAlreadyCompleted) return; // pour éviter même double appel accidentel
        this.missionAlreadyCompleted = true;

        this.progressTimer.remove(false); // 🔒 stoppe le timer

        this.add.text(400, 300, 'Mission Accomplished!', {
            font: '24px Arial',
            fill: '#00ff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // Ajouter la récompense
        const currentGold = this.registry.get('gold');
        this.registry.set('gold', currentGold + parseInt(this.mission.reward));

        console.log("Current gold:", currentGold);
        console.log("Reward:", this.mission.reward);
        console.log("Gold after:", currentGold + parseInt(this.mission.reward));

        // Marquer la mission comme accomplie
        const missions = this.registry.get('missions');
        const updated = missions.map(m => {
            if (m.id === this.mission.id) {
                return { ...m, completed: true };
            }
            return m;
        });
        this.registry.set('missions', updated);

        // Retour
        this.time.delayedCall(2000, () => {
            this.scene.start('desk');
        });
    }

    spawnEnemy() {
        // Logique pour générer un ennemi
        console.log("Enemy ship spawned!");
        // Tu peux ajouter une scène de combat ou un mini-jeu ici
    }

}

