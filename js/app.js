document.addEventListener('DOMContentLoaded', function() {
    let count = 0;
    let matches = 0;
    let cardHolder = [];
    let time = 0;
    let running = false;
    let strCnt = 3;
    let winString = '';


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
    };

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
        deck.appendChild(fragment);
    };

    /*
    *Main game functionality
    */
    function playGame(e, count){
        newCard = e.target;


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
            displayModal();
            reset();
        };
        
        
        //if the cards do match, lock the cards in the open position
        function matched() {
            
            function setAttr(item) {
                item.classList.remove('open', 'show');
                item.classList.add('match');
                item.classList.add('isMatch');
            };

            cardArray.forEach(setAttr);
            cardHolder = [];
            matches++;
            if (matches === 8) {
                running = false;
                increment();
                document.querySelector('.paused').style.visibility = 'hidden';
                setTimeout(gameWon, 750);
            };
                
        };

        //if the cards do not match, remove the cards from the list and hide the card's symbol
        function unmatched() {
            function setAttr(item) {
                item.classList.remove('open', 'show');
                item.classList.add('isNotMatch');
                setTimeout(function() {
                    item.classList.remove('isNotMatch');
                }, 500);
            };
           setTimeout(function() {
               cardArray.forEach(setAttr)
            }, 750);
            cardHolder = [];
        };

        //calls function to turn over card
        displaySymbol();


        //invokes function that stores the clicked in an array
        cardArray = openedCards(e, newCard);

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
                let secs = Math.floor(time % 600 / 10);
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
    function reset(){
        matches = 0;
        cardHolder = [];
        running = false;
        time = 0;
        count = 0;
        incrementMoves();
        
        document.querySelector('.timer').innerHTML = '00:00:00';
        document.querySelector('.paused button').innerHTML = 'Restart';
        document.querySelector('.restart').style.visibility = 'hidden';
        const deck = document.querySelector('.deck');
        const cardList = document.querySelectorAll('li.card');
        const imgList = document.querySelectorAll('li.card > i');
        const starList = document.querySelectorAll('.halfstar');
        
        for(let i = 0; i < cardList.length; i++) {
            cardList[i].classList.remove('match');
            cardList[i].classList.remove('open', 'show');
            cardList[i].removeChild(imgList[i]);           
        };

        for(let i = 0; i < starList.length; i++) {
            starList[i].classList.remove('fa-star-half-o','fa-star-o');
            starList[i].classList.add('fa-star');
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

    function ifTarget(event){
        card = event.target;
        if (card.nodeName==='LI') {
            if (count == 0){
                running = true;
                startStop();
            };
            if ((card.classList.contains('open')) || (card.classList.contains('match'))) {
                alert("You've already selected this card, try choosing another!");
            } else {
                count++;
                playGame(event, count); 
            };   
        };
    };
    
    //increment the move counter and display it on the page
    function incrementMoves() {
        document.querySelector('.moves').textContent = 'Moves: '+ count;
    };
    
    function starRating() {
        starList = document.querySelectorAll('.halfstar');
        if (count > 19){
            if (count < 25) {
                    starList[1].classList.remove('fa-star');
                    starList[1].classList.add('fa-star-half-o');
                    strCnt = 2.5;
            } else if (count < 30) {
                    starList[1].classList.remove('fa-star-half-o');
                    starList[1].classList.add('fa-star-o');
                    strCnt = 2;
            } else if (count < 35) {
                    starList[1].classList.remove('fa-star-half-o');
                    starList[1].classList.add('fa-star-o');
                    starList[0].classList.remove('fa-star');
                    starList[0].classList.add('fa-star-half-o');
                    strCnt = 1.5;
            } else if(count < 40) {
                    starList[0].classList.remove('fa-star-half-o');
                    starList[0].classList.add('fa-star-o');
                    strCnt = 1;
            };
        }
    };
    

    // Modal code from https://www.w3schools.com/howto/howto_css_modals.asp

    var modal = document.getElementById('win-modal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // After 8 matches, gameWon() invokes this to open the modal 
    function displayModal() {
        let winString = '';
        if (strCnt >= 1 ) {
            winString = `
            With ${count} moves and ${strCnt} Star

                      Woooooooooooo!`
        } else {
            winString = `
            With ${count} moves and ${strCnt} Stars

                      Woooooooooooo!`;
        };

        let text = document.createTextNode(winString);

        modal.style.display = "block";

        document.querySelector('.win-text').insertAdjacentHTML('afterend',winString);

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            };
        };

        document.querySelector('.play-again').addEventListener('click', function(event){
            modal.style.display = "none";
            reset();
        })
    
    }





    //Create a list that holds all of your cards
    cardsArray = [ 
        'fa fa-diamond', 'fa fa-diamond',
        'fa fa-leaf', 'fa fa-leaf',
        'fa fa-bomb', 'fa fa-bomb',
        'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
        'fa fa-anchor', 'fa fa-anchor',
        'fa fa-bolt', 'fa fa-bolt',
        'fa fa-cube', 'fa fa-cube',
        'fa fa-bicycle', 'fa fa-bicycle'];
        
        
        
        //shuffle cards and display
       newArray = shuffle(cardsArray);
       displayCards(newArray);

// displayCards(cardsArray);
        
        /*
        * set up the event listener for a card. If a card is clicked
        * and starts the game
        */
    
    document.querySelector('.deck').addEventListener('click', function() {
       ifTarget(event);
       incrementMoves()
       starRating();
    });

    //listens for click of the Pause/Resume Button
    document.querySelector('.paused').addEventListener('click', function(event){
        if (running) { //pause timer
           running = !running;
            startStop();
        } else { //start timer
            running = !running;
            startStop();
        }
    }, true);
    

    //listens for click of the the reset icon
    document.querySelector('.restart').addEventListener('click', function(event){
        reset();
        count = 0;
        incrementMoves();
    })


})
