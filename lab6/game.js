// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// 1. Start the game after validating player name
function startGame() {
    let nameInput = document.getElementById("playerName").value.trim();

    // Validate that the name field is not empty
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    // Display welcome message and start date/time
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
    gameStarted = true;
}

// 2. Generate a random choice for the computer using an array and Math.random()
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// 3. Play a single round of Rock, Paper, Scissors
function playRound(playerChoice) {
    // Prevent playing before clicking Start Game
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let roundResult = "";

    // Update image sources to match choices
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    // Decide the winner using if...else statements
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        document.getElementById("result").innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
        document.getElementById("result").style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        document.getElementById("result").innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        document.getElementById("result").style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        document.getElementById("result").innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        document.getElementById("result").style.color = "red";
    }

    // Update scoreboard numbers
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Record result in the array and increment round counter
    results.push(roundResult);
    roundCount++;

    // Add a new row to the history table using innerHTML +=
    let historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + capitalize(playerChoice) + "</td>" +
            "<td>" + capitalize(computerChoice) + "</td>" +
            "<td>" + roundResult + "</td>" +
        "</tr>";
}

// Helper function to capitalize first letter for clean table display
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// 4. Calculate and display summary using a for loop and Math.round()
function showSummary() {
    let totalRounds = results.length;

    if (totalRounds === 0) {
        document.getElementById("summaryText").innerHTML = "You played 0 rounds and won 0%.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let winPercentage = Math.round((winCount / totalRounds) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + totalRounds + " rounds and won " + winPercentage + "%.";
}

// 5. Reset scores, results array, history table, and messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}