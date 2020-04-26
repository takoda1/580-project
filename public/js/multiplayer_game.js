//This game is highly recycled, and has elements added for accessbility
//THIS GAME USES SOUND EFFECTS FROM SUBNAUTICA
let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

let x = w.innerWidth - 900|| e.clientWidth || g.clientWidth,
    y = w.innerHeight - 300 || e.clientHeight || g.clientHeight;

let width = x - 16,
    height = y - 16;

let backgroundAudio = new Audio('../sounds/crashSite.mp3');


var currentPosition;

var N = 1 << 0,
    S = 1 << 1,
    W = 1 << 2,
    E = 1 << 3;

var body = document.querySelectorAll('body');


var layout = [],
    fronteirTest = [];
// Determines the size of the blocks 
var cellSize = 16,
    cellSpacing = 8,
    cellWidth = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)),
    cellHeight = Math.floor((height - cellSpacing) / (cellSize + cellSpacing)),
    cells = new Array(cellWidth * cellHeight), // each cell’s edge bits
    frontier = [];

var maxY = Math.floor((height - cellSpacing) / (cellSize + cellSpacing)) - 1,
    maxX = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)) - 1;


var canvas = document.createElement('canvas');

canvas.setAttribute("id", "canvas");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

body[0].appendChild(canvas);

var context = canvas.getContext("2d");


context.translate(
    Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2),
    Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2)
);



var canvas2 = document.createElement('canvas');

canvas2.setAttribute("id", "canvas2");
canvas2.setAttribute("width", width);
canvas2.setAttribute("height", height);

body[0].appendChild(canvas2);

var game = canvas2.getContext("2d");

game.translate(
    Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2),
    Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2)
);

//color of the maze
context.fillStyle = "#00ffff";

// Add a random cell and two initial edges.
var start = (cellHeight - 1) * cellWidth;
cells[start] = 0;
fillCell(start);
frontier.push({
    index: start,
    direction: N
});
frontier.push({
    index: start,
    direction: E
});

// Explore the frontier until the tree spans the graph.
function run() {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
    backgroundAudio.play();
    var done, k = 0;
    while (++k < 50 && !(done = exploreFrontier()));
    return done;
};

function exploreFrontier() {

    if ((edge = popRandom(frontier)) == null) {
        layout.push({ x: 0, y: maxY, d1: 0, d0: 0 })
        for (var i = layout.length - 1; i >= 0; i--) {
            if (layout[i].x === 0 && layout[i].y === maxY) {
                drawPlayer(layout[i]);
            }
        };
        return true;
    }

    var edge,
        i0 = edge.index,
        d0 = edge.direction,
        i1 = i0 + (d0 === N ? -cellWidth : d0 === S ? cellWidth : d0 === W ? -1 : +1),
        x0 = i0 % cellWidth,
        y0 = i0 / cellWidth | 0,
        x1,
        y1,
        d1,
        open = cells[i1] == null, // opposite not yet part of the maze
        north,
        east,
        south,
        west;
    // makes the maze color
    context.fillStyle = open ? "#00ffff" : "transparent";
    if (d0 === N) fillSouth(i1), x1 = x0, y1 = y0 - 1, d1 = S, south = true;
    else if (d0 === S) fillSouth(i0), x1 = x0, y1 = y0 + 1, d1 = N, south = true;
    else if (d0 === W) fillEast(i1), x1 = x0 - 1, y1 = y0, d1 = E, east = true;
    else fillEast(i0), x1 = x0 + 1, y1 = y0, d1 = W, east = true;




    if (open) {
        fillCell(i1);
        cells[i0] |= d0, cells[i1] |= d1;
        context.fillStyle = "transparent";
        if (y1 > 0 && cells[i1 - cellWidth] == null) fillSouth(i1 - cellWidth), frontier.push({
            index: i1,
            direction: N
        }), south = true;
        if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null) fillSouth(i1), frontier.push({
            index: i1,
            direction: S
        }), south = true;
        if (x1 > 0 && cells[i1 - 1] == null) fillEast(i1 - 1), frontier.push({
            index: i1,
            direction: W
        }), east = true;
        if (x1 < cellWidth - 1 && cells[i1 + 1] == null) fillEast(i1), frontier.push({
            index: i1,
            direction: E
        }), east = true;
    }

    layout.push({
        open: open,
        x: x1,
        y: y1,
        d0: d0,
        d1: d1
    });
}

