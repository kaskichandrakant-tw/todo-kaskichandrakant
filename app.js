let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const appUtility = require('./appUtility.js');

let logRequest = appUtility.logRequest;
let getHeader = appUtility.getHeader;
let isFile = appUtility.isFile;
let getFileData = appUtility.getFileData;

let TodoApp = require('./appModels/todoApp.js');
let todoApp = new TodoApp();
todoApp.addAccount('chandrakant');
let validUsers = todoApp.getAllAccounts();

let serveStaticFile = function(req, res) {
  let path = req.url;
  if (path == '/') {
    path = '/login.html'
  }
  let filePath = './public' + path
  if (fs.existsSync(filePath) && isFile(filePath)) {
    let data = fs.readFileSync(filePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', getHeader(path));
    res.write(data);
    res.end();
    return;
  }
}

let loadUser = (req, res) => {
  let sessionid = req.cookies.sessionid;
  let user = validUsers.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
};

let redirectLoggedInUserToHome = (req, res) => {
  if (req.urlIsOneOf(['/', '/login']) && req.user) res.redirect('/home');
}

let postLogin = (req, res) => {
  let user = validUsers.find((u) => u.userName == req.body.userName);
  req.user = user
  if (!user) {
    res.setHeader('Set-Cookie', `logInFailed=true`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
}

let serveHome = (req, res) => {
  let data = getFileData('./public/home.html')
  let userName = req.user.userName;
  res.write(data.replace('user', userName));
  res.end();
};
let serveTodoForm = (req, res) => {
  res.redirect('/addTodo.html')
};

let logout = (req, res) => {
  res.setHeader('Set-Cookie', [`loginFailed=false,Expires=${new Date(1).toUTCString()}`, `sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
}

let getAllTodoId = function(todos) {
  return Object.keys(todos);
}

let addTodoList = (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  req.user.addTodoList(title, description);
  res.redirect('/home');
};
let addTodoTitle = (req, res) => {
  let anchors = '';
  let allTodos = req.user.getAllTodoLists();
  let allTodoIds = getAllTodoId(allTodos);
  allTodoIds.forEach((ele) => {
    anchors += `<div id=list_${ele}><p>${allTodos[ele].title}</p><button id=${ele} onclick=viewTodo(event)>viewTodo</button></div>`
  })
  res.write(anchors);
  res.end();
}

let getTodoItems = (req, res) => {
  let id = req.body.todoId;
  req.user.addTask(id, 'sFCDA');
  let title = req.user.getTitle(id);
  let htmlData = `<h1>${title}</h1><br>`;
  let tasks = req.user.getTasks(id);
  let allTaskIds = getAllTodoId(tasks);
  allTaskIds.forEach((task) => {
    htmlData += `<p>${tasks[task].task}</p><button id=edit_${task} onclick=editTask(event)>editTodo</button><button id=delete_${task} onclick=deleteTodo(event)>delete</button>`
  })
  res.write(htmlData)
  res.end();
}

let deleteTodo = function(req, res) {
  let id = req.body.todoId;
  req.user.addTask(id, 'sFCDA');
  req.user.romoveTask()
  let title = req.user.getTitle(id);
  let htmlData = `<h1>${title}</h1><button onclick=addTask(event)></><br>`;
  let tasks = req.user.getTasks(id);
  let allTaskIds = getAllTodoId(tasks);
  allTaskIds.forEach((task) => {
    htmlData += `<p>${tasks[task].task}</p><button id=edit_${task} onclick=editTask(event)>editTodo</button><button id=delete_${task} onclick=deleteTodo(event)>delete</button>`
  })
  res.write(htmlData)
  res.end();
}

let app = WebApp.create();
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(serveStaticFile);
app.post('/login', postLogin);
app.get('/home', serveHome)
app.get('/logout', logout)
app.get('/todoForm', serveTodoForm);
app.post('/addTodoList', addTodoList);
app.get('/addTodoTitle', addTodoTitle);
app.post('/getTodoItems', getTodoItems);
app.post('/deleteTodo', deleteTodo);

app.get('/login', (req, res) => {
  res.redirect('/')
})

module.exports = app;
