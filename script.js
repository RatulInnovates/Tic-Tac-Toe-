let heading = document.querySelector("h1");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

let winningPatterns = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [2, 4, 6], // Diagonal (top-right to bottom-left)
];

let moveCount = 0;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    moveCount++;
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkwinner();
    if (moveCount == 9) {
      showWinner("draw");
    }
  });
});

const disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
  }
};

const showWinner = (winner) => {
  if (winner != "draw") {
    const count = 200,
      defaults = {
        origin: { y: 0.7 },
      };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  disableBoxes();
  heading.classList.add("hide");
  if (winner == "draw") {
    msg.innerText = `Draw!`;
  } else {
    msg.innerText = `Congratulations, winner is ${winner}!`;
  }
  msgContainer.classList.remove("hide");
};

resetBtn.addEventListener("click", () => {
  moveCount = 0;
  enableBoxes();
  boxes.forEach((box) => {
    box.innerText = null;
    box.disabled = false;
    heading.classList.remove("hide");
    msgContainer.classList.add("hide");
  });
});
newGameBtn.addEventListener("click", () => {
  moveCount = 0;
  enableBoxes();
  boxes.forEach((box) => {
    box.innerText = null;
    box.disabled = false;
    msgContainer.classList.add("hide");
    heading.classList.remove("hide");
  });
});

const checkwinner = () => {
  for (let pattern of winningPatterns) {
    if (
      boxes[pattern[0]].innerText == "O" &&
      boxes[pattern[1]].innerText == "O" &&
      boxes[pattern[2]].innerText == "O"
    ) {
      console.log("Player O wins");
      showWinner("O");
    } else if (
      boxes[pattern[0]].innerText == "X" &&
      boxes[pattern[1]].innerText == "X" &&
      boxes[pattern[2]].innerText == "X"
    ) {
      console.log("Player X wins");
      showWinner("X");
    }
  }
};
