const $q = document.querySelector.bind(document);    
const $qa = document.querySelectorAll.bind(document);    
const eventClick = "click";    
    
// Prompts for player names with default values    
let firstPlayerName = prompt("Please enter your name for the X turn", "Player 1") || "Player 1";    
let secondPlayerName = prompt("Please enter your name for the O turn", "Player 2") || "Player 2";    
    
let audioWin = new Audio("audio/bdc7e3fb7788ae3.htm");    
    
// Game state variables    
let isGameOn = true;    
let scoreX = 0;    
let scoreO = 0;    
let scoreTie = 0;    
let currentPlayer = "X";    
let playerName = firstPlayerName;    
let gameBoard = Array(9).fill("");  // Initializes a 9-element array with empty strings    
    
// Winning combinations    
const winMap = [    
    [0, 1, 2], [3, 4, 5], [6, 7, 8],     
    [0, 3, 6], [1, 4, 7], [2, 5, 8],     
    [0, 4, 8], [2, 4, 6]    
];    
    
// Message functions    
const winMessage = () => `Player ${currentPlayer}, ${playerName} has won!`;    
const tieMessage = () => "No wins. It's a tie!";    
const whoseTurnMessage = () => `It's ${currentPlayer}, ${playerName}'s turn`;    
    
// Initialize score and turn messages    
$q("#scoreX").textContent = scoreX;    
$q("#scoreO").textContent = scoreO;    
$q("#scoreTie").textContent = scoreTie;    
$q(".heading-message").textContent = whoseTurnMessage();    
    
const handleSquarePlayed = (clickedSquare, clickedSquareIndex) => {    
    gameBoard[clickedSquareIndex] = currentPlayer;    
    clickedSquare.textContent = currentPlayer;    
}    
    
const handlePlayerChange = () => {    
    currentPlayer = currentPlayer === "X" ? "O" : "X";    
    playerName = playerName === firstPlayerName ? secondPlayerName : firstPlayerName;    
    $q(".heading-message").textContent = whoseTurnMessage();    
}    
    
const handleResultValidation = () => {    
    let isPlayerWin = winMap.some(winCondition => {    
        const [a, b, c] = winCondition.map(index => gameBoard[index]);    
        return a && a === b && b === c;    
    });    
    
    if (isPlayerWin) {    
        audioWin.play();    
        updateScoreAndDisplayMessage(winMessage, currentPlayer === "X" ? scoreX++ : scoreO++);    
        isGameOn = false;    
        return;    
    }    
    
    if (!gameBoard.includes("")) {    
        updateScoreAndDisplayMessage(tieMessage, scoreTie++);    
        isGameOn = false;    
        return;    
    }    
    
    handlePlayerChange();    
}    
    
const updateScoreAndDisplayMessage = (messageFn, scoreUpdate) => {    
    setTimeout(() => {    
        scoreUpdate;    
        $q("#scoreX").textContent = scoreX;    
        $q("#scoreO").textContent = scoreO;    
        $q("#scoreTie").textContent = scoreTie;    
        $q(".heading-message").textContent = messageFn();    
        $q(".overlay-message").setAttribute("id", "overlay");    
        $q(".close-button").removeAttribute("id");    
    }, 500);    
}    
    
const handleSquareClick = (event) => {    
    const clickedSquare = event.target;    
    const clickedSquareIndex = clickedSquare.getAttribute("id");    
    
    if (gameBoard[clickedSquareIndex] !== "" || !isGameOn) return;    
    
    handleSquarePlayed(clickedSquare, clickedSquareIndex);    
    handleResultValidation();    
}    
    
const handleCloseGame = () => {    
    resetGameState();    
    $q(".overlay-message").removeAttribute("id");    
    $q(".close-button").setAttribute("id", "hide");    
}    
    
const handleRestartGame = () => {    
    scoreX = 0;    
    scoreO = 0;    
    scoreTie = 0;    
    resetGameState();    
}    
    
const resetGameState = () => {    
    isGameOn = true;    
    currentPlayer = "X";    
    playerName = firstPlayerName;    
    gameBoard.fill("");    
    $q(".heading-message").textContent = whoseTurnMessage();    
    $qa(".square").forEach(square => square.textContent = "");    
}    
    
// Event listeners for game interaction    
$qa(".square").forEach(square => square.addEventListener(eventClick, handleSquareClick));    
$q(".restart-button").addEventListener(eventClick, handleRestartGame);    
$q(".close-button").addEventListener(eventClick, handleCloseGame);    
