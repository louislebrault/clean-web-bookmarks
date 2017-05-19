const url = require('url')
const URL = require('url').URL
const http = require('http')
const https = require('https')

class Utility {
  constructor(){}

  static addHttp(string) {
    if (string.indexOf('http://') == -1 && string.indexOf('https://') == -1){
      string = 'http://' + string
    }
    return string
  }

  static isUrlValid(string) {
    let tUrl = url.parse(string)
    if (url.format(tUrl)) return true
    else return false
  }

  // Maybe this function could be at some other place. Can i put it as a static
  // function of Bookmark entity ?
  static requestTitle (bookmark) {
    return new Promise((s, f) => {
      try {
        let urlObject = new URL(bookmark.url)
        let adapter = null
        if (urlObject.protocol == 'http:') adapter = http
        else if (urlObject.protocol == 'https:') adapter = https

        adapter.get(urlObject.href, (res) => {
          res.setEncoding('utf8')
          const re = new RegExp("<title>(.*?)</title>", "i")

          res.on('data', (chunk) => {
            let str = chunk.toString()
            let match = re.exec(str)
            if (match && match[1]) {
              let urlTitle = match[1]
              bookmark.title = urlTitle
              s(urlTitle)
            }
          })
        }).on('error', (e) => {
          f(e)
        })

      } catch(e){
        f(e)
      }
    })
  }

}

module.exports = Utility
