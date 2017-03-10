const express = require('express');
const app = express();
app.get('/', function(req, res){
  res.send('hello babo');
});
app.get('/login', function(req, res){
  res.send('login page');
});
app.get('/babo', (req, res) => {
  res.send('are u babo?');
});
app.get('/jiji', (req, res) => {
  res.send('jiji');
})
app.listen(3000, function(){
  console.log('Conneted 3000 port!');
});
