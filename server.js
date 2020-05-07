// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

app.set('view engine', 'pug');

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos', (request, response) => {
  response.render('todos/index',{
    todos: [
      {id: 1, name: "Đi chợ", status: true},
      {id: 2, name: "Nấu cơm", status: false},
      {id: 3, name: "Rửa bát", status: false},
      {id: 4, name: "Học code tại CodersX", status: false}
    ]
  })
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
