// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/search', function homepage(req, res) {
  res.sendFile(__dirname + '/views/search.html');
});

/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

  // removes ?= from beginning of the url query
  let urlQuery = req._parsedUrl.query.substring(2);

  for (let i = 0; i < todos.length; i ++) {

    // sets the todo task to lowercase
    let todoInQuestion = todos[i].task.toLowerCase();

    // if the todo task includes the search string from the URL, then do nothing
    if (todoInQuestion.includes(urlQuery)) {
    } 
    // if the todo task does NOT include the search term, then get it out of the array
    else {
      let arrayNumber = todos[i]._id - 1;
      todos.splice(arrayNumber,1);
    };
  };

  // finally, display the array of matching todos 
  res.json({todos : todos});
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */

  //display all of the todos
  //res.response({todos: todos});
  res.json({todos : todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  // take input from form and parse it out
  let newID = 0; 
  for (let i = 0; i < todos.length; i++) {
    newID = todos[i]._id;
  };
  newID ++;
  let newTask = req.body.task;
  let newDescription = req.body.description;

  // push the new todo object into the todos array
  let newTodo = { "_id" : newID , "task" : newTask, "description" : newDescription };
  todos.push(newTodo);

  // then display the new todo element
  res.json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  for (let i = 0; i < todos.length; i++) {

    // if the ID in the request matches the ID of the todo
    if (req.params.id == todos[i]._id) {

      // then display that todo
      res.json(todos[i]);
    };
  };
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   for (let i = 0; i < todos.length; i++) {
    if (req.params.id == todos[i]._id) {

      // update the task and description with those from the request
      todos[i].task = req.body.task;
      todos[i].description = req.body.description;

      // then display the updated todo
      res.json(todos[i]);     
    };
   };
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
   for (let i = 0; i < todos.length; i++) {
    if (req.params.id == todos[i]._id) {
      
      // display the removed todo
      res.json(todos[i]);

      // then remove the todo from the array
      let arrayNumber = todos[i]._id - 1;
      todos.splice(arrayNumber,1);
    };
   };
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
