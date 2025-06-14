export default class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'battle' });
    }

    init(data) {
        this.returnScene = data.returnScene || 'mission';
    }

    create() {
        this.add.image(400, 300, 'scene-battle'); // Add appropriate key

        // Health
        this.playerHP = 100;
        this.enemyHP = 100;

        this.createHPBars();

        const attackBtn = this.add.text(320, 400, 'Attack', {
            font: '24px Arial',
            fill: '#fff',
            backgroundColor: '#007700',
            padding: { x: 10, y: 5 }
        }).setInteractive({ cursor: 'pointer' });

        attackBtn.on('pointerdown', () => this.attackEnemy());
    }

    createHPBars() {
        this.playerBar = this.add.rectangle(200, 250, 100, 10, 0x00ff00);
        this.enemyBar = this.add.rectangle(600, 250, 100, 10, 0xff0000);
    }

    attackEnemy() {
        const playerDamage = Phaser.Math.Between(10, 20);
        const enemyDamage = Phaser.Math.Between(5, 15);

        this.enemyHP -= playerDamage;
        this.playerHP -= enemyDamage;

        this.enemyBar.width = Math.max(this.enemyHP, 0);
        this.playerBar.width = Math.max(this.playerHP, 0);

        if (this.enemyHP <= 0) {
            this.endBattle(true);
        } else if (this.playerHP <= 0) {
            this.endBattle(false);
        }
    }

    endBattle(playerWon) {
        this.add.text(400, 150, playerWon ? 'Victory !' : 'Defeat...', {
            font: '24px Arial',
            fill: '#ffff00'
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            this.scene.stop();
            this.scene.resume(this.returnScene);
            this.scene.get(this.returnScene).events.emit('battle-resolved', {
                battleResult: playerWon
            });
        });
    }
}