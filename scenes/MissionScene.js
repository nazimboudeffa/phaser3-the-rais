export default class MissionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mission' });
    }

    init(data) {
        this.mission = data.mission;
        this.missionSuccess = true; // Par défaut, on suppose que la mission réussit
    }

    create() {
         if (typeof this.loot !== 'number') {
            this.loot = 0;
        }

        this.add.image(400, 300, 'scene-mission');

        this.add.text(20, 20, `Mission: ${this.mission.title}`, { font: '20px Arial', fill: '#ffffff' });

        this.createProgressBar();

        // Ajoute ici ton navire, ennemi, etc.
        this.events.on('battle-resolved', (data) => {

            if (typeof data.battleResult !== 'undefined') {
                this.missionSuccess = data.battleResult;
            }
        });

    }

    createProgressBar() {
        const days = parseInt(this.mission.duration);
        if (isNaN(days)) {
            console.error("Invalid mission duration:", this.mission.duration);
            this.totalTime = 3000; // fallback de sécurité
        } else {
            this.totalTime = days * 3000;
        }

        const bg = this.add.rectangle(100, 60, 400, 20, 0x444444).setOrigin(0, 0.5);
        this.progressBar = this.add.rectangle(100, 60, 0, 20, 0x00aa00).setOrigin(0, 0.5);

        this.elapsed = 0;

        // Marqueurs d’événement : 25%, 50%, 75%
        this.eventTriggers = [0.25, 0.5, 0.75];
        this.triggered = [];

        this.progressTimer = this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.elapsed += 100;
                const percent = Phaser.Math.Clamp(this.elapsed / this.totalTime, 0, 1);
                console.log(`Progress: ${percent * 100}%`);

                this.progressBar.width = 400 * percent;

                this.eventTriggers.forEach(trigger => {
                    if (percent >= trigger && !this.triggered.includes(trigger)) {
                        this.triggered.push(trigger);
                        console.log("Triggering event at:", trigger);
                        try {
                            this.triggerEncounter(trigger);
                        } catch (e) {
                            console.error("Encounter error:", e);
                        }
                    }
                });

                if (percent >= 1) {
                    console.log("Calling missionSuccess()");
                    this.showMissionResult();
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

    showMissionResult() {
        const message = this.missionSuccess ? 'Mission Success!' : 'Mission Failed...';
        const color = this.missionSuccess ? '#00ff00' : '#ff5555';

        this.add.text(400, 300, message, {
            font: '24px Arial',
            fill: color,
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // Retour
        this.time.delayedCall(2000, () => {
            this.scene.start('desk', {
                completedMission: this.mission,
                missionSuccess: this.missionSuccess,
            });
        });
    }

    spawnEnemy() {
        console.log("Enemy ship spawned!");
        this.scene.pause();
        this.scene.launch('battle', {
            returnScene: 'mission'
        });
    }

}

