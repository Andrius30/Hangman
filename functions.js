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
                hidenArray[j] = variable;
                isItAGoodGuess = true;
            }
		  }
        }
        // if its not a good guess lifes geting one less
        if (!isItAGoodGuess) {
        	if (lifes > 0) {
            lifes--;
			console.log(lifes);
		}else{
			alert("GAME OVER!! Correct Answer Was: " + randomWord);
			alert("Press Enter To Start New Game");
		}
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

var gameOver = function(){

}


// input from keyboard
 $("#gues").keydown(function(event) {
 	//updating user input
 	newFunction();
// on enter dont let refresh page
  event=event ||window.event;
  var key = event.keyCode;
  if(key==13) {
  	alert("Persikraunam!!");

  var newEl	= document.getElementById('#myDiv');
  console.log(newEl);
  newEl.className += 'myStyle';
  var element = getElementsByTagName('div');
  element.classList.removeClass('.container');
     return false; 
  }
    });



$('#randWord').text(hideWord());