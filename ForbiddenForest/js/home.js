function display() {
   alert("Hello World!");
}


//document.addEventListener('keydown', function (display) {
//   alert("testing")
//}, false);
                          
                          
function myFunction() {
   alert("Hello World!");
}


$(document).keydown(function(e){
    if (e.keyCode == 32) { 
       location.href = "play-game.html";
    }if (e.keyCode == 37) { 
       location.href = ".../choose_game.html";
       return false;}
});