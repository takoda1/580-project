let express = require('express')
let app = express();
let path = require('path');

require('dotenv').config();

app.get('/', (req, res) => {
    res.sendFile('home.html', {
        root: path.join(__dirname, './')
    });
})

var server = app.listen(process.env.PORT, () => {
    console.log("App is running on port" + process.env.PORT)
})