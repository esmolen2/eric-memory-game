//Select deck and create array of cards

const deck = document.querySelector('.deck');
const cards = Array.prototype.slice.call(document.getElementsByClassName('card'));

// Shuffle & place the cards on the page

// 1. Shuffle function from http://stackoverflow.com/a/2450976
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

// 2. Place the cards to arrange the entire deck on the page
function placeCard(card) {
    deck.appendChild(card);
}

function arrangeDeck(array) {
    array.forEach(placeCard);
}

// 3a. Shuffling and arranging the deck on page load

window.addEventListener('load', function () {
    shuffle(cards);
    arrangeDeck(cards);
});

// 3b. Shuffling and arranging the deck on clicking restart

const restart = document.querySelector('.restart');

restart.addEventListener('click', function () {
    shuffle(cards);
    arrangeDeck(cards);
});

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
