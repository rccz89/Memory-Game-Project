// cards
let card = document.getElementsByClassName("card");
let cards = [...card]
const deck = document.getElementById("card-deck");
const sameCard = document.getElementsByClassName("match");
let openCards = [];


// stars
const stars = document.querySelectorAll(".fa-star");
const starsList = document.querySelectorAll(".stars li");

// moves
let moves = 0;
let counter = document.querySelector(".moves");


// Modal
const modal = document.getElementById("modal")
const exiticon = document.querySelector(".exit");






// new game
function newGame(){
    // shuffle 
    cards = shuffle(cards);
    
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
        openCards = [];
    }
    // moves back to 0
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    // time back to 0
    second = 0;
    minute = 0; 
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// show cards
let showCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

// flip cards
function flipCard() {
    openCards.push(this);
    let len = openCards.length;
    if(len === 2){
        moveCounter();
        if(openCards[0].type === openCards[1].type){
            samecard();
        } else {
            wrongCard();
        }
    }
};


// same cards
function samecard(){
    openCards[0].classList.add("match", "disabled");
    openCards[1].classList.add("match", "disabled");
    openCards[0].classList.remove("show", "open", "no-event");
    openCards[1].classList.remove("show", "open", "no-event");
    openCards = [];
}


// wrong card
function wrongCard(){
    openCards[0].classList.add("unmatched");
    openCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openCards[0].classList.remove("show", "open", "no-event","unmatched");
        openCards[1].classList.remove("show", "open", "no-event","unmatched");
        allow();
        openCards = [];
    },1100);
}

function allow(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < sameCard.length; i++){
            sameCard[i].classList.add("disabled");
        }
    });
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// timer score panel
let second = 0, minute = 0; hour = 0;
let timer = document.querySelector(".timer");
let interval;
function beginTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// moves rating
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        beginTimer();
    }
 
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// popup modal
function gameOver(){
    if (sameCard.length == 16){
        clearInterval(interval);
        resulTime = timer.innerHTML;

        
        modal.classList.add("show");

        
        var starResult = document.querySelector(".stars").innerHTML;

        // modalResult
        document.getElementById("timeResult").innerHTML = resulTime;
        document.getElementById("starResult").innerHTML = starResult;
        document.getElementById("moveResult").innerHTML = moves;

       
        closeModal();
    };
}

// Playagain button
function playAgain(){
    modal.classList.remove("show");
    newGame();
}
// close modal
function closeModal(){
    exiticon.addEventListener("click", function(e){
        modal.classList.remove("show");
        newGame();
    });
}


// event listeners 
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", flipCard);
    card.addEventListener("click",gameOver);
};

// Shuffle
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
};
