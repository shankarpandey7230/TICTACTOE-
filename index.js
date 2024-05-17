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

// adding the event listener to each and individual Cells

const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  //   console.log(cell);
  cell.addEventListener('click', cellClicked, false);
});
//  function which gets triggered whenever a player clicks on a cell
const cellClicked = (clickedCellEvent) => {
   const clickedCell = clickedCellEvent.target;
   const clickedCellIndex = parseInt(clickedCell.id.replace('cell-'''))-1;
if(gameBoard[clickedCellIndex] !== '' || !gameActive){
    return;
}
handlePlayer(clickedCellIndex);
updateUI();



};

const updateUI =()=>{
    for(let i=0; i<cells.length; i++){
        cells[i].innerText = gameBoard[i]
    }
}