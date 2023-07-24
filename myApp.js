let express = require('express');

let app = express();

let bodyParser = require('body-parser');

/* app.get('/', function(req, res) {
    res.send('Hello Express');
}) */

app.use(function logger(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
})

app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
})


app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({"message": "Hello json".toUpperCase()});
  } else {
    res.json({"message": "Hello json"});
    }
  }
)

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.send({time: req.time});
});

app.get('/:word/wcho', function(req, res) {
  var word = req.params.word;
  res.send({echo: word});
})


app.get('/name', function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({ name: firstName + " " + lastName})
})

app.post('/name', function(req, res) {
  var firstName = req.body.first;
  var lastName = req.body.last;
  res.json({ name: firstName + " " + lastName})
})

console.log("Hello World");




































 module.exports = app;
