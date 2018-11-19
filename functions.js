var words = [
    'testas',
    'medis',
    'stalas',
    'kate',
    'the war on drugs',
    'everyone who knew'
];
var hidenArray = [];
var randomNumber = Math.floor(Math.random() * words.length);
var randomWord = words[randomNumber];
var guessedLetters = [];
var s;
var g;
var l;
var lifes = 8;
var gussedLetter = 0;
var points = 0;

// show word on console
console.log(randomWord);

// hide Word
var hideWord = function() {
    for (var i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === ' ') {
            hidenArray.push(' ');
        } else {
            hidenArray.push('_');
        }
    }
    // update hiden word
    s = hidenArray.join(" ");
    $("#randWord").text(s);
}

var newFunction = function() {
    var variable = $('#gues').val();
    var letter = $('#alert').text(variable);
    if(variable != ' '){
    	var isItAGoodGuess = false;
        for (var j = 0; j < randomWord.length; j++) {
            if (randomWord[j].toLowerCase() === variable.toLowerCase()) {
            	 points = points + 100;
                hidenArray[j] = variable;
                isItAGoodGuess = true;
                gussedLetter++;

            }
		  }
        }
        for(var i = 0; i < randomWord.length; i++){
        if(gussedLetter >= randomWord.length){
        	// console.log("You WON " + randomWord);
        	document.getElementById("win").innerHTML = randomWord;
        	 points = (points * 2);
                
                }
            }

            // if letter guessed already
            for(var i = 0; i < guessedLetters.length; i++){
            	if(guessedLetters[i] == variable){
            		console.log("Tokia raide jau buvo!");
            		points = (points - 10);
            	}
            }
        // if its not a good guess lifes geting one less
        if (!isItAGoodGuess) {
        	if (lifes > 0) {
            lifes--;
            points = (points - 50);
			$('#lifes').text(lifes);
		}else{
			console.log("GAME OVER!! Correct Answer Was: " + randomWord);
			// alert("Press Enter To Start New Game");
			points = points / 2;
		}
		  document.getElementById('points').innerHTML = points;
	}
        //previous guesses
        g = guessedLetters.join(",");
        $("#guesses").text(g);
        guessedLetters.push(variable)
        // update hiden word
        s = hidenArray.join(" ");
        $("#randWord").text(s);
}

// padaryti kad galima butu kartoti zaidima

 // console.log(points);
 
// input from keyboard
 $("#gues").keydown(function(event) {
 	//updating user input

 	newFunction();
// on enter dont let refresh page
  event=event ||window.event;
  var key = event.keyCode;
  if(key==13) {
  	// alert("Persikraunam!!");
     return true; 
  }
    });

$('#randWord').text(hideWord());