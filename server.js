let fs = require('fs');
const http = require('http');
const app = require('./app.js');
const WebApp = require('./webapp');

const PORT = 5000;
let server = http.createServer(app);
server.on('error', e => console.error('**error**', e.message));
server.listen(PORT, (e) => console.log(`server listening at ${PORT}`));
