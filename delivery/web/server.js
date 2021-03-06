const createBookmarkHttpAdapter = require('./HTTPAdapter').createBookmarkHttpAdapter
const loadBookmarksHttpAdapter = require('./HTTPAdapter').loadBookmarksHttpAdapter
const deleteBookmarkHttpAdapter = require('./HTTPAdapter').deleteBookmarkHttpAdapter
const findBookmarksHttpAdapter = require('./HTTPAdapter').findBookmarksHttpAdapter
const sendFileContent = require('./HTTPAdapter').sendFileContent

const mongoPlug = require('../../external/mongo_plug')

const http = require('http')
const app = http.createServer()

app.listen(8080)

mongoPlug.connectDB()

app.on('request', async(req, res) => {
  // dev only -- control access has to be changed on production
  res.setHeader("Access-Control-Allow-Origin", "*")

  if (req.method == "POST") {
    switch(req.url){
      case '/load':
        loadBookmarksHttpAdapter(req, res, mongoPlug)
        break
      case '/add':
        createBookmarkHttpAdapter(req, res, mongoPlug)
        break
      case '/delete':
        deleteBookmarkHttpAdapter(req, res, mongoPlug)
        break
      case '/search':
        findBookmarksHttpAdapter(req, res, mongoPlug)
        break
    }
  }

  if (req.method == "GET") {
    switch (req.url) {
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
