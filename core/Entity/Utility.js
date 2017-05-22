// Improvements
// - Dependencies should be injected
// - requestTitle should be split into multiples functions
// - addHttp dont support other prefix that http and https, wich is bad,
// we could inject prefix list that has to be checked

const url = require('url')
const URL = require('url').URL
const http = require('http')
const https = require('https')

class Utility {
  constructor(){
  }

  addHttp(string) {
    if (string.indexOf('http://') == -1 && string.indexOf('https://') == -1){
      string = 'http://' + string
    }
    return string
  }

  requestTitle (bookmark) {
    return new Promise((s, f) => {
      try {
        console.log(bookmark.url)
        let urlObject = new URL(bookmark.url)
        let adapter = null
        if (urlObject.protocol == 'http:') adapter = http
        else if (urlObject.protocol == 'https:') adapter = https

        adapter.get(urlObject.href, (res) => {
          res.setEncoding('utf8')
          const findTitleRegExp = "<title>(.*?)</title>"
          const findTitle = new RegExp( findTitleRegExp, "i")

          res.on('data', (chunk) => {
            let str = chunk.toString()
            let match = findTitle.exec(str)
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

// // What is Utility's methods become uses cases
//
// // addHttp become formatUrl
// formatUrl: async function({
//   url,
//   defaultPrefix,
//   isPrefixMissing,
//   addDefaultPrefix,
//   respondFormatedUrl,
//   respondUnchangedUrl
// }){
//   if (isPrefixMissing(url)){
//     await addDefaultPrefix(url, defaultPrefix)
//     await respondFormatedUrl()
//   } else {
//     await respondUnchangedUrl()
//   }
// }
//
// requestTitle: async function({
//   url,
//   response,
//   title,
//   requestUrl,
//   isRequestResponsed,
//   findTitleInResponse,
//   isTitleFound,
//   respondTitle,
//   respondTitleNotFound,
//   respondRequestNotResponsed
// }){
//   await requestUrl(url)
//   if (isRequestResponsed()){
//     await findTitleInResponse(response)
//     if (isTitleFound(title)){
//       respondTitle()
//     } else {
//       respondTitleNotFound()
//     }
//   } else {
//     respondRequestNoResponse()
//   }
// }
