var express =           require("express");
var app =               express();
var port =              process.env.PORT || 3000;
var path =              require('path');

const accountSid = '' ;
const authToken = '';
const client = require('twilio')(accountSid, authToken);

app.use(express.static(path.join(__dirname,"public")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next){
    var htmltxt ='<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>'
    htmltxt += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">';
    htmltxt += '<center><h1>Make Call</h1></center>';
    htmltxt += '<br><center><a href="/makeCall" class="btn btn-primary">Make Call</a></center></body></head>';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(htmltxt);
});

app.get('/makeCall', function(req, res, next){
    var htmltxt ='<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>'
    htmltxt += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">';
    htmltxt += '<center><h1>Calling...</h1></center>';
    htmltxt += '<br><center><a href="/" class="btn btn-danger">Back</a></center></body></html>';
    client.calls
        .create({
            url: 'https://bcrazytesting.herokuapp.com/voice.xml',
            to: '+918708372614',
            from: '+18143249002'
        })
        .then(call => console.log(call.sid))
        .done();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmltxt);
});

app.post('/voice.xml', function(req, res, next){
  filetxt  = '<?xml version="1.0" encoding="UTF-8"?>';
  filetxt += '<Response>';
  filetxt += '<Play>https://bcrazytesting.herokuapp.com/English.mp3</Play>';
  filetxt += '</Response>';
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(filetxt);
});

app.listen(port,()=>{
  console.log("started at",port)
});
