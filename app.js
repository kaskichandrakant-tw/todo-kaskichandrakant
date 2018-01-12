let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const appUtility = require('./appUtility.js');
let logRequest=appUtility.logRequest;
let getHeader=appUtility.getHeader;
let isFile=appUtility.isFile;
const dataBase = require('./data/dataBase.json');
let validUsers=[{name:'***REMOVED***',place:'karad'},{name:'vivek',place:'karad'}];

let serveStaticFile = function(req, res) {
  let path = req.url;
  if (path == '/') {
    res.redirect('/login.html');
  }
  let filePath='./public'+path;
  if (fs.existsSync(filePath)&&isFile(filePath)) {
    let data = fs.readFileSync('./public' + path);
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

let redirectToHome=function(req,res){
  res.redirect('/home.html')
}

let app = WebApp.create();
app.use(logRequest);
app.use(serveFile);
app.post('/login',redirectToHome)



module.exports=app;
