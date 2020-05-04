var played = false;
var distance = 10;
var answered = false;
var up_arrow = false;
var down_arrow = false;
var left_arrow = false;
var right_arrow = false;
var index = 0;
var correct_answers = 0;
var result = [0, [0,0,0,0]];
var msg = new SpeechSynthesisUtterance("Hello, and welcome to the \
    Forbidden Forrest. You may skip the instructions at anytime by pressing the space bar. You are stuck in an enchanted \
    forrest and are being chased by a monster. The monster is currently 8 \
    feet away. As you run through the enchanted \
    forest, you will run into various magical obstacles. To dodge them, \
    you must correctly answer a math problem. There will be four possible answers, \
    each corresponding to a different arrow key that will allow you to move \
    to dodge the obstacle in your path. The possible answers will be read out in the order\
    left arrow, up arrow, right arrow, and down arrow. If you need to hear an equation\
    again, press the space bar before hitting any arrow keys. Everytime you answer \
    a question incorrectly the monster will be two feet closer to you. \
    If you correctly answer 10 questions you escape the forrest unharmed.\
    At any time, you may press the control key, located at \
    the bottom left of your keyboard, to exit the game and return to\
    the main menu of games. When you are ready, press the space\
    bar to begin.");
game_over = false;


function playMusic() {
    let audio = new Audio('../sounds/CreepyForest.mp3')
    audio.volume = .2;
    audio.play();
}
playMusic();
BeginInstructions();

function getEquation() {
    var number = Math.floor((Math.random() * 4) + 1);
    if (number == 1) {
       // addition problem 
        var num1 = Math.floor((Math.random() * 50) + 1);
        var num2 = Math.floor((Math.random() * 50) + 1);
        equation = num1.toString() + ' plus ' + num2.toString();
        var answer = num1+num2;
    }else if (number == 2) {
       // subtraction problem 
        var num1 = Math.floor((Math.random() * 50) + 1);
        var num2 = Math.floor((Math.random() * 50) + 1);
        equation = Math.max(num1,num2).toString() + ' minus ' +  Math.min(num1,num2).toString();
        var answer = Math.max(num1,num2)-Math.min(num1,num2);
    }else if (number == 3) {
        var num1 = Math.floor((Math.random() * 15) + 1);
        var num2 = Math.floor((Math.random() * 15) + 1);
        equation = num1.toString() + ' multiplied by ' + num2.toString();
        var answer = num1 * num2;
    }else {
        var num1 = Math.floor((Math.random() * 15) + 1);
        var answer = Math.floor((Math.random() * 15) + 1);
        var num2 = num1 * answer;
        equation = num2.toString() + ' divided by ' + num1.toString();
    } return [equation, answer];
}

function generateAnswers(answer) {
    var a = 0;
    var b = 0;
    var c = 0;
    if (answer < 20) {
        while(a == b || c==b || a==c || a==answer || b==answer || c==answer) {
            a = Math.floor(Math.random()*30+1);
            b = Math.floor(Math.random()*30+1);
            c = Math.floor(Math.random()*30+1);
        }
    }else if (answer < 50) {
        while(a == b || c==b || a==c || a==answer || b==answer || c==answer) {
            a = answer-Math.floor((Math.random()*10+1));
            b = answer-Math.floor((Math.random()*10+1));
            c = answer-Math.floor((Math.random()*10+1));
        }
    }else {
        while(a == b || c==b || a==c || a==answer || b==answer || c==answer) {
            a = answer-Math.floor((Math.random()*20+1));
            b = answer-Math.floor((Math.random()*20+1));
            c = answer-Math.floor((Math.random()*20+1));
        }
    } 
    return shuffle([answer,a,b,c]);
}

// This function uses the Fisher-Yates (Knuth) Shuffle algorithm.
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function BeginInstructions() {
    window.speechSynthesis.cancel();
    msg.pitch = 0;
    window.speechSynthesis.speak(msg);
}

function playGame() {
    var values = getEquation();
    var eq = values[0];
    var an = generateAnswers(values[1]);
    document.getElementById("equation").innerHTML = eq + " = ";
    var msg = new SpeechSynthesisUtterance(eq + " is ");
    msg.pitch = 0;
    window.speechSynthesis.speak(msg);
    document.getElementById("answer_left").innerHTML = an[0];
    var msg = new SpeechSynthesisUtterance(an[0]);
    msg.pitch = 0;
    window.speechSynthesis.speak(msg);
    document.getElementById("answer_up").innerHTML = an[1];
    var msg = new SpeechSynthesisUtterance(an[1]);
    msg.pitch = 0;
    window.speechSynthesis.speak(msg);
    document.getElementById("answer_right").innerHTML = an[2];
    var msg = new SpeechSynthesisUtterance(an[2]);
    msg.pitch = 0;
    window.speechSynthesis.speak(msg);
    document.getElementById("answer_down").innerHTML = an[3];
    var msg = new SpeechSynthesisUtterance(" or" + an[3]);
    msg.pitch = 0;
    window.speechSynthesis.speak(msg);
    return [values[1],an, eq];
}

