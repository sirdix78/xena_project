class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameOverScreen = document.getElementById("game-end");
      this.scoreElement = document.getElementById("score");
      this.highScoresListElement = document.getElementById("high-scores");
      this.livesElement = document.getElementById("lives");
      this.player = new Player(
        this.gameScreen,
        85,
        350,
        170,
        320,
        "./images/left1-img.png"
      );
      this.height = 100;
      this.width = 100;
      this.obstacles = [];
      this.swords = [];
      this.score = 1;
      this.lives = 3;
      this.gameIsOver = false;
      this.gameIntervalId = null;
      this.gameLoopFrequency = Math.round(900 / 60);
      this.counter = 0;
    }
  
    start() {
      //set the height and width of the game screen
      this.gameScreen.style.height = `${this.height}vh`;
      this.gameScreen.style.width = `${this.width}vw`;
      //hide the start screen and show the game screen
      this.startScreen.style.display = "none";
      this.gameScreen.style.display = "flex";
      this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      }, this.gameLoopFrequency);
    }
    gameLoop() {
      console.log("game loop");
      //create a counter variable that increases on every frame
      this.counter++;
      if (this.counter % 160 === 0) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
    this.update();
      if (this.gameIsOver) {
        this.gameOver();
      }
   }
    update() {
      //this moves the player Xena
      this.player.move();
      //this moves all of the obstacles inside the this.obstacles array
      for (let i = 0; i < this.obstacles.length; i++) {
        const currentObstacle = this.obstacles[i];
        currentObstacle.move();
        //check if the obstacle is colliding with the player
        if (this.player.didCollide(currentObstacle)) {
          //remove the obstacle from the array in JS
          this.obstacles.splice(i, 1);
          i--;
          //remove the img element from the html
          currentObstacle.element.remove();
          this.lives--;
          this.livesElement.innerText = this.lives;
          //after we subtract one life, we check if its zero
          if (this.lives === 0) {
            this.gameIsOver = true;
            console.log('game is over');
          }
        } 
        //check if the obstacle gets out of the screen
        if (currentObstacle.left < 0) {
          this.score++;
          this.scoreElement.innerText = this.score;
          //remove the obstacle from the array in JS
          this.obstacles.splice(i, 1);
          i--;
          //remove the img element from the html
          currentObstacle.element.remove();
       }
      //this is where we start with the swordAttack
      for (let j = 0; j < this.swords.length; j++) {
        const currentSword = this.swords[j];
        //every sword has the didCollide method
        if (currentSword.didCollide(currentObstacle)) {
          let sound = new Audio('../assets/sword-sound.mp3');
          sound.volume = 0.1;
          sound.play();
          this.obstacles.splice(i, 1);
          i--;
          //remove the img element from the html
          currentObstacle.element.remove();
          //remove all of the swords
          this.swords.splice(j, 1);
          j--;
            currentSword.element.remove();
        }
      }
    }
    //this is a loop just to move the sword
    for (let k = 0; k < this.swords.length; k++) {
      const currentSword = this.swords[k];
      currentSword.updatePosition();
    }
    if (this.gameIsOver) {
      this.gameOver();
    }
   }
    gameOver() {
      //stop the loop from running
      clearInterval(this.gameIntervalId);
      //hide the game screen
      this.gameScreen.style.display = "none";
      //show the game over screen
      this.gameOverScreen.style.display = "block";

      //logic for the high scores,  this is with just the scores
      this.highScoresListElement.innerHTML = '';
      const scoresInStorage = JSON.parse(localStorage.getItem("high-scores"));
      if (scoresInStorage) {
        scoresInStorage.push(this.score);
        const topThreeScores = scoresInStorage.sort((a, b) => b - a).slice(0, 3);
        localStorage.setItem("high-scores", JSON.stringify(topThreeScores));
      } else {
        localStorage.setItem("high-scores", JSON.stringify([this.score]));
      }
      const updatedScoresInStorage = JSON.parse(
        localStorage.getItem("high-scores")
      );
      updatedScoresInStorage.forEach((oneScore) => {
        const ourLiElement = document.createElement("li");
        ourLiElement.innerText = oneScore;
        this.highScoresListElement.appendChild(ourLiElement);
      });
    }
  }