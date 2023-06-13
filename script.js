// Generate a random number for the guessing game
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Define variables for the html elements we will manipulate
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

// keep count of the guesses
let guessCount = 1;
let resetButton;

// Initialize event listeners
let angerImage = document.querySelector('#anger');
let angerMessage = "Cage going bananas!";
let angerTextFinished = false;
let angerCounter = 0;
angerImage.addEventListener('mouseover', printAnger);
angerImage.addEventListener('mouseout', stopAnger);


let triggerImage = document.querySelector('#trigger');
let triggerMessage = "What have you done to trigger Mr. Cage?!";
let triggerTextFinished = false;
let triggerCounter = 0;
triggerImage.addEventListener('mouseover', printTrigger);
triggerImage.addEventListener('mouseout', stopTrigger);

// Initialize intervals for text printing.
let intervalID = null;
let intervalID2 = null;

// Variable to hold the player's guess
let userGuess;

// Initialize the video and message elements and the video button
let videoIframe = null;
let message = null;
let videoButton = null;
let videoPlayed = false;

// Define the random sounds to be played when the player guesses incorrectly
let sounds = ['no', 'wrong', 'shame', 'noThree', 'noLoud']

// The function that checks the players guess against the random number
function checkGuess() {
  userGuess = Number(guessField.value);
  
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }

  guesses.textContent += userGuess + ' ';
  
  // Actions to take if the player guessed correctly.
  if (userGuess === randomNumber) {
    lastResult.textContent = 'You beat Mr. Cage. I\'d start running if I were you.';
    lastResult.style.backgroundColor = 'white';
    lowOrHi.textContent = '';
    const end = document.getElementById('end');
    end.scrollIntoView();
    playAudio('correctGuessAudio');
    setGameOver();

  // Actions to take if the player runs out of attempts
  } else if (guessCount === 7) {
    lastResult.textContent = 'Out of guesses';
    lowOrHi.textContent = '';
    const end = document.getElementById('end');
    end.scrollIntoView();
    playMultipleAudio(['laugh', 'tooLate']);
    setGameOver();
    // Actions to take if the player guesses incorrectly and still has tries left
  } else {
    lastResult.textContent = 'Wrong!';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Too low!';
      const end = document.getElementById('end');
      end.scrollIntoView();
      playRandomSound();
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
      const end = document.getElementById('end');
      end.scrollIntoView();
      playRandomSound();
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

// Add event listener to the form to prevent page refresh on submit and check the user's guess when the form is submitted
let guessForm = document.querySelector('#guessForm');
guessForm.addEventListener('submit', function(event) {
  event.preventDefault();
  checkGuess();
})

// End the game already!
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  resetButton.addEventListener('click', resetGame);

  // Reveal Nic's special address
  if (userGuess === randomNumber) {
    message = document.createElement('p');
    message.textContent = 'Nic wants to express his feelings about his loss to you via a short message.';
    document.body.append(message);
    videoButton = document.createElement('button');
    videoButton.textContent = 'Reveal message';
    document.body.append(videoButton);

    videoButton.addEventListener('click', function() {
      if (!videoPlayed) {
        videoIframe = document.createElement('iframe');
        videoIframe.width = "560";
        videoIframe.height = "315";
        videoIframe.src = "https://www.youtube.com/embed/vVxxjKjLkb8?autoplay=1";
        videoIframe.frameborder = "0";
        videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;";
        videoIframe.allowFullscreen = true;

        document.body.append(videoIframe);
        videoIframe.scrollIntoView();
        videoPlayed = true;
      }
    })
  }
  document.body.append(resetButton);

}

// Reset the game
function resetGame() {
  videoPlayed = false;
  guessCount = 1;

  let resetParas = document.querySelectorAll('.resultParas p');
  for(let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;

  if (videoIframe !== null) {
    videoIframe.remove();
    videoIframe = null;
  }

  if (message !== null) {
    message.remove();
    message = null;
  }

  if (videoButton !== null) {
    videoButton.remove();
    videoButton = null;
  }
}

// Play audio 
function playAudio(id) {
  let audio = document.getElementById(id);
  audio.play();
}

// Play multiple audio files in sequence
function playMultipleAudio(ids) {
    let index = 0;
    
    let playNext = () => {
      if (index < ids.length) {
        let audio = document.getElementById(ids[index]);
        audio.onended = playNext;
        audio.play();
        index++;
      }
    };
  
    playNext();
  }
  

// Function to play random sounds for the incorrect guess list.
function playRandomSound() {
let randomIndex = Math.floor(Math.random() * sounds.length);
playAudio(sounds[randomIndex]);
}

// Print the figcaption text associated with the rage image.
function printAnger() {
  let angerText = document.querySelector('#bananas');
  if (intervalID == null && !angerTextFinished) {
    intervalID = setInterval(function() {
      if (angerCounter < angerMessage.length) {
        angerText.textContent += angerMessage[angerCounter];
        angerCounter++;
      } else {
        clearInterval(intervalID);
        angerCounter = 0;
        angerTextFinished = true;
      }
    }, 50);
  }

}

function stopAnger() {
  clearInterval(intervalID);
  intervalID = null;
}

// Print the figcaption text associated with the triggered image.
function printTrigger() {
  let triggerText = document.querySelector('#whathaveyou');
  if (intervalID2 == null && !triggerTextFinished) {
    intervalID2 = setInterval(function() {
      if (triggerCounter < triggerMessage.length) {
        triggerText.textContent += triggerMessage[triggerCounter];
        triggerCounter++;
      } else {
        clearInterval(intervalID2);
        triggerCounter = 0;
        triggerTextFinished = true;
      }
    }, 50);
  }
}

function stopTrigger() {
  clearInterval(intervalID2);
  intervalID2 = null;
}