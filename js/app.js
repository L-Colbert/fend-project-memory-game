document.addEventListener('DOMContentLoaded', function() {
    let count = 0;
    let matches = 0;
    let cardHolder = [];
    let time = 0;
    let running = false;


    /*
    * Create a list that holds all of your cards
    */
    
    const cardsArray = [ 
        'fa fa-diamond', 'fa fa-diamond',
        'fa fa-leaf', 'fa fa-leaf',
        'fa fa-bomb', 'fa fa-bomb',
        'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
        'fa fa-anchor', 'fa fa-anchor',
        'fa fa-bolt', 'fa fa-bolt',
        'fa fa-cube', 'fa fa-cube',
        'fa fa-bicycle', 'fa fa-bicycle'];

    
    /*
    * Display the cards on the page
    *   - shuffle the list of cards using the provided 'shuffle' method below
    *   - loop through each card and create its HTML
    *   - add each card's HTML to the page
    */
    

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    //displays the cards on the deck
    function displayCards(array) {
        const deck = document.querySelector('.deck');
        const cardList = document.querySelectorAll('li.card');
        const fragment = document.createDocumentFragment();

        for(let i = 0; i < array.length; i++) {
            const image= document.createElement('i');
            image.setAttribute('class', array[i]);
            cardList[i].appendChild(image);
            fragment.appendChild(cardList[i]);
        };

        while (deck.firstChild) {
            deck.removeChild(deck.firstChild);
        };
        deck.appendChild(fragment)
    }

    /*
    * set up the event listener for a card. If a card is clicked:
    *  - display the card's symbol (put this functionality in another function that you call from this one)
    *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
    *  - if the list already has another card, check to see if the two cards match
    *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    */

    //Main game functionality
    function playGame(e, count){
        const newCard = e.target;


        //displays the once hidden symbol of the card
        function displaySymbol(){
            if (!(newCard.classList.contains('match'))) {
                newCard.classList.add('open','show');
            }
        };

        //add the card to a *list* of 'open' cards
        function openedCards(e, card){
            cardHolder.push(card);
            return cardHolder;
        };

        //if all cards have matched, display a message with the final score
        function gameWon(){
            alert('Congratulations! You Did it!!');
        }
        
        
        //if the cards do match, lock the cards in the open position
        function matched() {
            
            function setAttr(item) {
                item.classList.remove('open', 'show');
                item.classList.add('match');
            };

            cardArray.forEach(setAttr);
            cardHolder = [];
            matches++;
            if (matches === 8) {
                running = false;
                increment();
                document.querySelector('.paused').style.visibility = 'hidden';
                setTimeout(gameWon, 1000);
            };
                
        };

        //if the cards do not match, remove the cards from the list and hide the card's symbol
        function unmatched() {
            function setAttr(item) {
                item.classList.remove('open', 'show');
            };
           setTimeout(function() {cardArray.forEach(setAttr)}, 750);
            cardHolder = [];
        };

                

        //calls function to turn over card
        displaySymbol();


        //invokes function that stores the clicked in an array
        const cardArray = openedCards(e, newCard);

        //if the list already has another card, check to see if the two cards match
        if (cardArray.length === 2) {
            if (cardArray[0].firstElementChild.getAttribute('class') === cardArray[1].firstElementChild.getAttribute('class')) {
                matched();
            }   else {
                unmatched();
            };
        }

    };

    //Timer function from http://learnwebsitedesign.com/freeJavascriptCodes/freeJavascriptStopwatchCode.php       
    function increment(){
        if(running === true){
            setTimeout(function(){
                time++;
                let mins = Math.floor(time / 10 / 60);
                if(mins <= 9){
                    mins = '0' + mins;
                }
                let secs = Math.floor(time / 10);
                if(secs <= 9){
                    secs = '0' + secs;
                }
                let tenths = Math.floor(time % 10);
                if(tenths <= 9){
                    tenths = '0' + tenths;
                }
                document.querySelector('.timer').innerHTML = mins + ':' + secs + ':' + tenths;
                increment();
            }, 100);
        }
    };     

    //Functions reset the timer
    function reset(array){
        matches = 0;
        cardHolder = [];
        running = false;
        time = 0;
        count = 0;
        document.querySelector('.timer').innerHTML = '00:00:00';
        document.querySelector('.moves').textContent = count;
        document.querySelector('.paused button').innerHTML = 'Restart';

        
        
        const deck = document.querySelector('.deck');
        const cardList = document.querySelectorAll('li.card');
        const imgList = document.querySelectorAll('li.card > i');
        for(let i = 0; i < cardList.length; i++) {
            cardList[i].classList.remove('match');
            cardList[i].classList.remove('open', 'show');
            cardList[i].removeChild(imgList[i]);           
        };
        displayCards(shuffle(cardsArray))
    };

    function startStop() {
    if(running === true) {
        increment();
        document.querySelector('.paused').style.visibility = 'visible';
        document.querySelector('.restart').style.visibility = 'visible';
        document.querySelector('.paused button').innerHTML = 'Pause';
        } else {
            document.querySelector('.paused button').innerHTML = 'Resume';
            increment();
            }
    };

    //shuffle cards and display
    const newArray = shuffle(cardsArray);
    displayCards(newArray);

    function ifTarget(event){
        const card = event.target;
        if (card.nodeName==='LI') {
            if (count == 0){
                running = true;
                startStop();
            };
            if ((card.classList.contains('open')) || (card.classList.contains('match'))) {
                alert("You've already selected this card, try choosing another!");
            } else {
                count++;
                //updates the moves counter on each card clicked
                document.querySelector('.moves').textContent = 'Moves: '+ count;
                playGame(event, count); 
            };   
        };
    }

    //increment the move counter and display it on the page


    /*
    * set up the event listener for a card. If a card is clicked:
    */
    

    //starts the game only if the card(li) is clicked
    document.querySelector('.deck').addEventListener('click', function() {
        ifTarget(event);
    });

    //listens for click of the Pause/Resume Button
    document.querySelector('.paused').addEventListener('click', function(event){
        if (running) { //pause timer
           running = !running;
            startStop();
            document.querySelector('.deck').removeEventListener('click', function() {
                ifTarget(event);
            });
        } else { //start timer
            running = !running;
            startStop();
            document.querySelector('.deck').addEventListener('click', function() {
                ifTarget(event);
            });
        }
    }, true);
    

    //listens for click of the the reset icon
    document.querySelector('.restart').addEventListener('click', function(event){
        reset(cardsArray);
    })


})
