window.onload = function () {
  const startButtonElement = document.getElementById("start-button");
  const restartButtonElement = document.getElementById("restart-button");
  let ourNewGame;
  //all the event listeners here
  startButtonElement.addEventListener("click", function () {
    ourNewGame = new Game();
    startGame();
  });
  restartButtonElement.addEventListener("click", () => {
    //refresh the page to start again
    // window.location.reload();
    //hide the game over
    ourNewGame.gameOverScreen.style.display = "none";
    //show the game screen
    ourNewGame.gameScreen.style.display = "block";
    //remove the image of the player from the first game
    ourNewGame.player.element.remove();
    //this reassigns the ourNewGame variable
    ourNewGame = new Game();
    ourNewGame.start();
  });

  // keyboard event listeners
  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
      ourNewGame.player.directionY = -5;
    } else if (event.code === "ArrowDown") {
      ourNewGame.player.directionY = 5;
    } else if (event.code === "ArrowLeft") {
      ourNewGame.player.directionX = -5;
    } else if (event.code === "ArrowRight") {
      ourNewGame.player.directionX = 5;
    }else if (event.code === "Space") {
      const theWarriorLeft = ourNewGame.player.positionLeft;
      const theWarriorTop = ourNewGame.player.positionTop;
      ourNewGame.swords.push(new Sword(ourNewGame.gameScreen,
      theWarriorLeft + 120, theWarriorTop));
      setTimeout(() => {
        if (ourNewGame.swords[0]){
          ourNewGame.swords[0].element.remove();
          ourNewGame.swords.pop(); 
        }
        }, 3000);  
        }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowUp") {
      ourNewGame.player.directionY = 0;
    } else if (e.code === "ArrowDown") {
      ourNewGame.player.directionY = 0;
    } else if (e.code === "ArrowLeft") {
      ourNewGame.player.directionX = 0;
    } else if (e.code === "ArrowRight") {
      ourNewGame.player.directionX = 0;
    }else if (e.code === "Space") {
      // ourNewGame.swords[0].element.remove();
      // ourNewGame.swords.pop();
    }
  });
  
  //all of my functions here
  function startGame() {
    console.log("start game");
    ourNewGame.start();
  }
};