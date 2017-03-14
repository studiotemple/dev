const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser('alsdkjflksdjf!@#523!@#'));
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

app.get('/cart/:id', (req, res) => {
  var id = req.params.id;
  if(req.signedCookies.cart){
    var cart = req.signedCookies.cart;
  } else {
    var cart = {};
  }
  if(!cart[id]){
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id])+1;
  res.cookie('cart', cart, {signed: true});
  res.redirect('/cart');
});

app.get('/cart', (req, res) => {
  var cart = req.signedCookies.cart;
  if(!cart){
    res.send('장바구니에 담긴 상품이 없습니다.');
  } else {
    var output = '';
    for(var id in cart){
      output += `<li>${products[id].title} (수량 : ${cart[id]})</li>`;
    }
  }
  res.send(`
    <h1>장바구니</h1>
    <ul>${output}</ul>
    <a href="/products">상품목록으로</a>
    `);
});

app.get('/count', (req, res) => {
  if(req.signedCookies.count) {
    var count = parseInt(req.signedCookies.count);
  } else {
    var count = 0;
  }
  count = count+1
  res.cookie('count', count, {signed:true});
  res.send('count : '+ count);
});
app.listen(3003, () => {
  console.log('Conneted 3003 port!!');
});
