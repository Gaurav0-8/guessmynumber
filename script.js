"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

function winningSound() {
  let sherr = new Audio("sherr.mp3"); //winning sound
  sherr.play();
}
function loosingSound() {
  let otatMe = new Audio("otat.mp3"); //loosing sound
  otatMe.play();
}
function firstGuessWin() {
  let firstGuess = new Audio("cheeta.mp3"); //First Guess win
  firstGuess.play();
}

// Restaring the Game!
document.querySelector(".again").style.visibility = "hidden";
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".again").style.visibility = "hidden";
  document.querySelector(".score").textContent = score;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".check").style.visibility = "visible";
});

document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".guess").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

function checkGuess() {
  const guess = Number(document.querySelector(".guess").value);

  //When there is no input
  if (!guess) {
    document.querySelector(".message").textContent = "Number to daal !";
  }
  //When player wins
  else if (guess === secretNumber) {
    document.querySelector(".again").style.visibility = "visible";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".message").textContent = "🦁 Sherrrrrrrr 👍👍👍";
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score === 20) {
      document.querySelector(".message").textContent = "Abbe Cheeta hi kehde";
      firstGuessWin();
    } else {
      winningSound();
    }
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
    document.querySelector(".check").style.visibility = "hidden";
  }
  //When the guess is wrong
  else if (guess > 20) {
    document.querySelector(".message").textContent = "Abbe 20 ke neeche";
  } else if (guess < 0) {
    document.querySelector(".message").textContent = "Abbe 0 se uprr";
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent =
        guess > secretNumber ? "📈 Too High!" : "📉 Too Low!";
      score -= 2;
      document.querySelector(".score").textContent = score;
    } else {
      loosingSound();
      document.querySelector(".again").style.visibility = "visible";
      document.querySelector(".check").style.visibility = "hidden";
      document.querySelector(".message").textContent = "Bhen te **** Otat me!";
      document.querySelector(".score").textContent = 0;
      document.querySelector("body").style.backgroundColor = "red";
    }
  }
}
