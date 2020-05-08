// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const adapter = new FileSync("db.json");
const db = low(adapter);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");

db.defaults({ todos: [] }).write();

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (request, response) => {
  response.render("todos/index", {
    todos: db.get("todos").value()
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var filteredTodos = db
    .get("todos")
    .value()
    .filter(todo => {
      return todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("todos/index", {
    todos: filteredTodos,
    q: q
  });
});

app.get("/todos/:id/delete", (req, res) => {
  var id = parseInt(req.params.id);
  db.get("todos")
    .remove({ id: id })
    .write();
  res.redirect("back");
});

app.post("/todos/create", (req, res) => {
  var newTodo = {
    id: generateId(),
    text: req.body.text,
    status: req.body.status
  };
  db.get("todos")
    .push(newTodo)
    .write();
  res.redirect("/todos");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

function generateId() {
  let todos = db.get("todos").value();
  let temp, temp1;
  for (let i = 0; i < todos.length; i++) {
    temp1 = db
      .get("todos")
      .find({ id: i + 1 })
      .value();
    console.log(typeof temp1);
      if (!temp1) {
        console.log(i);
        return i + 1;
      }
  }
  return todos.length + 1;
}