function message(a) {
    if(a == 0){
        correct_answers = correct_answers+1;
        var msg = new SpeechSynthesisUtterance("Correct");
        //replace this with an audio sound later?
        msg.pitch = 0;
        window.speechSynthesis.speak(msg);
        var msg = new SpeechSynthesisUtterance("Answer " + (10-correct_answers).toString() + " more questions correctly to leave the forrest");
        msg.pitch = 0;
        window.speechSynthesis.speak(msg);
        document.getElementById("instructions").innerHTML = "Correct Answer <br> You are one step closer to getting out of the forrest <br> Answer " + (10-correct_answers).toString() + " more questions correctly to leave the forrest";
    }else {
        document.getElementById('monster').play();
        distance = distance -2;
        var msg = new SpeechSynthesisUtterance("Inncorrect. The correct answer is " + result[0] + " The monster is now " + distance + " feet away");
        msg.pitch = 0;
        window.speechSynthesis.speak(msg);
        document.getElementById("instructions").innerHTML = "Incorrect Answer! <br><br> Correct answer is " + result[0] + "<br> The monster is now " + distance + " feet away";
    }setTimeout(restart_questions(), 10000);
}


function end_game() {
    document.getElementById('roar').play();
    document.getElementById("instructions").innerHTML = "Game Over. You did not\
    escape the forest.";
    game_over = true;
    var msg = new SpeechSynthesisUtterance("Game Over. You did not\
     escape the forest. To play again, press the spacebar. To\
     return to the game choice page, press the control key in the\
     bottom left corner");
    msg.pitch = 0;
    window.speechSynthesis.speak(msg);
}

function win_game() {
    document.getElementById("instructions").innerHTML = "Congratulations. You escaped\
    the forest safely";
    game_over = true;
    var msg = new SpeechSynthesisUtterance("Congratulations. You escaped\
    the forest safely. To play again, press the spacebar. To\
     return to the game choice page, press the control key in the\
     bottom left corner");
    msg.pitch = 0;
    window.speechSynthesis.speak(msg);
}

function restart_questions() {
    answered = false;
    document.getElementById("instructions").innerHTML = "";
    result = playGame();
    played = true; 
}



$(window).keypress(function(e){
    if (game_over == true){
        location.href = '/forbiddenForest';
    }
    else if (e.keyCode == 32 && game_over==false) { //spacebar
        window.speechSynthesis.cancel();
        if(played == false) {
            restart_questions();
        }
        else if (played == true && answered == true) {
            reset_answers()
            if(result[1][index]==result[0]){
                if(correct_answers+1 == 10) {
                    win_game();
                } else {
                    message(0);
                }
            } else {
                if(distance-2 == 0){
                    end_game();
                } else {
                    message(1);
                }
            }

        } else {
            var msg = new SpeechSynthesisUtterance(result[2]);
            msg.pitch = 0;
            window.speechSynthesis.speak(msg);
        }
    } else if (e.keyCode == 17) {  //exit button
        //Read out: "Are you sure you want to quit the game? Press again to exit."
        location.href = '/chooseGame';
    }
});


function underline_answer(choice) {
    document.getElementById("answer_up").style.textDecoration = "none";
    document.getElementById("answer_down").style.textDecoration = "none";
    document.getElementById("answer_left").style.textDecoration = "none";
    document.getElementById("answer_right").style.textDecoration = "none";
    document.getElementById(choice).style.textDecoration = "underline overline";
}

function reset_answers() {
    document.getElementById("equation").innerHTML = "";
    document.getElementById("answer_left").innerHTML = "";
    document.getElementById("answer_up").innerHTML = "";
    document.getElementById("answer_right").innerHTML = "";
    document.getElementById("answer_down").innerHTML = "";
    document.getElementById("answer_up").style.textDecoration = "none";
    document.getElementById("answer_down").style.textDecoration = "none";
    document.getElementById("answer_left").style.textDecoration = "none";
    document.getElementById("answer_right").style.textDecoration = "none";
}

//sounds effects from zapsplat.com
$(window).keyup(function(e){
    if (e.keyCode == 17) { 
        window.speechSynthesis.cancel();
        location.href = '/chooseGame';
    } else if (played == true) {
        if (e.keyCode == 38) {
            window.speechSynthesis.cancel();
            var msg = new SpeechSynthesisUtterance(result[1][1]);
            msg.pitch = 0;
            window.speechSynthesis.speak(msg);
            underline_answer("answer_up");
            up_arrow = true;
            answered = true;
            index = 1;
            document.getElementById('jump1').play();
        }else if (e.keyCode == 39) {
            window.speechSynthesis.cancel();
            var msg = new SpeechSynthesisUtterance(result[1][2]);
            msg.pitch = 0;
            window.speechSynthesis.speak(msg);
            underline_answer("answer_right");
            right_arrow = true;
            answered = true;
            index = 2;
            document.getElementById('jump2').play();
        } else if (e.keyCode == 40) {
            window.speechSynthesis.cancel();
            var msg = new SpeechSynthesisUtterance(result[1][3]);
            msg.pitch = 0;
            window.speechSynthesis.speak(msg);
            underline_answer("answer_down");
            down_arrow = true;
            answered = true;
            index = 3;
            document.getElementById('jump3').play();
        } else if (e.keyCode == 37) {
            window.speechSynthesis.cancel();
            var msg = new SpeechSynthesisUtterance(result[1][0]);
            msg.pitch = 0;
            window.speechSynthesis.speak(msg);
            underline_answer("answer_left");
            left_arrow = true;
            answered = true;
            index = 0;
            document.getElementById('jump4').play();

        } 
    }
    
});
