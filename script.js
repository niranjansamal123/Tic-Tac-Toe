const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const modeToggle = document.getElementById("modeToggle");
const playerXScoreElem = document.getElementById("playerXScore");
const playerOScoreElem = document.getElementById("playerOScore");
const tieScoreElem = document.getElementById("tieScore");
const currentPlayerElem = document.getElementById("turnIndicator");

let currentPlayer = "X";
let isSinglePlayer = false;
let playerXScore = 0;
let playerOScore = 0;
let tieScore = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick, { once: true });
});

resetButton.addEventListener("click", resetGame);
modeToggle.addEventListener("click", toggleMode);

function handleCellClick(e) {
  const cell = e.target;
  makeMove(cell, currentPlayer);

  if (isSinglePlayer && currentPlayer === "O") {
    setTimeout(() => {
      if (!checkWin("X") && !isDraw()) {
        computerMove();
      }
    }, 500);
  }
}

function makeMove(cell, player) {
  cell.textContent = player;

  if (checkWin(player)) {
    setTimeout(() => alert(`${player} wins!`), 100);
    updateScore(player);
    setTimeout(resetBoard, 200);
  } else if (isDraw()) {
    setTimeout(() => alert("Draw!"), 100);
    updateScore("tie");
    setTimeout(resetBoard, 200);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnIndicator();
  }
}

function computerMove() {
  let availableCells = [...cells].filter((cell) => cell.textContent === "");
  let randomCell =
    availableCells[Math.floor(Math.random() * availableCells.length)];
  makeMove(randomCell, "O");
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.textContent === "X" || cell.textContent === "O";
  });
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  currentPlayer = "X";
  updateTurnIndicator();
}

function resetGame() {
  resetBoard();
  playerXScore = 0;
  playerOScore = 0;
  tieScore = 0;
  updateScoreDisplay();
}

function toggleMode() {
  isSinglePlayer = !isSinglePlayer;
  modeToggle.textContent = isSinglePlayer
    ? "Switch to Dual Player"
    : "Switch to Single Player";
  resetGame();
}

function updateScore(player) {
  if (player === "X") {
    playerXScore++;
  } else if (player === "O") {
    playerOScore++;
  } else {
    tieScore++;
  }
  updateScoreDisplay();
}

function updateScoreDisplay() {
  playerXScoreElem.textContent = `Player X: ${playerXScore}`;
  playerOScoreElem.textContent = `Player O: ${playerOScore}`;
  tieScoreElem.textContent = `Ties: ${tieScore}`;
}

function updateTurnIndicator() {
  currentPlayerElem.textContent = `Player ${currentPlayer}'s Turn`;
}
