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
    res.sendFile(path.join(__dirname, 'Clap-it/Clap-It.html'))
})
//Takoda server side game code

let io = socketIO(server);
let players = {};
players.playerCount = 0;

io.on('connection', (socket) => {
    console.log("Someone connected");

    socket.on('New player', () => {
        players[socket.id] = {
            x: 0,
            y: 0
        }
        players.playerCount++;
        console.log(players.playerCount)
        console.log(players);

        //setup game if certain number of players reached

        //I'm thinking I just have a few static mazes that randomly gets picked

    })


    socket.on('disconnect', () => {
        console.log("Someone disconnected")
        players.playerCount--;
    })
    socket.on('chat message', (msg) => {
        console.log('message:' + msg);
    })
})

server.listen(process.env.PORT, () => {
    console.log("Starting server on port " + process.env.PORT)
})

