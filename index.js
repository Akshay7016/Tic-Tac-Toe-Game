const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initGame();

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // make UI empty
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        // now apply initail styles to box
        box.classList = `box box${index + 1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver() {
    let winner = "";

    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check whether winner is X/O
            winner = gameGrid[position[0]] === "X" ? "X" : "O";

            // after winning disbale pointer events of all boxes
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now make win boxes to green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    // check tie condition -> if winner found it will return from above condition, it will not check
    // this condition
    let fillCount = 0;
    gameGrid.forEach((element) => {
        if (element !== "") {
            fillCount++;
        }
    })

    // board is filled then game is tie
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    // if gameGrid index is empty then only add symbol to particular index
    if (gameGrid[index] === "") {
        // update UI
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        // now remove pointer event from that index cell
        boxes[index].style.pointerEvents = "none";

        // now change player's turn
        swapTurn();

        // now check winner
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", initGame);