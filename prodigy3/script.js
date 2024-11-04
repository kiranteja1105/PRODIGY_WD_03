const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  isXTurn = true;
  messageElement.textContent = "X's Turn";
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.innerText = ''; // Clear any text in the cell
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";
  cell.classList.add(currentClass);
  cell.innerText = isXTurn ? "X" : "O";  // Display "X" or "O" in the cell

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
    messageElement.textContent = `${isXTurn ? "X" : "O"}'s Turn`;
  }
}

function endGame(draw) {
  if (draw) {
    messageElement.textContent = "It's a Draw!";
  } else {
    messageElement.textContent = `${isXTurn ? "X" : "O"} Wins!`;
  }
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains("x") || cell.classList.contains("o"));
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => cells[index].classList.contains(currentClass));
  });
}

restartButton.addEventListener("click", startGame);
startGame();
