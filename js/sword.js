class Sword {
    constructor(gameScreen) {
      this.left = 200;
      this.bottom = 490;
      // for laptop screen
      // this.bottom = 400;
      this.width = 100;
      this.height = 30;
      this.element = document.createElement("img");
      this.element.src = "images/sword2.png";
      this.element.style.position = "absolute";
      this.element.style.bottom = `${this.bottom}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      gameScreen.appendChild(this.element);
    }
    move() {
      this.left += 6;
      this.updatePosition();
    }
    // fall() {
    //   this.bottom += 5;  // Move the obstacle down
    //   this.updatePosition();
    // }
    updatePosition() {
      this.element.style.left = `${this.left}px`;
    }
    didCollide(obstacle) {
      const swordRect = this.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();
  
      if (
        swordRect.left < obstacleRect.right &&
        swordRect.right > obstacleRect.left &&
        swordRect.top < obstacleRect.bottom &&
        swordRect.bottom > obstacleRect.top
      ) {
        return true;
      } else {
        return false;
      }
    }
  }