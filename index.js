const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10); // convert guess into number
  // Number must be between 1 and 99
  if (guess < 1) {
    alert('Number must be 1 or higher');
    return;
  }
  if (guess > 99) {
    alert('Number must be 99 or lower');
    return;
  }
  attempts++; // increase attempts

  hideAllMessages();

  if (guess === targetNumber) { // correct guess
    numberOfGuessesMessage.style.display = ''; // show numberOfGuessesMessage
    numberOfGuessesMessage.textContent = `You made ${attempts} guesses`;

    correctMessage.style.display = ''; // show correctMessage
    // Hide maxGuessesMessage (in case last attempt was correct)
    maxGuessesMessage.style.display = 'none';
    // Disable submit and input
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = ''; // show tooLowMessage
    } else {
      tooHighMessage.style.display = ''; // show tooHighMessage
    }
    // Compute remaining attempts
    const remainingAttempts = maxNumberOfAttempts - attempts;
    // Handle "guess"/"guesses"
    const guessWord = remainingAttempts === 1 ? 'guess' : 'guesses';
    // Show numberOfGuessesMessage with remaining attempts
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.textContent = `You guessed ${guess}.\n${remainingAttempts} ${guessWord} remaining`;
  }

  if (attempts === maxNumberOfAttempts && guess !== targetNumber) {
    // Disable submit and input
    submitButton.disabled = true;
    guessInput.disabled = true;
    // Hide tooLow/tooHigh messages
    tooLowMessage.style.display = 'none';
    tooHighMessage.style.display = 'none';
    maxGuessesMessage.style.display = ''; // show maxGuessesMessage
  }

  guessInput.value = ''; // clear the input box

  resetButton.style.display = ''; // reveal the reset button
}

function hideAllMessages() {
  for (const message of messages) {
    message.style.display = 'none';  // hide  message
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none'; // hide reset button
}

submitButton.addEventListener('click', checkGuess); // when click submit -> checkGuess
resetButton.addEventListener('click', setup); // when click reset -> setup

setup(); // start the game
