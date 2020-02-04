const $q = document.querySelector.bind(document);
const $qa = document.querySelectorAll.bind(document);
const eventClick = "click";

let firstPlayerName = prompt("Please enter your name for the X turn", "");
let secondPlayerName = prompt("Please enter your name for the O turn", "");

let audioWin = new Audio("audio/bdc7e3fb7788ae3.htm");

//Track the game
let isGameOn = true;
let scoreX = 0;
let scoreO = 0;
//Inital first turn of the game
let currentPlayer = "X";
let playerName = firstPlayerName;
// intial empty array of string as game bord and to track the user input
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// User Stories#3: As a user, I should be shown a message after each turn for if I win, lose, tie or who"s turn it is next
let winMessage = function () {
    return "Player " + currentPlayer + ", " + playerName + " has won!";
};

let tieMessage = function () {
    return "No wins. It's a tie!";
};

let whoseTurnMessage = function () {

    return "It's  " + currentPlayer + ", " + playerName + "'s turn";
};

$q("#scoreX").textContent = scoreX;
$q("#scoreO").textContent = scoreO;
$q(".heading-message").textContent = whoseTurnMessage();

let winMap = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// store the value from the user and add the value to the square.
let handleSquarePlayed = function (clickedSquare, clickedSquareIndex) {
    gameBoard[clickedSquareIndex] = currentPlayer;
    clickedSquare.textContent = currentPlayer;
}
// User Stories#2: As a user, I should be able to click on a square to add X first and then O, and so on
let handlePlayerChange = function () {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerName = playerName === firstPlayerName ? secondPlayerName : firstPlayerName;
    $q(".heading-message").textContent = whoseTurnMessage();
}

// User Stories#2: As a user, I should be shown a message when I win, lose or tie
let handleResultValidation = function () {
    //Inital first turn of the game
    let isPlayerWin = false;

    for (let i = 0; i < 8; i++) {
        let winCondition = winMap[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            isPlayerWin = true;
            break;
        }
    }

    // User Stories#6: As a user, I should not be able to continue playing once I win, lose, or tie
    if (isPlayerWin) {
        audioWin.play();
        setTimeout(function () {
            if (playerName === firstPlayerName) {
                scoreX++
            } else {
                scoreO++
            }
            $q("#scoreX").textContent = scoreX;
            $q("#scoreO").textContent = scoreO;
            $q(".heading-message").textContent = winMessage();
            $q(".overlay-message").setAttribute("id", "overlay");
            $q(".close-button").removeAttribute("id");
        }, 500);
        isGameOn = false;
        return;
    }

    // if the game board filled with X,O and no one win, it"s tie
    let isTie = !gameBoard.includes("");
    if (isTie) {
        $q(".heading-message").textContent = tieMessage();
        isGameOn = false;
        return;
    }

    handlePlayerChange();
}

// check if the clicked cell has already been clicked
let handleSquareClick = function (clickedSquareEvent) {
    let clickedSquare = clickedSquareEvent.target;
    let clickedSquareIndex = clickedSquare.getAttribute("id");

    // User Stories#4: As a user, I should not be able to click the same square twice
    if (gameBoard[clickedSquareIndex] !== "" || !isGameOn) {
        return;
    }

    // User Stories#2: As a user, I should be able to click on a square to add X first and then O, and so on
    handleSquarePlayed(clickedSquare, clickedSquareIndex);
    handleResultValidation();
}

let handleCloseGame = function () {
    isGameOn = true;
    $q(".overlay-message").removeAttribute("id");
    $q(".close-button").setAttribute("id", "hide");
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    $q(".heading-message").textContent = whoseTurnMessage();
    $qa(".square").forEach(function (square) {
        return square.textContent = "";
    });
}
let handleRestartGame = function () {
    scoreX = 0;
    scoreO = 0;
    $q("#scoreX").textContent = scoreX;
    $q("#scoreO").textContent = scoreO;
    handleCloseGame();
}


//event listeners of the game
// User Stories#2: As a user, I should be able to click on a square to add X first and then O, and so on
$qa(".square").forEach(function (square) {
    return square.addEventListener(eventClick, handleSquareClick);
});
// User Stories#7: As a user, I should be able to play the game again without refreshing the page
$q(".restart-button").addEventListener(eventClick, handleRestartGame);
$q(".close-button").addEventListener(eventClick, handleCloseGame);
// let firstPlayerName = prompt("Please enter your name", "Harry Potter");
// if (firstPlayerName != null) {
//     $q("#demo").textContent = "Hello " + firstPlayerName + "! How are you today?";
// }