function fillCell(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
}

function fillEast(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect((i + 1) * (cellSize + cellSpacing), j * cellSize + (j + 1) * cellSpacing, cellSpacing, cellSize);
}

function fillSouth(index) {
    var i = index % cellWidth,
        j = index / cellWidth | 0;
    context.fillRect(i * cellSize + (i + 1) * cellSpacing, (j + 1) * (cellSize + cellSpacing), cellSize, cellSpacing);
}

function popRandom(array) {
    if (!array.length) return;
    var n = array.length,
        i = Math.random() * n | 0,
        t;
    t = array[i], array[i] = array[n - 1], array[n - 1] = t;
    return array.pop();
}
//Changing the color and size of the balls
function drawPlayer(position) {
    game.clearRect(0, 0, width, height);
    currentPosition = position;
    var playerX = position.x * cellSize + (position.x + 1) * cellSpacing;
    var playerY = position.y * cellSize + (position.y + 1) * cellSpacing
    var finishX = maxX * cellSize + (maxX + 1) * cellSpacing;
    var finishY = 0 * cellSize + (0 + 1) * cellSpacing
    game.beginPath();
    game.arc(finishX + (cellSize / 2), finishY + (cellSize / 2), cellSize / 2, 0, 2 * Math.PI, false);
    game.fillStyle = "green";
    game.fill();
    game.beginPath();
    game.arc(playerX + (cellSize / 2), playerY + (cellSize / 2), cellSize / 2, 0, 2 * Math.PI, false);
    game.fillStyle = "black";
    game.fill();
}

window.addEventListener("keydown", (e) => {
    if (e.which === 32) {
        //var msg = new SpeechSynthesisUtterance("Get through the maze with the arrow keys.");
        //window.speechSynthesis.speak(msg);
        animate();
    }
    console.log(e.keyCode);
    if (e.keyCode === 17) {
        location.href = "/chooseGame";
    }
})

window.addEventListener("keydown", function (e) {

    var value = e.which;

    if (value === 37) moveWest(), e.preventDefault();
    if (value === 38) moveNorth(), e.preventDefault();
    if (value === 39) moveEast(), e.preventDefault();
    if (value === 40) moveSouth(), e.preventDefault();

    return false;

});

function playFootstep() {
    let audio = new Audio('../sounds/footstep.mp3');
    audio.play();
}

function moveWest() {
    var newY = currentPosition.y;
    var newX = currentPosition.x - 1;
    var newPosition;
    let audio = new Audio('../sounds/crabsnake.mp3');

    if (newX < 0) {
        audio.play();
        return false;
    }

    for (var i = layout.length - 1; i >= 0; i--) {
        if (layout[i].x === newX && layout[i].y === newY) {
            newPosition = layout[i];
        }
    };

    if (newPosition.x === maxX && newPosition.y === 0) {
        gameComplete();
    }
    


    if ((currentPosition.d1 === W) || (newPosition.d1 === E)) {
        drawPlayer(newPosition);
        playFootstep();
    }
    else {
        audio.play();
    }
}

function moveEast() {
    var newY = currentPosition.y;
    var newX = currentPosition.x + 1;
    var newPosition;
    let audio = new Audio('../sounds/waterSplash.mp3');

    if (newX > maxX) {
        audio.play();
        return false;
    }


    for (var i = layout.length - 1; i >= 0; i--) {
        if (layout[i].x === newX && layout[i].y === newY) {
            newPosition = layout[i];
        }
    };

    if (newPosition.x === maxX && newPosition.y === 0) { 
        gameComplete();
    }

    if ((currentPosition.d1 === E) || (newPosition.d1 === W)) {
        drawPlayer(newPosition);
        playFootstep();
    }

    if (newPosition.x == currentPosition.x + 1 && newPosition.y == currentPosition.y) {
        console.log("ABC");
        
        audio.play();
    }


}

