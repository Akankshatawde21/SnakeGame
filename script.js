document.addEventListener('DOMContentLoaded', (event) => {
    let direction = { x: 0, y: 0 };
    let foodSound = new Audio("food.wav");
    let gameOverSound = new Audio("game.wav");
    let speed = 4;
    let lastPaintTime = 0;
    let snakeArr = [{ x: 13, y: 15 }];
    let food = { x: 6, y: 7 };
    let inputDir = { x: 0, y: 0 };
    let score = 0; // Initialize score
   
    
    // Game Functions
    function main(ctime) {
        window.requestAnimationFrame(main);

        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }

    function isCollide(sarr) {
        // Check if the snake collides with itself
        for (let index = 1; index < sarr.length; index++) {
            if (sarr[index].x === sarr[0].x && sarr[index].y === sarr[0].y) {
                return true;
            }
        }
        // Check if the snake collides with the walls
        if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
            return true;
        }
        return false;
    }

    function gameEngine() {
        
        if (isCollide(snakeArr)){
           gameOverSound.play();
            inputDir = { x: 0, y: 0 };
            alert("Your Score is " +score);
            alert("Game Over!");
            snakeArr = [{ x: 13, y: 15 }];
            score = 0;
            scoreBox.innerHTML = "Score: " + score;
            return; // Exit early to prevent game logic from running
        }
       

        // If you have eaten the food, increment the score and regenerate the food
        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            foodSound.play("food.wav");
            score += 1;
            scoreBox.innerHTML = "Score: " + score;
            snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

            let a = 2;
            let b = 16;
            food = { x: Math.floor(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random())};

        }

        // Move the snake
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

        // Display the snake and food
        board.innerHTML = "";
        snakeArr.forEach((e, index) => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            snakeElement.classList.add(index === 0 ? 'head' : 'snake');
            board.appendChild(snakeElement);
        });

        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    }

    

    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case "ArrowUp":
                if (inputDir.y === 0) {
                    inputDir = { x: 0, y: -1 };
                    
                }
                break;
            case "ArrowDown":
                if (inputDir.y === 0) {
                    inputDir = { x: 0, y: 1 };
                    }
                break;
            case "ArrowRight":
                if (inputDir.x === 0) {
                    inputDir = { x: 1, y: 0 };
                    
                }
                break;
            case "ArrowLeft":
                if (inputDir.x === 0) {
                    inputDir = { x: -1, y: 0 };
                
                }
                break;
            default:
                break;
        }
    });
});




