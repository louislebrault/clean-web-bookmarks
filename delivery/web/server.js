const createBookmarkHttpAdapter = require('./HTTPAdapter').createBookmarkHttpAdapter
const loadBookmarksHttpAdapter = require('./HTTPAdapter').loadBookmarksHttpAdapter
const deleteBookmarkHttpAdapter = require('./HTTPAdapter').deleteBookmarkHttpAdapter
const sendFileContent = require('./HTTPAdapter').sendFileContent

const mongoPlug = require('../../external/mongo_plug')

const http = require('http')
const app = http.createServer()

app.listen(8080)

mongoPlug.connectDB()

app.on('request', async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")

  if (req.method == "POST") {
    if (req.url == "/add") {

    }
  }
  switch(req.url){
    case '/add':
        createBookmarkHttpAdapter(req, res, mongoPlug)
      break
    case '/delete':
        deleteBookmarkHttpAdapter(req, res, mongoPlug)
      break
  }

  if (req.method == "GET") {
    switch (req.url) {
      case '/load':
          loadBookmarksHttpAdapter(req, res, mongoPlug)
        break
      case '/':
        sendFileContent(res, './public/index.html', 'text/html')
        break
      case '/style.css':
        sendFileContent(res, './public/style.css', 'text/css')
        break
      case '/client.js':
        sendFileContent(res, './public/client.js', 'application/javascript')
        break
      default:
        res.end()
    }
  }
})
