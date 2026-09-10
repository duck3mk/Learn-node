const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)

  const num = _.random(0,20)
  console.log(num)
  
  res.setHeader('Content-Type', 'text/html')

  let path = './html/';

  switch(req.url) {
    case '/':
      path += 'html.html';
      res.statusCode = 200;
      break;
    case '/test-u':
      path += 'test.html'
      res.statusCode = 200;
      break;
    default:
      path += '404.html'
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if(err) {
      console.log(err)
    } else {
      res.write(data)
      res.end();
    }
  })
})

server.listen(3000, 'localhost', () => {
  console.log('listening for req ib port 3000')
})