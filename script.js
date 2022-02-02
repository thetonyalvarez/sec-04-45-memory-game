const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start-game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let card1 = null;
let card2 = null;
let totalCardsMatched = null;
let noClicking = null;
let totalScore = null;

// TODO: Implement this function!
function handleCardClick(event) {
  // assign event target to a var
  let currentCard = event.target;

  // return if noClicking is set to prevent unwanted clicks
  if (noClicking) {
    return;
  };

  // return if a card that's already flipped is clicked to prevent unwanted clicks
  if (currentCard.classList.contains('flipped')) {
    return;
  };

  // Set the BG color and indicate that it's been flipped to clicked cards
  if (!card1) {
    card1 = currentCard;
    card1.style.backgroundColor = currentCard.classList[0]
    card1.classList.add('flipped')
    
  } else {
    card2 = currentCard
    card2.style.backgroundColor = currentCard.classList[0]
    card2.classList.add('flipped')
  }

  // if the cards match, enable noClicking and check the class names against each other
  if (card1 && card2) {
    noClicking = true;
    let color1 = card1.className;
    let color2 = card2.className;
    
    // if they match, update the total matches counter, then reset the card values to null to start again, and disable noClicking.
    if (color1 === color2) {
      totalCardsMatched += 2;
      card1 = null;
      card2 = null;
      noClicking = false;

    // if they don't match, let them linger for 1 second, then remove the flipped class to indicate that it's facing down and
    // clear the bg color. Clear the values of the cards, and disable noClicking.
    } else {
      setTimeout(function () {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000)
    }
  }

  // update the score with every click
  totalScore++;

  // once the total cards matched counter matches the length of the color array...
  if (totalCardsMatched == COLORS.length) {
    // alert us that the game's over...
    alert('Game Over!')
    // then add the total score to a new element to show the player their score
    scoreWrapper = document.createElement('div');
    scoreWrapper.innerText = 'Total Score: ' + totalScore;
    gameContainer.appendChild(scoreWrapper);

    // if the current score is lower than the best score saved to localStorage, then
    // overwrite the best score with the new one. Otherwise, show the best score.
    if (!localStorage.getItem('bestScore') || totalScore < localStorage.getItem('bestScore')) {
      localStorage.setItem('bestScore', totalScore)
    } else {
      localStorage.getItem('bestScore')
    }
    totalCardsMatched = null;
    
    bestScoreWrapper = document.createElement('div');
    bestScoreWrapper.innerText = 'Best Score: ' + localStorage.getItem('bestScore');
    gameContainer.appendChild(bestScoreWrapper);
  }
  
}

// add a button that will restart the game and randomize the colors again
startButton.addEventListener('click', function() {
  // clear out the total cards matched variable...
  totalCardsMatched = null;
  // grab all the divs inside the game container...
  allDivs = gameContainer.querySelectorAll('div');
  // then iterate through and remove every div...
  for (let div of allDivs) {
    console.log(div)
    div.remove()
  }
  // once cleared, add a new instance of divs with new colors
  createDivsForColors(shuffle(COLORS));

})

// when the DOM loads
createDivsForColors(shuffledColors);
