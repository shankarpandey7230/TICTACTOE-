// Initialization of the variable to keep track of the game state

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// functions to handle the turn of the players which will update the gameboard and switch the players

const handlePlayer = (clickedCellIndex) => {
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  gameBoard[clickedCellIndex] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? '0' : 'X';
};

//  function which gets triggered whenever a player clicks on a cell
const cellClicked = (clickedCellEvent) => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  handlePlayer(clickedCellIndex);
  updateUI();
};
// adding the event listener to each and individual Cells

const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  //   console.log(cell);
  cell.addEventListener('click', cellClicked, false);
});

const updateUI = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = gameBoard[i];
  }
};

// defining the win conditions which are represented as an array of arrays

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function to check after each move for win or draw

function checkForWinOrDraw() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];

    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }

  function announceWinner(player) {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} wins!`;
  }
  function announceDraw() {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Game Draw`;
  }

  if (roundWon) {
    announceWinner(currentPlayer);
    gameActive = false;
    return;
  }
  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
    announceDraw();
    gameActive = false;
    return;
  }
}

// reset function to reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true; // Set the game as active
  currentPlayer = 'X';
  //   clearing the UI in cells
  cells.forEach((cell) => {
    cell.innerText = '';
  });
  document.getElementById('gameMessage').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);
