var express =           require("express");
var app =               express();
var port =              process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next){
  var htmltxt = '<center><h1>Welcome</h1></center>';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(htmltxt);
});

app.post('/voice.xml', function(req, res, next){
  filetxt  = '<?xml version="1.0" encoding="UTF-8"?>';
  filetxt += '<Response>';
  //filetxt += '<Say voice="woman" language="en-IN">Hello we are from IPE, Teacher Learning Program. This call is to inform you that, you are invited for third phase'
  //filetxt += ' teacher learning program. We will sortly call you regarding your confirmation. Thankyou, and have a nice day.</Say>';
  filetxt += '<Play>https://dreamunplugged.herokuapp.com/media/songs/Magic%20Flute.mp3</Play>';
  filetxt += '<Play>http://demo.twilio.com/docs/classic.mp3</Play>';
  filetxt += '</Response>';
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(filetxt);
});

app.listen(port,()=>{
  console.log("started at",port)
});
