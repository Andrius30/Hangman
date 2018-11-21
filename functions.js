var words = [
    'testas',
    'medis',
    'stalas',
    'kate',
    'thewarondrugs',
    'everyonewhoknew',
    'television',
    'bridge',
    'table',
    'roof',
    'spiderman',
    'batman',
    'league'
];
var hidenArray = [];
var randomNumber = Math.floor(Math.random() * words.length);
var randomWord = words[randomNumber];
var guessedLetters = [];
var s;
var lifes = 8;
var gussedLetter = 0;
var points = 0;
const input = document.querySelector('#gues');
const regex = /^[a-z\s]*$/;
const btn = document.getElementById('btn');
const btnwin = document.getElementById('btnwin');
const gameOverSound = new sound('sounds/gameOver.mp3');
const bgSound = new sound('sounds/backgroundS.mp3');

// You Lost Game Over
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

input.addEventListener('keyup', function() {
    var isItAGoodGuess = false;
    let char = input.value;
    $('#alert').text(char);
    if (char.match(regex)) {
        let contains = randomWord.includes(char);
        if (contains && !guessedLetters.includes(char)) {
            for (let i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === char) {
                    isItAGoodGuess = true;
                    hidenArray[i] = char;
                    gussedLetter++;
                    points += 100;
                }
            }
        }
    } else {
        isItAGoodGuess = true;
        alert('bad input');
    }
    input.value = '';

    if (gussedLetter >= randomWord.length) {
        // You WON reset
        btnWin.addEventListener('click', function() {
            lifes = 8;
            gussedLetter = 0;
            guessedLetters = [];
            hidenArray = [];
            randomNumber = Math.floor(Math.random() * words.length);
            randomWord = words[randomNumber];
            hideWord();
        });
        $(function() {
            $('#win').arcticmodal();
        });
          $('secretWord').text(randomWord);
        points = (points * 2);
    }

    // if letter guessed already
    if (!guessedLetters.includes(char)) {
        //previous guesses
        g = guessedLetters.join(",");
        $("#guesses").text(g);
        guessedLetters.push(char);
    } else {
        isItAGoodGuess = true;
        alert("Tokia raide jau buvo! " + char.toUpperCase());
        points = (points - 10);
    }

    // if its not a good guess lifes geting one less
    if (!isItAGoodGuess) {
        if (lifes > 0) {
            lifes--;
            points = (points - 50);
            $('#lifes').text(lifes);
        } else {
            btn.addEventListener('click', function() {
            	 gameOverSound.stop();
                lifes = 8;
                gussedLetter = 0;
                guessedLetters = [];
                hidenArray = [];
                randomNumber = Math.floor(Math.random() * words.length);
                randomWord = words[randomNumber];
                hideWord();

            });
            $(function() {
                $('#exampleModal').arcticmodal();
            });
            // game over sound effects
            gameOverSound.play();
            points = points / 2;
        }
        document.getElementById('points').innerHTML = points;
    }
    // update hiden word
    s = hidenArray.join(" ");
    $("#randWord").text(s);
});
$('#randWord').text(hideWord());
var bg = function() {
	bgSound.play();
}

var stp = function(){
	bgSound.stop();
}
var ply = function(){
	bgSound.play();
}

if((typeof s !== 'undefined' || typeof s !== null) || typeof s !== 'undefined'){
    console.log('variable l ' + s + " is: " + s);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("loop", "true");
    this.sound.setAttribute("mute","false");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}