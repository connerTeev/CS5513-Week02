//CS55.13 Week02

//load core node http module
const http = require('http');

//load core node filesystem (fs) module, using JS promises instead of callbacks
//a promise represents eventual completion of asynch operation and its result
const fs = require('fs').promises;

//create a function to respond to http requests
const requestListener = function(req, res) {
  //output request url
  console.log(req.url);

  if (req.url === '/') {
  //check request url, if root, return html file
    //special variable __dirname has absolute path of where node code is running
    fs.readFile(__dirname + '/practice.html')
      .then(
        contents => {
        //sets http response header entry
        res.setHeader('Content-Type', 'text/html; charset=UTF-8')
        //returns 200 OK http status code
        res.writeHead(200);
        //send back file contenst + close response
        res.end(contents);
      }
    )
  } else {
  // if request url not root, return json file
    fs.readFile(__dirname + '/objects.json')
      .then(
        contents => {
          //set http response header entry
          res.setHeader('Content-Type', 'application/json; charset=UTF-8');
          //return Ok status code
          res.writeHead(200);
          //send back file contents & close
          res.end(contents)
        }
      )
  }
}

//create an http server instance
const server = http.createServer(requestListener);

//define the TCP port and IP address to tell our http server to listen to 
const host = '0.0.0.0';
const port = '8080';

//call the listen() method to start listening to http requests
server.listen(
  port,
  host,
  () => {
    console.log('Server is running...')
  }
);