let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;

const playSound = (soundName) => {
  const audio = new Audio(`sounds/${soundName}.mp3`);
  audio.play();
};

const animateBtn = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  $(`#${currentColor}`).fadeOut(100).fadeIn(100);
  setTimeout(() => $(`#${currentColor}`).removeClass("pressed"), 100);
};

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  gamePattern[gamePattern.length] = buttonColors[randomNumber];
  animateBtn(buttonColors[randomNumber]);
  playSound(buttonColors[randomNumber]);

  level++;
  $("h1").text(`Level ${level}`);
  gameStarted = true;
};

for (let i = 0; i < gamePattern.length; i++) {}

$(".btn").click(function () {
  const userChosenColor = this.id;
  animateBtn(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern[userClickedPattern.length] = userChosenColor;

  // first, check if two arrays are equal
  if (arraysEqual(userClickedPattern, gamePattern)) {
    // second, go to next sequence only if user click = game pattern
    if (userClickedPattern.length >= gamePattern.length) {
      userClickedPattern = [];
      setTimeout(() => {
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong"); // play wrong audio
    $("body").addClass("game-over"); // show game-over bg
    setTimeout(() => $("body").removeClass("game-over"), 100); // remove game-over bg after 0.1s
    level = 0; // reset level to 0
    $("h1").text(`Game Over! Press any key to restart.`); // change h1 to Game-Over text
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
  }
});

// Checking if arrays are equal
const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  //   if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

// Press any btn to start the game
$(document).keydown((e) => {
  if (gameStarted === false) {
    console.log("Next Seq");
    setTimeout(() => {
      nextSequence();
    }, 500);
  } else {
    console.log("Game already Started");
  }
});
