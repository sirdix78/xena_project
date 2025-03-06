class Player {
    constructor(
      gameScreen,
      positionLeft,
      positionTop,
      playerWidth,
      playerHeight,
      playerImageSrc
    ) {
      this.positionLeft = positionLeft;
      this.positionTop = positionTop;
      this.width = playerWidth;
      this.height = playerHeight;
      this.directionX = 0;
      this.directionY = 0;
      this.sound = new Audio('../assets/sword-sound.mp3');
      this.sound.volume = 0.1;
      this.element = document.createElement("img");
      this.element.src = playerImageSrc;
      this.element.style.position = "absolute";
      this.element.style.top = `${positionTop}px`;
      this.element.style.left = `${positionLeft}px`;
      this.element.style.width = `${playerWidth}px`;
      this.element.style.height = `${playerHeight}px`;
  
      // 'add' the img to the page
      gameScreen.appendChild(this.element);
    }
    move() {
      this.positionLeft += this.directionX;
      this.positionTop += this.directionY;
      //not letting the car go left or right off of the screen
      if (this.positionLeft < 90) {
        this.positionLeft = 90;
      }
      if (this.positionLeft + this.width > 1000) {
        this.positionLeft = 1000 - this.width;
      }
      //not letting the car go up or down off the screen
      if (this.positionTop < 0) {
        this.positionTop = 0;
      }
      if (this.positionTop + this.height > 700) {
        this.positionTop = 700 - this.height;
      }
      this.updatePosition();
    }
    updatePosition() {
      this.element.style.top = `${this.positionTop}px`;
      this.element.style.left = `${this.positionLeft}px`;
    }
    didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();
      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        this.element.classList.add("spin");
        setTimeout(() => {
          this.element.classList.remove("spin");
        }, 750);
        return true;
      } else {
        return false;
      }
    }
  }