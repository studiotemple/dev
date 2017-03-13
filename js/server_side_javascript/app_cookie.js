const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser());
var products = {
  1: {title: "마우스"},
  2: {title: "키보드"}
};
app.get('/products', (req, res) => {
  var output = '';
  for(var name in products){
    output += `
    <li>
      <a href="/cart/${name}">${products[name].title}</a>
    </li>
    `;
  }
  res.send(`<h1>상품들은?</h1><ul>${output}</ul><a href="/cart">cart</a>`);
});

app.get(['/cart','/cart/:id'], (req, res) => {
  res.send('products');
});

app.get('/count', (req, res) => {
  if(req.cookies.count) {
    var count = parseInt(req.cookies.count);
  } else {
    var count = 0;
  }
  count = count+1
  res.cookie('count', count);
  res.send('count : '+req.cookies.count);
});
app.listen(3003, () => {
  console.log('Conneted 3003 port!!');
});
