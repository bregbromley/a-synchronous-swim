const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQ = require('./messageQueue.js')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  var validResponse = ['up', 'down', 'left', 'right'];

  console.log('Serving request TYPE ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    res.writeHead(404, headers);
    console.log('IMAGE FILE: ', module.exports.backgroundImageFile);
    if (module.exports.backgroundImageFile) {
      if (module.exports.backgroundImageFile === 'background.jpg') {
        res.writeHead(200, headers);
        fs.readFile('./background.jpg', (err, data) => {
          if (err) throw err;
          res.end(data.toString());
        });
        //res.end(messageQ.dequeue());
      } else {
        res.end(messageQ.dequeue());
      }
    } else {
      console.log('ELSE RAN');
        res.writeHead(200, headers);
        res.end(messageQ.dequeue());
    }

  } else if (req.method === 'OPTIONS') {
    console.log('OPTIONS');
    res.writeHead(200, headers);
    res.end();
  }
  //res.end();
  next(); // invoke next() at the end of a request to help with testing!
};

//validResponse[Math.floor(Math.random() * 4)]