var played = false;
var distance = 10;
var answered = false;
var up_arrow = false;
var down_arrow = false;
var left_arrow = false;
var right_arrow = false;
var index = 0;
var correct_answers = 0;
//var move = ;


function getEquation() {
    var number = Math.floor((Math.random() * 4) + 1);
    if (number == 1) {
       // addition problem 
        var num1 = Math.floor((Math.random() * 50) + 1);
        var num2 = Math.floor((Math.random() * 50) + 1);
        equation = num1.toString() + ' + ' + num2.toString();
        var answer = num1+num2;
    }else if (number == 2) {
       // subtraction problem 
        var num1 = Math.floor((Math.random() * 50) + 1);
        var num2 = Math.floor((Math.random() * 50) + 1);
        equation = Math.max(num1,num2).toString() + ' - ' +  Math.min(num1,num2).toString();
        var answer = Math.max(num1,num2)-Math.min(num1,num2);
    }else if (number == 3) {
        var num1 = Math.floor((Math.random() * 15) + 1);
        var num2 = Math.floor((Math.random() * 15) + 1);
        equation = num1.toString() + ' x ' + num2.toString();
        var answer = num1 * num2;
    }else {
        var num1 = Math.floor((Math.random() * 15) + 1);
        var answer = Math.floor((Math.random() * 15) + 1);
        var num2 = num1 * answer;
        equation = num2.toString() + ' / ' + num1.toString();
    } return [equation, answer];
}

function generateAnswers(answer) {
    var a = 0;
    var b = 0;
    var c = 0;
    if (answer < 20) {
        while(a == b || c==b || a==c) {
            a = Math.floor(Math.random()*30+1);
            b = Math.floor(Math.random()*30+1);
            c = Math.floor(Math.random()*30+1);
        }
    }else if (answer < 50) {
        while(a == b || c==b || a==c) {
            a = answer-Math.floor((Math.random()*10+1));
            b = answer-Math.floor((Math.random()*10+1));
            c = answer-Math.floor((Math.random()*10+1));
        }
    }else {
        while(a == b || c==b || a==c) {
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
    //document.getElementById("homescreen").innerHTML = "";
    document.write("This is where all of the instruction will be. In the real game, they will be read outloud.")
}

function playGame() {
    var values = getEquation();
    var eq = values[0];
    var an = generateAnswers(values[1]);
    document.getElementById("equation").innerHTML = eq + " = ";
    document.getElementById("answers").innerHTML = an.toString();
    return [values[1],an];
}

function message(a) {
    if(a == 0){
        correct_answers = correct_answers+1;
        document.getElementById("instructions").innerHTML = "Correct Answer <br> You are one step closer to getting out of the forrest <br> Answer " + (10-correct_answers).toString() + " more questions correctly to leave the forrest";
    }else {
        distance = distance -1;
        document.getElementById("instructions").innerHTML = "Incorrect Answer! <br><br> Correct answer is " + result[0] + "<br> The monster is now " + distance + " feet away";
    }
}

$(window).keypress(function(e){
    e.preventDefault();
    //spacebar pressed
    if (e.keyCode == 32) { 
        //BeginInstructions();
        if( played == false) {
            document.getElementById("instructions").innerHTML = "";
            result = playGame();
            played = true; 
        }
        else if (played == true && answered == true) {
            if(result[1][index]==result[0]){
                message(0);
                if(correct_answers == 10) {
                    //you win the game
                }
            } else {
                message(1);
                if(distance == 0){
                    location.href = "end_game.html";
                }
            }
            document.getElementById("equation").innerHTML = "";
            document.getElementById("answers").innerHTML = "";

            played = false;
            answered = false;

        }else {
            console.log("Error: stuck");
        }
    } else if (e.keyCode == 17) { 
        location.href = "../choose_game.html";
    }
});

$(window).keyup(function(e){
    if (e.keyCode == 17) { 
        location.href = "../choose_game.html";
    } else if (answered == false && played == true) {
        if (e.keyCode == 38) {
            up_arrow = true;
            answered = true;
            index = 1;
        }else if (e.keyCode == 39) {
            right_arrow = true;
            answered = true;
            index = 2;
        } else if (e.keyCode == 40) {
            down_arrow = true;
            answered = true;
            index = 3;
        } else if (e.keyCode == 37) {
            left_arrow = true;
            answered = true;
            index = 0;
        }    
    }
    
});

