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


server.listen(process.env.PORT, () => {
    console.log("Starting server on port " + process.env.PORT)
})