// Set variables for identifying deck and cards as elements & lists

const deck = document.querySelector('.deck');
const cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
let openCardsList = [];
let matchedCardsList = [];

// Set variable for identifying restart element

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
    addClass(event.target, 'show');
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

// Control display and count of timer

let seconds = 0;
const timerDisplay = document.querySelector('.timer');
const secondsDisplay = document.querySelector('.seconds');
let countInterval = null;

function countUp() {
    secondsDisplay.innerHTML = ++seconds;
}

function startCount() {
    countInterval = setInterval(countUp, 1000);
    addClass(timerDisplay, 'visible')
    deck.removeEventListener('click', startCount);
}

function stopCount() {
    clearInterval(countInterval);
}

function resetTimer() {
    stopCount();
    seconds = 0;
    secondsDisplay.innerHTML = seconds;
    removeClass(timerDisplay, 'visible');
    deck.addEventListener('click', startCount);
}

// Control move counter

let clicks = 0;
let moves = 0;
const movesDisplay = document.querySelector('.moves');

function moveCounter() {
    clicks += 1;
    if (clicks !== 0 && clicks % 2 === 0) {
        moves += 1;
        movesDisplay.innerHTML = moves;
    };
}

function clearMoves() {
    clicks = 0;
    moves = 0;
    movesDisplay.innerHTML = moves;
}

// Control stars
let stars = '3 stars';
const starsDisplay = document.querySelector('.stars');

function starCount() {
    if (moves <= 13) {
        starsDisplay.innerHTML = '<li><span class="fa fa-star"></span></li><li><span class="fa fa-star"></span></li><li><span class="fa fa-star"></span></li>';
        stars = '3 stars';
    } else if (moves > 13 && moves <= 18) {
        starsDisplay.innerHTML = '<li><span class="fa fa-star"></span></li><li><span class="fa fa-star"></span></li>';
        stars = '2 stars';
    } else if (moves > 18 && moves <= 23) {
        starsDisplay.innerHTML = '<li><span class="fa fa-star"></span></li>';
        stars = '1 star';
    } else {
        starsDisplay.innerHTML = '';
        stars = '0 stars'
    }
}

function resetStars() {
    stars = '3 stars';
    starsDisplay.innerHTML = '<li><span class="fa fa-star"></span></li><li><span class="fa fa-star"></span></li><li><span class="fa fa-star"></span></li>';
}

// Control display of the winning screen

const winningScreen = document.getElementById('winning-screen');
const winningSeconds = winningScreen.querySelector('.seconds');
const winningMoves = winningScreen.querySelector('.moves');
const winningStars = winningScreen.querySelector('.stars');
const playAgain = document.querySelector('.play-again');

function showWinner() {
    if (cards.length === matchedCardsList.length) {
        stopCount();
        winningSeconds.innerHTML = seconds;
        winningMoves.innerHTML = moves;
        winningStars.innerHTML = stars;
        addClass(winningScreen, 'flex');
    };
}

function hideWinner() {
    removeClass(winningScreen, 'flex');
}

// Logic for opening cards: compare for matches & decide winner

function openCards(event) {
    moveCounter();
    starCount();
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
        };
    } else {
        addToList(event.target, openCardsList);
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
    resetTimer();
    clearMoves();
    resetStars();
    shuffle(cards);
    arrangeDeck(cards);
});

// Clicking cards

deck.addEventListener('click', function () {
    if (event.target.classList.contains('card') && !event.target.classList.contains('show') && !event.target.classList.contains('match')) {
        showSymbol(event);
        openCards(event);
    }
});

// Start & display timer

deck.addEventListener('click', startCount);

// Restart from winning screen

playAgain.addEventListener('click', function () {
    hideWinner();
    hideAllSymbols(cards);
    clearList(openCardsList);
    clearList(matchedCardsList);
    resetTimer();
    clearMoves();
    resetStars();
    shuffle(cards);
    arrangeDeck(cards);
});
