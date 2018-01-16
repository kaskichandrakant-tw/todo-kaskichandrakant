let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const appUtility = require('./appUtility.js');
let logRequest = appUtility.logRequest;
let getHeader = appUtility.getHeader;
let isFile = appUtility.isFile;
let getFileData = appUtility.getFileData;
let TodoApp = require('./appModels/todoApp.js')
let todoApp = new TodoApp();
todoApp.addAccount('***REMOVED***');
let validUsers = todoApp.getAllAccounts();

validUsers.push(todoApp.allAccount)
let serveStaticFile = function(req, res) {
  let path = req.url;
  if (path == '/' || path == '/login') {
    res.redirect('/login.html');
  }
  let filePath = './public' + path;
  if (fs.existsSync(filePath) && isFile(filePath)) {
    let data = getFileData('./public' + path);
    res.statusCode = 200;
    res.setHeader('Content-Type', getHeader(path));
    res.write(data);
    res.end();
    return;
  }
}

let serveFile = function(req, res) {
  if (req.method == "GET") {
    serveStaticFile(req, res);
  }
}
let postLogin = (req, res) => {
  let user = validUsers.find((u) => u.userName == req.body.userName);
  if (!user) {
    res.setHeader('Set-Cookie', `logInFailed=true`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
};
let loadUser = (req, res) => {
  let sessionid = req.cookies.sessionid;
  let user = validUsers.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
};
let serveHomePage = (req, res) => {
  let data = getFileData('./public/home.html')
  let userName = req.user.userName;
  data=data.replace(/TODOTITLES/,createTodoTitleAnchors(userName));
  res.write(data.replace('user', userName));
  res.end();
}
let redirectLoggedInUserToHome = (req, res) => {
  if (req.urlIsOneOf(['/', '/login']) && req.user) res.redirect('/home');
}
let getLogout = (req, res) => {
  res.setHeader('Set-Cookie', [`loginFailed=false,Expires=${new Date(1).toUTCString()}`, `sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
}
let getAllTodoId = function(todos) {
  return Object.keys(todos);
}
let createTodoTitleAnchors=(userName)=>{
  let anchors='';
  let allTodos=todoApp.getAllTodoLists(userName);
  let allTodoIds=getAllTodoId(allTodos);
  allTodoIds.forEach((ele)=>{
    anchors+=`<li><a id=${ele} href=viewTodo>${allTodos[ele].title}</a><li>`
  })
  return anchors;
}
let createTodoTaskAnchors=(req,todoId)=>{
  let anchors='';
  let allTodos=req.user.getTasks(todoId);
  let allTodoIds=getAllTodoId(allTodos);
  allTodoIds.forEach((ele)=>{
    anchors+=`<li><h3 id=${ele} href=addTodoTask>${allTodos[ele].task}</h3><li>`
  })
  console.log(anchors);
  return anchors;
}



let addTodoList = (req, res) => {
  let data = getFileData('./public/addTodo.html');
  res.write(data);
  res.end();
}
let postAddTodo = (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let userName = req.user.userName;
  todoApp.addTodoList(userName, title, description);
  res.redirect('/home')
}

let getAddTodoTaskPage=(req,res)=>{
  let data=getFileData('./public/addTodoTask.html');
  res.write(data)
  res.end();
}
let addTodoTask=(req,res)=>{
  let task=req.body.task;
  req.user.addTask(1,task);
  res.redirect('/viewTodo');
}
let viewTodo=(req,res)=>{
  let fileData=getFileData('./public/viewTodo.html');
  let tasks=req.user.getTasks(1)
  let dataWithTitle=fileData.replace(/TODOTITLE/,req.user.getTitle(1));
  let todo=createTodoTaskAnchors(req,1);
  let allData=dataWithTitle.replace(/TODOTASKS/,todo);
  res.write(allData)
  res.end();
}

let app = WebApp.create();
app.use(serveFile);
app.post('/login', postLogin);
app.use(loadUser);
app.get('/home', serveHomePage);
app.use(redirectLoggedInUserToHome);
app.get('/addTodoList', addTodoList);
app.post('/addTodoList', postAddTodo);
app.get('/addTodoTask',getAddTodoTaskPage);
app.post('/addTodoTask',addTodoTask);
app.get('/viewTodo',viewTodo);
app.get('/logout', getLogout);


module.exports = app;
