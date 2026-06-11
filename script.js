/**
 * Tic-Tac-Toe Game Logic
 * A minimal, dependency-free implementation
 */

// Game state
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning conditions (indices for 3x3 board)
const winConditions = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];

// DOM elements
const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.querySelector('.status');
const resetButton = document.getElementById('reset');

/**
 * Initialize the game
 */
function initGame() {
    // Reset board state
    for (let i = 0; i < board.length; i++) {
        board[i] = '';
    }
    
    currentPlayer = 'X';
    gameActive = true;
    
    // Reset UI
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winner');
    });
    
    updateStatus();
}

/**
 * Handle cell click
 * @param {Event} e - Click event
 */
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.dataset.index);
    
    // Don't allow moves if game is over or cell is already occupied
    if (!gameActive || board[index] !== '') {
        return;
    }
    
    // Make the move
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    // Check for win or draw
    if (checkWin()) {
        highlightWinningCells();
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        statusElement.classList.add(`win-${currentPlayer.toLowerCase()}`);
        gameActive = false;
        return;
    }
    
    if (checkDraw()) {
        statusElement.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

/**
 * Check if current player has won
 * @returns {boolean} True if current player has won
 */
function checkWin() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            // Store winning condition for highlighting
            window.lastWinCondition = condition;
            return true;
        }
    }
    return false;
}

/**
 * Highlight the winning cells
 */
function highlightWinningCells() {
    if (window.lastWinCondition) {
        for (const index of window.lastWinCondition) {
            cells[index].classList.add('winner');
        }
    }
}

/**
 * Check if the game is a draw
 * @returns {boolean} True if board is full with no winner
 */
function checkDraw() {
    return board.every(cell => cell !== '');
}

/**
 * Update the status display
 */
function updateStatus() {
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    statusElement.className = 'status';
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', initGame);

// Initialize the game
initGame();
