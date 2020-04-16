let games = ['Clap It', 'The Forbidden Forest', "King of the Maze"]
var index = 0;
var selected = false;
var first = true

function playMusic() {
    let audio = new Audio('../sounds/interstellar.ogg')
    audio.play();
}

playMusic();
    
$(window).keyup(function(e){
    if (first == true){
        var msg = new SpeechSynthesisUtterance("Use the left and right arrow keys to navigate between games");
        window.speechSynthesis.speak(msg);
        first = false;
    } else {
        window.speechSynthesis.cancel();
        if (selected == true && e.keyCode== 32){
            if (index%3==0){
                // jump to clap it
                location.href = '/clapit';
            }else if (index%3==1) {
                //jump to Forbidden Forest
                location.href = '/forbiddenForest';
            }else {
                //jump to takoda's game
                location.href = "/multiplayer";
            }
        } else {
            if (e.keyCode == 39) { 
                index = index+1;
            } else if (e.keyCode == 37) {
                if (index > 0) {
                    index = index-1;
                } else {
                    index = games.length-1;
                }
            }
        }
    }
    var msg = new SpeechSynthesisUtterance("You are now selecting " + games[index%3]);
    window.speechSynthesis.speak(msg);
    msg = new SpeechSynthesisUtterance("Press the spacebar to play " + games[index%3]);
    window.speechSynthesis.speak(msg);
    selected = true;
    addBorder();
})

function addBorder() {
    var id = "";
    if (index%3==0){
        id = "clap_it";
    }else if (index%3==1) {
        id = "forbidden_forest";
    }else {
        id = "takoda_game";
    }
    document.getElementById("clap_it").style.border = "0px solid yellow";
    document.getElementById("forbidden_forest").style.border = "0px solid yellow";
    document.getElementById("takoda_game").style.border = "0px solid yellow";
    document.getElementById(id).style.border = "15px solid yellow";
}
