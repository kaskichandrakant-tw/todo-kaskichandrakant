const timeStamp = require('./time.js').timeStamp;
let fs = require('fs');
let toS = o => JSON.stringify(o, null, 2);
let logRequest = (req, res) => {
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`, ''
  ].join('\n');
  fs.appendFile('request.log', text, () => {});

  console.log(`${req.method} ${req.url}`);
}

let getHeader = function(fileName) {
  let ext = fileName.slice(fileName.lastIndexOf('.') + 1)
  let extObj = {
    'css': 'text/css',
    'jpg': 'img/jpg',
    'gif': 'img/gif',
    'pdf': 'text/pdf',
    'js': 'text/javascript',
    'html': 'text/html'
  }
  return extObj[ext]
}

let isFile=function(filePath){
  return fs.statSync(filePath).isFile()
}

let getFileData=function(filePath){
  return fs.readFileSync(filePath,'utf8');
}

exports.isFile=isFile;
exports.getFileData=getFileData;
exports.getHeader=getHeader;
exports.logRequest=logRequest;
