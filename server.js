// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");

var todos = [
  { id: 1, name: "Đi chợ", status: true },
  { id: 2, name: "Nấu cơm", status: false },
  { id: 3, name: "Rửa bát", status: false },
  { id: 4, name: "Học code tại CodersX", status: false }
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (request, response) => {
  response.render("todos/index", {
    todos: todos
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var filteredTodos = todos.filter(todo => {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("todos/index", {
    todos: filteredTodos,
    q: q
  });
});

app.post("/todos/create", (req, res) => {
  var newTodo = {
    id: todos[todos.length - 1].id + 1,
    name: req.body.todo,
    status: req.body.status
  };
  todos.push(newTodo);
  res.redirect("back");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
