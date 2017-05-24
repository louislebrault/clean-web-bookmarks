const A = require('./HTTPAdapter')
const mongoPlug = require('../../external/mongo_plug')

const http = require('http')


const app = http.createServer()
app.listen(8080)

mongoPlug.connectDB()

app.on('request', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")

  if (req.method == "POST"){
    if(req.url == "/add"){
      try {
        A.createBookmarkHttpAdapter(req, res, mongoPlug)
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (req.method == "GET"){
    switch(req.url) {
      case '/load':
        try {
          A.loadBookmarksHttpAdapter(req, res, mongoPlug)
          break
        } catch (err) {
          console.log(err)
        }
      case '/':
        A.sendFileContent(res, './public/index.html', 'text/html')
        break
      case '/style.css':
        A.sendFileContent(res, './public/style.css', 'text/css')
        break
      case '/client.js':
        A.sendFileContent(res, './public/client.js', 'application/javascript')
        break
      default:
        res.end()
    }
  }
})
