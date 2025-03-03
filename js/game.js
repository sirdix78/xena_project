class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameOverScreen = document.getElementById("game-end");
     this.scoreElement = document.getElementById("score");
     this.livesElement = document.getElementById("lives");
      this.player = new Player(
        this.gameScreen,
        85,
        560,
        140,
        280,
        "../images/left-img.png"
      );
      this.height = 100;
      this.width = 100;
      this.obstacles = [];
      this.score = 0;
      this.lives = 1;
      this.gameIsOver = false;
      this.gameIntervalId = null;
      this.gameLoopFrequency = Math.round(1000 / 60);
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
  
      //inside the game loop we check if the game is over
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
          //remove the red car from the array in JS
          this.obstacles.splice(i, 1);
          i--;
          //dont forget to remove the img element from the html
          currentObstacle.element.remove();
          this.lives--;
          this.livesElement.innerText = this.lives;
          //after we subtract one life, we check if its zero
          if (this.lives === 0) {
            this.gameIsOver = true;
          }
        }
  
        //check if the red passes the blue...
        //first we get a point
        //then we cut the red car out of array
        if (currentObstacle.right > 650) {
          this.score++;
          this.scoreElement.innerText = this.score;
          //remove the red car from the array in JS
          this.obstacles.splice(i, 1);
          i--;
          //dont forget to remove the img element from the html
          currentObstacle.element.remove();
       }
     }
    }
    gameOver() {
      //stop the loop from running
      clearInterval(this.gameIntervalId);
      //hide the game screen
      this.gameScreen.style.display = "none";
      //show the game over screen
      this.gameOverScreen.style.display = "block";
    }
  }