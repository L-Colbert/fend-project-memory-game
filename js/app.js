document.addEventListener('DOMContentLoaded', function() {
    let count = 0;
    let matches = 0;
    let cardHolder = [];

    /*
    * Create a list that holds all of your cards
    */


    /*
    * Display the cards on the page
    *   - shuffle the list of cards using the provided "shuffle" method below
    *   - loop through each card and create its HTML
    *   - add each card's HTML to the page
    */

    // Shuffle function from http://stackoverflow.com/a/2450976
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

 

    function playGame(e, count){
        const newCard = e.target;


        //displays the once hidden symbol of the card
        function displaySymbol(){
            if (!(newCard.classList.contains('match'))) {
                newCard.classList.add('open','show');
            }
        };

        //creates an array of clicked(open) cards
        function openedCards(e, card){
            cardHolder.push(card);
            return cardHolder;
        };

        //display messages/instructions when game is won
        function gameWon(){
            alert('Congratulations! You Did it!!');
        }


        //locks cards open if they are a match
        function matched() {
            function setAttr(item) {
                item.classList.remove('open', 'show');
                item.classList.add('match');
            };
            cardArray.forEach(setAttr);
            cardHolder = [];
            matches++;
            if (matches === 8) {
                setTimeout(gameWon, 1000);
            };
                
        };

        //locks cards open if they are a match
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

        //check to see if cards match
        if (cardArray.length === 2) {
            if (cardArray[0].firstElementChild.getAttribute('class') === cardArray[1].firstElementChild.getAttribute('class')) {
                matched();
            }   else {
                unmatched();
            };
        }

    };

    //starts the game only if the card(li) is clicked
    document.querySelector('.deck').addEventListener('click', function(event){
        const card = event.target;
        if (card.nodeName==='LI') {
            if ((card.classList.contains('open')) || (card.classList.contains('match'))) {
                alert("You've already selected this card, try choosing another!");
            } else {
                count++;
                document.querySelector('.moves').textContent = count;
                playGame(event, count); 
            };   
        };
    })


})