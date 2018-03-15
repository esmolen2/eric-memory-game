// Set variables for identifying deck and cards as elements & lists

const deck = document.querySelector('.deck');
const cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
let openCardsList = [];
let matchedCardsList = [];

// Set variables for identifying score panel elements

const restart = document.querySelector('.restart');

// Shuffle cards - from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Place the cards to arrange the entire deck on the page
function placeCard(card) {
    deck.appendChild(card);
}

function arrangeDeck(array) {
    array.forEach(placeCard);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Add and clear lists of cards

function addToList(item, array) {
    array.push(item);
    return array;
}

function clearList(array) {
    array.length = 0;
}

// Add and remove CSS classes to elements

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

// Control display of card symbol
function showSymbol(event) {
    if (event.target.classList.contains('card') === true) {
        addClass(event.target, 'show');
    };
}

function hideSymbol(element) {
    element.classList.remove('show');
}

function hideMatch(element) {
    element.classList.remove('match');
}

function hideAllSymbols(array) {
    array.forEach(hideSymbol);
    array.forEach(hideMatch);
}

// Control display of the winning screen

const winningScreen = document.getElementById('winning-screen');
const playAgain = document.querySelector('.play-again');

function showWinner() {
    if (cards.length === matchedCardsList.length) {
      addClass(winningScreen, 'flex');
    };
};

function hideWinner() {
    removeClass(winningScreen, 'flex');
};

// Logic for opening cards: compare for matches & decide winner

function openCards(event) {
  if (event.target.classList.contains('card') === true) {
    const firstCard = openCardsList[0];
    if (openCardsList.length) {
        if (firstCard.innerHTML === event.target.innerHTML) {
            addClass(event.target, 'match');
            addClass(firstCard, 'match');
            addToList(event.target, matchedCardsList);
            addToList(firstCard, matchedCardsList);
            clearList(openCardsList);
            showWinner();
        } else {
            setTimeout(function () {
                removeClass(event.target, 'show');
                removeClass(firstCard, 'show');
            }, 500);
            clearList(openCardsList);
        }
    } else {
        addToList(event.target, openCardsList);
    }
  };
}

// Event listeners

// Page load - shuffle deck and arrange cards

window.addEventListener('load', function () {
    shuffle(cards);
    arrangeDeck(cards);
});

// Click restart

restart.addEventListener('click', function () {
    hideAllSymbols(cards);
    clearList(openCardsList);
    clearList(matchedCardsList);
    shuffle(cards);
    arrangeDeck(cards);
});

// Clicking cards
deck.addEventListener('click', function () {
    showSymbol(event);
    openCards(event);
});

// Winning screen

playAgain.addEventListener('click', function () {
  hideWinner()
  hideAllSymbols(cards);
  clearList(openCardsList);
  clearList(matchedCardsList);
  shuffle(cards);
  arrangeDeck(cards);
});
