$(function () {   
    
    // Operating variable

    let scores, activePlayer, notActive, gamePlaying;
    
    let iconSelectPlayer = "<i class='bi '><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-record-fill' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z'/></svg></i>"; 

    // launch function    

    $('.btn-new').click(function(e){
        e.preventDefault();
        alert('Clicker sur Roll Dice pour lancer le dé');
        init();
    });

    // function player inactive

    function selectPlayer(){
        if($('#player-'+activePlayer).hasClass('active')){
            $('#player-'+notActive).removeClass('active')
        }
    }  
    
    // function winner

    function winner(){        
        $('.infoGame').append("<div class='showinfo col-6'>Player "+(activePlayer+1)+" vous avez Gagné !!</div>");              
        $('.dice').delay(1000).hide(400);
        $('#rollDice').delay(1000).hide(400);
        $('.hold').delay(1000).hide(400);
        gamePlaying = false;
    }  
    
    
    // Dice roll

    $('.btn-roll').click( function() {
        if(gamePlaying) {
            // random number generator
            let dice = Math.floor(Math.random() * 6) + 1;     
            let diceDOM = $('.dice');

            $('.dice').css('display' , 'block');
            diceDOM.attr('src','Images/d-' + dice + '.png');              
    
            //3. Update  score IF the rolled number was NOT a 1
            if (dice !== 1) {                
                currents[activePlayer] += dice;                             
                $('#current-' + activePlayer).text(currents[activePlayer]);               
            
            }else{             
                nextPlayer();          
            }    
            if (scores[activePlayer] >= 100) {
                winner();
            }                 
        }    
    })

    // button hold

   $('.btn-hold').click(function() {
       
       scores[activePlayer] += currents[activePlayer];
       $('#score-' + activePlayer).text(scores[activePlayer]);

       if (scores[activePlayer] >= 100) { 
           winner();
       }else{
           nextPlayer();
       }
    });
    
    // function nextplayer 

    function nextPlayer() {        
        //Next player
        currents[activePlayer]=0;
        $('#current-' + activePlayer).text(currents[activePlayer]);

        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        notActive === 0 ? notActive = 1 : notActive = 0;       
        selectPlayer()
        $('#player-' + activePlayer).toggleClass('active ').toggleClass('clicked');            
        $('#player-'+ notActive).toggleClass('active ').toggleClass('clicked');             
    }    

    // function INIT

    function init() {
        scores = [0, 0];
        currents = [0, 0];        
        activePlayer = 0;
        notActive = 1;              
        gamePlaying = true;        
        $('.dice').css('display' , 'none');
        $('#player-0').removeClass('active').removeClass('clicked').removeAttr('style');
        $('#player-0 i').remove() ;
        $('#player-1').removeClass('active').removeClass('clicked').removeAttr('style'); 
        $('#player-1 i').remove() ; 
        $('#score-0').text('0');
        $('#score-1').text('0');
        $('#current-0').text('0');
        $('#current-1').text('0'); 
        $('#thimble').css('display' , 'block');
        $('.showinfo').remove();
        $('.dice').show();
        $('#rollDice').show();
        $('#skip').show();
        $('#player-0').addClass('active')
        $('#player-0').addClass('clicked');             
                
    } 
    
    // init
    $('.btn-new').init();

    $('.rules').click(function(){
        alert('Les regles sont simples, le premier joueur arrivé à 100 points à gagner. Cliquer sur \'hold\' pour changer de joueur, si tirez un 1 au dé vous perdez votre tour de jeu');
    })
}) 