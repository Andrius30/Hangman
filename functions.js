var words = [
    'thewarondrugs', 'everyonewhoknew', 'television',
    'bridge', 'table', 'roof', 'spiderman', 'batman',
    'league', 'moon', 'haters', 'newday', 'begining',
    'horse', 'universe', 'holiwood', 'happy', 'glass',
    'table', 'absurd', 'askew', 'avenue', 'axiom',
    'awkward', 'bandwagon', 'bikini', 'blitz',
    'katarina', 'olaf', 'riven', 'imthelegend',
    'beekeeper', 'bayou'
];
var hidenArray = [];
var randomNumber = Math.floor(Math.random() * words.length);
var randomWord = words[randomNumber].toLocaleLowerCase();
var guessedLetters = [];
var s;
var lifes = 7;
var gussedLetter = 0;
var points = 0;
const input = document.querySelector('#gues');
const regex = /^[a-zA-Z\s]*$/;
const btn = document.getElementById('btn');
const btnwin = document.getElementById('btnwin');
const gameOverSound = new sound('sounds/gameOver.mp3');
const bgSound = new sound('sounds/backgroundS.mp3');
let guessFullWord = document.getElementById('guessword');

// Prevent on preesed Enter refresh page
input.addEventListener('keypress', function(event) {
    if (event.keyCode === 10 || event.keyCode === 13) {
        event.preventDefault();
    }
});
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
    $("#randWord").text(s.toLocaleLowerCase());
}

input.addEventListener('keyup', function() {
    var isItAGoodGuess = false;
    let char = input.value.toLocaleLowerCase();
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
        btnwin.addEventListener('click', function(event) {
            lifes = 7;
            gussedLetter = 0;
            while (guessedLetters.length > 0) {
                guessedLetters.pop();
            }
            while (hidenArray.length > 0) {
                hidenArray.pop();
            }
            randomNumber = Math.floor(Math.random() * words.length);
            randomWord = words[randomNumber];
            points = 0;
            hideWord();
        });
        $(function() {
            $('#win').arcticmodal();
        });
        points = points * 2;
    }

    // if letter guessed already
    if (!guessedLetters.includes(char)) {
        //previous guesses
        g = guessedLetters.join(", ");
        $("#guesses").text(g);
        guessedLetters.push(char);
    } else {
        isItAGoodGuess = true;
        alert("You already guessed this letter " + char.toUpperCase());
    }

    // if its not a good guess lifes geting one less
    if (!isItAGoodGuess) {
        if (lifes != 0 || lifes > 0) {
            lifes--;
            if (points > 0) {
                points = points - 20;
            }
            $('#lifes').text(lifes);

            // hangman image sprites
            var image = document.getElementById('div');
            var image2 = document.getElementById('div');
            document.body.appendChild(image);
            switch (lifes) {
                case 6:
                    image.className = 'case6';
                    break;
                case 5:
                    image.className = 'case5';
                    break;
                case 4:
                    image.className = 'case4';
                    break;
                case 3:
                    image.className = 'case3';
                    break;
                case 2:
                    image.className = 'case2';
                    break;
                case 1:
                    image.className = 'case1';
                    break;
                case 0:
                    image.className = 'case0';
                    break;
            }

        } else {
            btn.addEventListener('click', function() {
                gameOverSound.stop();
                lifes = 7;
                gussedLetter = 0;
                while (guessedLetters.length > 0) {
                    guessedLetters.pop();
                }
                while (hidenArray.length > 0) {
                    hidenArray.pop();
                }
                points = 0;
                randomNumber = Math.floor(Math.random() * words.length);
                randomWord = words[randomNumber];
                hideWord();
            });
            $(function() {
                $('#exampleModal').arcticmodal();
            });
            $('#secretword').text(randomWord);
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

var stp = function() {
    bgSound.stop();
}
var ply = function() {
    bgSound.play();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("loop", "true");
    this.sound.setAttribute("mute", "false");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

// Try guess whole word function
var FullWord = function() {
    var wholeWord = guessFullWord.value.toLocaleLowerCase();
    if (wholeWord !== '') {
        for (var i = 0; i < randomWord.length; i++) {
            if (wholeWord.match(regex)) {
                if (randomWord.includes(wholeWord)) {
                    // You WON reset
                    btnwin.addEventListener('click', function(event) {
                        lifes = 7;
                        gussedLetter = 0;
                        while (guessedLetters.length > 0) {
                            guessedLetters.pop();
                        }
                        while (hidenArray.length > 0) {
                            hidenArray.pop();
                        }
                        randomNumber = Math.floor(Math.random() * words.length);
                        randomWord = words[randomNumber];
                        points = 0;
                        hideWord();
                    });
                    $(function() {
                        $('#win').arcticmodal();
                    });
                    points = points * 2;
                    wholeWord.value = '';
                } else {
                    btn.addEventListener('click', function() {
                        gameOverSound.stop();
                        lifes = 7;
                        gussedLetter = 0;
                        while (guessedLetters.length > 0) {
                            guessedLetters.pop();
                        }
                        while (hidenArray.length > 0) {
                            hidenArray.pop();
                        }
                        points = 0;
                        randomNumber = Math.floor(Math.random() * words.length);
                        randomWord = words[randomNumber];
                        wholeWord.value = '';
                        hideWord();
                    });
                    $(function() {
                        $('#exampleModal').arcticmodal();
                    });
                    $('#secretword').text(randomWord);
                    // game over sound effects
                    gameOverSound.play();
                    if (points > 0) {
                        points = points / 2;
                        if (points < 0) {
                            points = 0;
                        }
                    }
                }
            } else {
                alert('Bad Imput!');
                wholeWord.value = '';
            }
        }
    } else {
        alert("Input Field Empty!");
    }
}