document.addEventListener('DOMContentLoaded', function() {
    let count = 0;
    let matches = 0;
    let cardHolder = [];
    let pairOfCards = [];
    let time = 0;
    let running = false;
    let strCnt = 3;
    let winString = '';
    let winTime = '';
    let flipped = 0;
    let classDeck = document.querySelector('.deck');
    let classPause = document.querySelector('.paused');
    let classRestart = document.querySelector('.restart');
    let theseCards = document.querySelectorAll('.card');
    

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
            flipped++;
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
                item.classList.add('is-Match');
            };
            
            pairOfCards.forEach(setAttr);
            cardHolder = [];
            flipped = 0;
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
                item.classList.add('is-not-match');
                setTimeout(function() {
                    item.classList.remove('is-not-match');
                }, 1000);
            };

           setTimeout(function() {
               pairOfCards.forEach(setAttr)
            }, 1000);
            cardHolder = [];
            flipped = 0;
        };

        //calls function to turn over card
        displaySymbol();


        //invokes function that stores the clicked in an array
        pairOfCards = openedCards(e, newCard);

        //if the list already has another card, check to see if the two cards match
        if (pairOfCards.length === 2) {
            theseCards.forEach(
                function(theseCards) { 
                    theseCards.classList.add('no-click');
                }
            )
                if (pairOfCards[0].firstElementChild.getAttribute('class') === pairOfCards[1].firstElementChild.getAttribute('class')) {
                matched();
                theseCards = document.querySelectorAll('.card');

                theseCards.forEach(
                    function(theseCards) { 
                        theseCards.classList.remove ('no-click');
                    })
    
            } else {
                unmatched();
                for (let i=0; i< theseCards.length; i++) {
                    setTimeout(function() {
                        theseCards[i].classList.remove('no-click');
                    }, 1500);
   
                };
            }
        }

        return pairOfCards;
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
                if (mins > 0) {
                    winTime = mins + ':' + secs;
                } else {
                    winTime = secs + ':' + tenths;
                };
                increment();
            }, 100);
        }
    };     

    //Functions reset the timer, stars, and moves
    function reset(){
        matches = 0;
        cardHolder = [];
        flipped = 0;
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

    //starts and stops the game when the pause/resume/restart button is clicked
    function startStop() {
    if(running === true) {
        theseCards.forEach(
            function(theseCards) { 
                theseCards.classList.remove('no-click');
            });
        increment();
        document.querySelector('.paused').style.visibility = 'visible';
        document.querySelector('.restart').style.visibility = 'visible';
        document.querySelector('.paused button').innerHTML = 'Pause';
        } else {
            document.querySelector('.paused button').innerHTML = 'Resume';
            document.querySelector('.paused button').style.backgroundColor = '#ff80ff';
            theseCards.forEach(
                function(theseCards) { 
                    theseCards.classList.add('no-click');
                });
            increment();
        }
    };

    //functin that is called when a card is clicked, starts the timer, and the game
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
                playGame(event, count); 
                count++;
            };   
        };
    };
    
    //increment the move counter and display it on the page
    function incrementMoves() {
        document.querySelector('.moves').textContent = 'Moves: '+ count;
    };
    
    //controls the star rating section
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
        if (strCnt > 1 ) {
            winString = `
            With ${count} moves and ${strCnt} Stars
                    in ${winTime}s
                      Woooooo!`
        } else {
            winString = `
            With ${count} moves and ${strCnt} Star
                    in ${winTime}s
                      Woooooo!`;
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
    
    };
    
        
   
    //test listener function
    function addAListener (clss, event ,handler) {
        clss.addEventListener(event, handler);
    };

    //invokes the functions to increment the moves, star rating, and game
    function thisIsIt() {
        starRating();
        ifTarget(event);
        incrementMoves();
    };
 
    function resetGame() {
        reset();
        count = 0;
        incrementMoves();
    };

    function pauseIt() {
        if (running) { //pause timer
            running = !running;
            startStop();
        } else { //start timer
            running = !running;
            startStop();
        }
 
    } 

    //remove listener
    function removeAListener() {
        document.querySelector('.deck').removeEventListener('click', thisIsIt);
    };

    //shuffle cards and display
    newArray = shuffle(cardsArray);
    displayCards(newArray);

    /*
    * set up the event listener for a card. If a card is clicked
    * and starts the game
    */
    let evt = 'click';
    addAListener(classDeck, evt, thisIsIt);

    //listens for click of the Pause/Resume Button
    addAListener(classPause, evt, pauseIt);
    
  
    //listens for click of the the reset icon
    addAListener(classRestart, evt, resetGame);


})
