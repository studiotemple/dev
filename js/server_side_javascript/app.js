const express = require('express');
const app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.get('/template', (req, res) => {
  res.render('temp', {time: Date(),
    title: 'jade'
   });
});
app.get('/', function(req, res){
    res.send('Hello home page');;
});
app.get('/topic/:id', (req, res) => {
  var topics = [
    'javascript is...',
    'nodejs is...',
    'express is...'
  ];
  var output = `
  <a href="/topic/0">javascript</a><br>
  <a href="/topic/1">node</a><br>
  <a href="/topic/2">express</a><br>
  ${topics[req.params.id]}
  `
  res.send(output);
});
app.get('/topic/:id/:mode', (req, res) => {
  res.send(req.params.id+','+req.params.mode);
});
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});
app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.png">')
})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
