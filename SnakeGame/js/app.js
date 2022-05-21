const foodSound = new Audio("food.mp3");
const moveSound = new Audio("move.mp3");
const gameOverSound = new Audio("gameover.mp3");
const musicSound = new Audio("music.mp3");
let speed = 8;
let lastPlayedTime = 0;

snakeArr = [{ x: 13, y: 15 }];
food = { x: 12, y: 10 };
let inputDir = { x: 0, y: 0 };
let Score = 0;
//game loop to register or animate repeatedly
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);

  if ((ctime - lastPlayedTime) / 1000 < 1 / speed) {
    // less than this do not render now wait so that it does not render repeatedly
    return;
  }
  lastPlayedTime = ctime;
  gameEngine();
}

//gameOver due to collision:
function isCollide(snakeArr) {
  //bumping into self
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
      return true;
    }
  }

  //bumping into wall:
  if (
    snakeArr[0].x > 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y > 18 ||
    snakeArr[0].y <= 0
  )
    return true;
}

//MAIN GAME LOGIC:
function gameEngine() {
  //Updating snake  array and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    snakeArr = [{ x: 13, y: 15 }];
    inputDir = { x: 0, y: 0 };
    Score: 0;

    alert("Game Over!.Press any key to continue");
  }

  //DISPLAYing food and snake array
  //Snake::
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //Food:
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  //regenerating food when eaten by the snake and incrementing the score:

  if (snakeArr[0].x === food.x && snakeArr[0].y == food.y) {
    Score += 1;
    //   if(Score>highScoreval){
    //     highScoreval = Score;
    //     localStorage.setItem("highScore", JSON.stringify(highScoreval));
    //     highScoreBox.innerHTML = "HighScore: " + highScoreval;
    // }

    scoreBox.innerHTML = "Score:" + Score;
    foodSound.play();
    snakeArr.unshift({
      //unshift simple appends the element in the beginning of the array
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    //math.round returns an integer value between a and b
    //math.random generates random value between 0 and 1
  }

  //MOVING repeatedly:
  for (i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
}

//local storage:
// let highScore = localStorage.getItem("highScore");
// if(highScore === null){
//     highcoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }
// else{
//     highScoreval = JSON.parse(highScore);
//     highScoreBox.innerHTML = "HiScore: " + hiscore;
// }

window.requestAnimationFrame(main);
//direction::
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //just as the game starts
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;

      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;

    default:
      break;
  }
});
