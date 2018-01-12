let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const appUtility = require('./appUtility.js');
let logRequest = appUtility.logRequest;
let getHeader = appUtility.getHeader;
let isFile = appUtility.isFile;
let getFileData = appUtility.getFileData;
const dataBase = require('./data/dataBase.json');

let validUsers = [{
  name: '***REMOVED***',
  place: 'karad'
}, {
  name: 'vivek',
  place: 'karad'
}];
let userN;


let serveStaticFile = function(req, res) {
  let path = req.url;
  if (path == '/') {
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
  if (req.method == "GET" && !req.url.startsWith('/Gu')) {
    serveStaticFile(req, res);
  }
}

let postLogin = (req, res) => {
  let user = validUsers.find(u => u.name == req.body.userName);
  userN = req.body.userName;
  if (!user) {
    res.setHeader('Set-Cookie', `logInFailed=true`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
};

let addLinksAsHtml=function(data){
  let allLink=''
  data.forEach((ele)=>{
    if(ele[userN]){
      allLink+=`<a href=editTodo>${Object.keys(ele[userN])[0]}</a><br>`
    }
  })
  return allLink;
}

let getHomeForValidUser = function(req, res) {
  let homeData = getFileData('./public/home.html')
  let addedLinkData=homeData.replace(/TODOLIST/,addLinksAsHtml(dataBase))
  res.write(addedLinkData.replace(/USER/, `Hello ${userN}`))
  res.end();
}

let addTodo = function(req, res) {
  let data = {};
  let title = req.body.title;
  let description = req.body.description;
  data[userN]={}
  data[userN][title]={}
  data[userN][title].description=description;
  data[userN][title].item=[];
  dataBase.push(data);
  fs.writeFileSync('./data/dataBase.json', JSON.stringify(dataBase));
  res.redirect('/home')
  res.end();
}


let app = WebApp.create();
app.use(logRequest);
app.use(serveFile);
app.post('/login', postLogin);
app.get('/home', getHomeForValidUser);
app.post('/addTodo', addTodo)



module.exports = app;