function moveNorth() {
    var newY = currentPosition.y - 1;
    var newX = currentPosition.x;
    var newPosition;
    let audio = new Audio('../sounds/cartoonBonk.mp3');


    if (newY < 0) {
        audio.play();
        return false;
    }

    for (var i = layout.length - 1; i >= 0; i--) {
        if (layout[i].x === newX && layout[i].y === newY) {
            newPosition = layout[i];
        }
    };

    if (newPosition.x === maxX && newPosition.y === 0) {
        gameComplete();
    }

    if ((currentPosition.d1 === N) || (newPosition.d1 === S)) {
        drawPlayer(newPosition);
        playFootstep();
    }
    if (newPosition.x == currentPosition.x && newPosition.y == currentPosition.y - 1) {
        console.log("ABC");
        
        audio.play();
    }
}

function moveSouth() {
    var newY = currentPosition.y + 1;
    var newX = currentPosition.x;
    var newPosition;
    let audio = new Audio('../sounds/reaperLeviathan.mp3');

    if (newY > maxY) {
        audio.play();
        return false;
    }

    for (var i = layout.length - 1; i >= 0; i--) {
        if (layout[i].x === newX && layout[i].y === newY) {
            newPosition = layout[i];
        }
    };

    if (newPosition.x === maxX && newPosition.y === 0) {
        gameComplete();
    }

    if ((currentPosition.d1 === S) || (newPosition.d1 === N)) {
        drawPlayer(newPosition);
        playFootstep();
    }
    console.log(currentPosition);
    console.log(newPosition);
    if (newPosition.x == currentPosition.x && newPosition.y == currentPosition.y + 1) {
       
        audio.play();
    }

}
//Changes the alert when you win the game
function gameComplete() {
    var msg = new SpeechSynthesisUtterance("YOU WON! Good job. To play again, press the spacebar. To\
     return to the game choice page, press the control key in the\
     bottom left corner");
    window.speechSynthesis.speak(msg);
}


(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

function animate() {
    console.log("ABC");
    requestAnimationFrame(function () {
        if (!run()) {
            animate();
        }
    });
}

animate();
var msg = new SpeechSynthesisUtterance("Get through the maze with the arrow keys. Press space to restart.");
window.speechSynthesis.speak(msg);


//socket.on('message', function (data) {
  //  console.log(data);
//}); 
/*
let movement = {
    up: false,
    down: false,
    left: false,
    right: false
}

let canvas = document.getElementById("mazecanvas");

let context = canvas.getContext("2d");
let currRectX = 425;
let currRectY = 3;
let mazeWidth = 556;
let mazeHeight = 556;
let intervalVar;
function drawMazeAndRectangle(rectX, rectY) {
    makeWhite(0, 0, canvas.width, canvas.height);
    let mazeImg = new Image();
    mazeImg.onload = function () { // when the image is loaded, draw the image, the rectangle and the circle
        context.drawImage(mazeImg, 0, 0);
        drawRectangle(rectX, rectY, "#0000FF", false, true);
        context.beginPath();
        context.arc(542, 122, 7, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#00FF00';
        context.fill();
    };
    mazeImg.src = "maze.gif";
}
function drawRectangle(x, y, style) {
    makeWhite(currRectX, currRectY, 15, 15);
    currRectX = x;
    currRectY = y;
    context.beginPath();
    context.rect(x, y, 15, 15);
    context.closePath();
    context.fillStyle = style;
    context.fill();
}

document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});
document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

socket.emit('New player');
setInterval(() => {
    socket.emit('movement', movement);
}, 1000 / 60)
*/
/*
function message() {
    document.getElementById('aForm').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', document.getElementById('m').val());
        document.getElementById('m').val('');
        return false;
    });
};*/