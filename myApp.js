require('dotenv').config();
let express = require('express');
let app = express();

console.log("Hello World");

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// use middleware function (express.static) to give access
// to the static assets directory
app.use('/public', express.static(__dirname + '/public'));

// use dotenv to modify the response
app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({
            "message": "HELLO JSON"
        });
    } else {
        res.json({
            "message": "Hello json"
        });
    }
});

// time server

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    console.log(req.time);
    res.send({'time': req.time});
});

// echo server
app.get('/:word/echo', (req, res) => {
    res.send({'echo': req.params.word});
});

// get query parameter input and response with the recieved parameter values
// chain the get and post methods
// test: pass the url: <app-url>/name?first=firstname&last=lastname
app.route('/name').get((req, res) => {
    res.send({'name': `${req.query.first} ${req.query.last}`});
});





























 module.exports = app;
