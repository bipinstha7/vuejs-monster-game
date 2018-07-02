new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      // Player attack to Monster
      let damage = this.calculateDamage(3, 10);

      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`
      });

      // Monster attack to Player
      damage = this.calculateDamage(5, 12)
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      });

      this.checkWin();
    },
    specialAttack: function() {
      // Player special attack to Monster
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits hard Monster for ${damage}`
      });

      // Monster special attack to Player
      damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits hard Player for ${damage}`
      });
      this.checkWin();
    },
    heal: function() {
      this.playerHealth +=10;
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      });
      this.playerHealth -= this.calculateDamage(5, 12);
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          return this.startGame();
        }
        return this.gameIsRunning = false;
      } else if (this.playerHealth <= 0) {
          if (confirm('You lost! New Game?')) {
            return this.startGame();
          }
          return this.gameIsRunning = false;
      }
    }
  }
});