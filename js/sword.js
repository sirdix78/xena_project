class Sword {
    constructor(gameScreen, left, top) {
      this.left = left;
      this.top = top;
      this.width = 100;
      this.height = 30;
      this.element = document.createElement("img");
      this.element.src = "images/sword2.png";
      this.element.style.position = "absolute";
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      gameScreen.appendChild(this.element);
    }
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
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