const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X'; // Player starts first
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== '' || !isGameActive || currentPlayer === 'O') {
        return; // Prevent click if cell is occupied or if it's AI's turn
    }

    boardState[index] = currentPlayer;
    cell.innerText = currentPlayer;

    checkWin();
    if (isGameActive) {
        currentPlayer = 'O'; // Switch to AI
        aiMove();
    }
}

function aiMove() {
    const availableCells = boardState.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    
    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const aiCellIndex = availableCells[randomIndex];

        boardState[aiCellIndex] = currentPlayer;
        cells[aiCellIndex].innerText = currentPlayer;

        checkWin();
        if (isGameActive) {
            currentPlayer = 'X'; // Switch back to player
        }
    }
}

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            isGameActive = false;
            statusDiv.innerText = `Player ${boardState[a]} wins!`;
            return;
        }
    }

    if (!boardState.includes('')) {
        isGameActive = false;
        statusDiv.innerText = "It's a draw!";
    }
}

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X'; // Player starts first
    cells.forEach(cell => {
        cell.innerText = '';
    });
    statusDiv.innerText = '';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
