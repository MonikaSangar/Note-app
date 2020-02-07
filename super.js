const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect('mongodb://localhost/userNoteData');

var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
});

const users = require('./model/user-schema');
const notes = require('./model/note-schema');

hostname = 'localhost';
app.set('port', process.env.PORT || 5000);
var port = app.get('port');

app.use(bodyParser.raw());
app.use(express.static('express')).use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/note', (req, res) => {
    res.render('note');
});
app.get('/user', (req, res) => {
    res.render('user');
});

app.post('/saveUser',  function(req, res) {
    try {
        let getData = new users();
        getData.name = req.body.name;
        getData.email = req.body.email;
        getData.phone = req.body.phone;
        getData.save();
        console.log('userData user data', getData);
         res.send({
            data: getData,
            status: "success"
        });
    } catch {
        res.send({
            status: "failed"
        })
    }
});

app.post('/note', function (req, res) {
    try {
        let newNote = new notes();
        newNote.userID = req.body.userID;
        newNote.title = req.body.title;
        newNote.content = req.body.content;
        newNote.save();
        console.log('saved note data', newNote);
        res.send({
            data: newNote,
            status: "success"
        });
    } catch {
        res.send({
            status: "failed"
        })
    }
});
app.listen(port, (req, res) => {
    console.log(`I am running at port number http://${hostname}:${port}`);
});