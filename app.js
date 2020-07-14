/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//what I have done in this code to create a game logic

//1. create an array of the scores of the both of the players and set it to 0
//2. create a single round score beacuse there is only one round happening at a time
//3. create a variable which keep's a track of current active player
//4. create a dice variable to store random number generated between 1 to 6.
//5. As soon as the player changes shift the active class to the other players class

var scores, roundScore, activePlayer, gamePlaying;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    //innerHTML has an advantage over the textCintent that is it can use the html elements to create the various effects but textContent will convert all the elements in to the text.

    //document.querySelector('#current-' + activePlayer).textContent = dice;
    //in case of if i need styling i will uncomment this. It will turn the number into itlacis
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

    //hiding the dice at the start of the game so in the start dice doesn't show's up the random number

    document.querySelector('.dice').style.display = 'none';

    //setting the score-0/1 and the current-0/1 values
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();

//selecting the roll button fuction
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (gamePlaying) {
            //1. random number
        //beacuse i want the random number as soon as i click the button not when the page loads

        //Math.random() function provides the rando number between the 0 and 1
        //Math.floor() function removes the decimal part of the number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score If the rolled number is not 1
        if (dice !== 1) {
            //update the score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
           } else {
               //next player chance
               nextPlayer();
               //document.querySelector('.player-0-panel').classList.remove('active');
               //document.querySelector('.player-1-panel').classList.add('active');

           }
       }
});


//hold button functionality

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
            //Add current score to the global score
        scores[activePlayer] += roundScore;

        //update the game
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if the player won the game
        if(scores[activePlayer] >= 100) {
            //activePlayer wins
            document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
           }else {
               //next player
               nextPlayer();
           }
       }
});


//function next player call
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

//new game button call

document.querySelector('.btn-new').addEventListener('click', init);