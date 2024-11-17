// Select all elements with class "box"
let boxes = document.querySelectorAll(".box"); 

// Select the Reset and New Game buttons
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

// Select the message container and message element
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Initialize the turn tracker: true for Player O, false for Player X
let turn0 = true;

// Winning patterns (rows, columns, diagonals)
const winPattern = [
    [0, 1, 2], // Top row
    [0, 3, 6], // Left column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [2, 4, 6], // Diagonal top-right to bottom-left
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
];

// Function to reset the game
const resetGame = () => {
    turn0 = true; // Reset turn to Player O
    enableBoxes(); // Re-enable all boxes for a new game
    msgContainer.classList.add("hide"); // Hide the winner message
};

// Add click event listeners to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Check if the box is empty to prevent overwriting
        if (box.innerText === "") {
            if (turn0) {
                box.innerText = "O"; // Player O's turn
                turn0 = false; // Switch to Player X
            } else {
                box.innerText = "X"; // Player X's turn
                turn0 = true; // Switch to Player O
            }
        }
        checkWinner(); // Check if the current move wins the game
    });
});

// Function to disable all boxes (when the game ends)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; // Prevent further clicks on boxes
    }
};

// Function to enable all boxes (when resetting the game)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Allow clicking on boxes
        box.innerText = ""; // Clear all box text
    }
};

// Function to display the winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`; // Update the message
    msgContainer.classList.remove("hide"); // Show the winner message
    disableBoxes(); // Disable all boxes after the game ends
};

// Function to check if there is a winner
const checkWinner = () => {
    // Iterate through all winning patterns
    for (let pattern of winPattern) {
        // Get the values of the three positions in the pattern
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // Check if all three positions are not empty and have the same value
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // Call showWinner with the winning player (O or X)
                return; // Exit the function as we found a winner
            }
        }
    }
};

// Add event listeners for the New Game and Reset buttons
newGameBtn.addEventListener("click", resetGame); // Reset the game on New Game button click
resetBtn.addEventListener("click", resetGame); // Reset the game on Reset button click
