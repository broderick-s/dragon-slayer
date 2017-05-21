var app = new Vue({
    el: '#app',
    data: {
        gameStarted: false,
        playerHealth: 100,
        enemyHealth: 100,
        attackLog: [],
        playerHealthBar: {
            width: '' + this.playerHealth + '%'
        },
        enemyHealthBar: {
            width: '' + this.enemyHealth + '%'
        }
    },
    methods: {
        attack: function (modifier = '') {
            playerAttack = this.playerAttackPower(modifier);
            enemyAttack = this.enemyAttackPower();

            this.playerHealth -= enemyAttack;
            this.enemyHealth -= playerAttack;
            this.updateHealthBar();

            this.attackLog.push({
                playerAttack: playerAttack,
                enemyAttack: enemyAttack
            });

            this.checkForWin();
        },
        // Probably not best to pass modifier through 2 methods. Look for better way.
        playerAttackPower: function (modifier = '') {
            min = modifier === 'special' ? 10 : 5;
            max = modifier === 'special' ? 15 : 10;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        enemyAttackPower: function () {
            const min = 5;
            const max = 15;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        heal: function () {
            heal = 10;
            enemyAttack = this.enemyAttackPower();
            this.playerHealth = this.playerHealth + heal - enemyAttack;
            this.updateHealthBar();

            this.attackLog.push({
                playerAttack: -heal,
                enemyAttack: enemyAttack
            });

            this.checkForWin();
        },
        updateHealthBar: function () {
            this.playerHealthBar.width = this.playerHealth + '%';
            this.enemyHealthBar.width = this.enemyHealth + '%';
        },
        checkForWin: function () {
            if (this.playerHealth <= 0 && this.enemyHealth <= 0) {
                alert("You killed the dragon with your last breath... but you're dead.");
                this.endGame();
            } else if (this.playerHealth < 0) {
                alert('You lost!');
                this.endGame();
            } else if (this.enemyHealth <= 0) {
                alert('Congratulations! You slayed the dragon!!');
                this.endGame();
            }
        },
        attackerName: function (attackKey) {
            return attackKey === 'playerAttack'
                ? 'PLAYER HITS DRAGON FOR' : 'DRAGON HITS PLAYER FOR';
        },
        attackStyling: function (attackKey) {
            return attackKey === 'playerAttack' ? 'player-turn' : 'enemy-turn';
        },
        startGame: function () {
            this.gameStarted = !this.gameStarted;
            this.attackLog = [];
            this.playerHealth = 100;
            this.enemyHealth = 100;
            this.updateHealthBar();
        },
        endGame: function () {
            this.gameStarted = !this.gameStarted;
        }
    }
});