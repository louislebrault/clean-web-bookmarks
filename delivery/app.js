const http = require('http')

const I = require('../core/Interactor/Interactor')
const A = require('./HTTPAdapter')

const app = http.createServer()
app.listen(8080)

const user = {}

app.on('request', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")

  if (req.method == "POST"){
    if(req.url == "/add"){

    }
  }

  if (req.method == "GET"){
    switch(req.url) {
      case '/':
        const adapted = await A.accessAppHttpAdapter(res, user)
        await I.accessApp(adapted)
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
