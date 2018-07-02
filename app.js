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
    },
    attack: function() {
      // Monster Health
      let damage = this.calculateDamage(3, 10);

      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`
      });

      // Player Health
      damage = this.calculateDamage(5, 12)
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      });

      this.checkWin();
    },
    specialAttack: function() {
      this.monsterHealth -= this.calculateDamage(10, 20);
      this.playerHealth -= this.calculateDamage(5, 12);
      this.checkWin();
    },
    heal: function() {
      this.playerHealth +=10;
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
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