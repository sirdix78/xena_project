class Obstacle {
    constructor(gameScreen) {
        this.possibleYPositions = [50, 100, 150, 200, 250]; 
        this.randomIndex = Math.floor(Math.random() * this.possibleYPositions.length);
        this.bottom = this.possibleYPositions[this.randomIndex];
        this.width = 180;
        this.height = 300;
        this.left = window.innerWidth; 
        this.invincible = false;

        this.imageArray = [
            "./images/obstacle1-img.png",
            "./images/obstacle2-img.png",
            "./images/obstacle3-img.png",
            "./images/obstacle4-img.png",
            "./images/obstacle5-img.png"
        ];
        const randomImage = this.imageArray[Math.floor(Math.random() * this.imageArray.length)];
        // Create obstacle element
        this.element = document.createElement("img");
        this.element.src = randomImage;
        this.element.style.position = "absolute";
        this.element.style.bottom = `${this.bottom}px`; 
        this.element.style.left = `${this.left}px`; 
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        gameScreen.appendChild(this.element);
    }

    move() {
        this.left -= 3; 
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`; 
    }
}
