document.addEventListener('DOMContentLoaded', function() {
    const choiceImages = document.querySelectorAll('.choice-image');
    const resultText = document.getElementById('result-text');
    const playerFist = document.querySelector('.player .fist');
    const computerFist = document.querySelector('.computer .fist');
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');

    let playerScore = 0;
    let computerScore = 0;

    choiceImages.forEach(image => {
        image.addEventListener('click', function() {
            const userChoice = this.getAttribute('data-choice');
            const computerChoice = getComputerChoice();

            // Update fists to show choices
            playerFist.src = `${userChoice}.png`;
            computerFist.src = `${computerChoice}.png`;

            const result = determineWinner(userChoice, computerChoice);
            resultText.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;

            // Update scores
            if (result === "You win!") {
                playerScore++;
            } else if (result === "Computer wins!") {
                computerScore++;
            }

            playerScoreElement.textContent = playerScore;
            computerScoreElement.textContent = computerScore;
        });
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "It's a tie!";
        }

        if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }
});