document.addEventListener('DOMContentLoaded', function() {
    let count = 0;
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
       // const newCard = e.target.firstElementChild.getAttribute('class');

        console.log(count);

        //displays the once hidden symbol of the card
        function displaySymbol(){
           newCard.setAttribute('class','card open show');
        };

        //creates an array of clicked(open) cards
        function openedCards(e, card){
            if(count <= 2){
            cardHolder.push(card);
            return cardHolder;
            }
        };

        //locks cards open if they are a match
        function matched() {
            function setAttr(item) {
                console.log(item);
                item.setAttribute('class','card match');
            };
            cardArray.forEach(setAttr);
        };

        //locks cards open if they are a match
        function unmatched() {
            function setAttr(item) {
                console.log(item);
                item.setAttribute('class','card');
            };
            cardArray.forEach(setAttr);
        };

        //calls function to turn over card
        displaySymbol();

        //invokes function that stores the clicked in an array
        const cardArray = openedCards(e, newCard);
        console.log(cardArray);

        //check to see if cards match
        if (cardArray.length === 2) {
            if (cardArray[0].firstElementChild.getAttribute('class') === cardArray[1].firstElementChild.getAttribute('class')) {
                matched();
            }   else {
                unmatched();
            };
        }

    }

    //starts the game only if the card(li) is clicked
    document.querySelector('.deck').addEventListener('click', function(event){
        if (event.target.nodeName==='LI') {
            count++;
            playGame(event, count);
        }
    })


})