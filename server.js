let express = require('express')
let app = express();
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');
let server = http.Server(app); 

require('dotenv').config();

app.use(express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home_page/home.html'));
})

app.get('/chooseGame', (req, res) => {
    res.sendFile(path.join(__dirname, 'home_page/choose_game.html'))
})

app.get('/forbiddenForest', (req, res) => {
    res.sendFile(path.join(__dirname, 'ForbiddenForest/play-game.html'))
})

app.get('/multiplayer', (req, res) => {
    res.sendFile(path.join(__dirname, 'multiplayer_game/home.html'))
})

app.get('/clapit', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

//Takoda server side game code

let io = socketIO(server);
let players = {};
let playerCount = 0;

io.on('connection', (socket) => {
    console.log("Someone connected");

    socket.on('New player', () => {
        players[socket.id] = {
            x: 0,
            y: 0
        }
        playerCount++;
        console.log(players.length);
    })


    socket.on('disconnect', () => {
        console.log("Someone disconnected")
        playerCount--;
    })
    socket.on('chat message', (msg) => {
        console.log('message:' + msg);
    })
})

server.listen(process.env.PORT, () => {
    console.log("Starting server on port " + process.env.PORT)
})

