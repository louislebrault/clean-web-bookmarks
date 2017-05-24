const fs = require('fs')

const createBookmark = require('../../core/Interactor/createBookmark').createBookmark
const loadBookmarks = require('../../core/Interactor/loadBookmarks').loadBookmarks

const self = module.exports = {
  loadBookmarksHttpAdapter: async function(req, res, plug){
    try {
      let bookmarks = await loadBookmarks(plug)
      if (bookmarks){
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(bookmarks))
        res.end()
      } else res.end()
    } catch (err) {
      console.log(err)
      res.write(err).end()
    }
  },

  createBookmarkHttpAdapter: async function(req, res, plug){
    try {
      let urlString = await extractPostData(req)
      let url = formatUrl(urlString)
      let title = await requestTitle(url)
      let bookmark = await createBookmark({url, title}, plug)
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.write(JSON.stringify(bookmark))
      res.end()
    } catch (err) {
      console.log(err)
    }
  },

  sendFileContent: function(res, fileName, contentType){
    fs.readFile(fileName, function(err, data){
      if(err){
        res.writeHead(404)
        res.write("Not Found!")
        res.end()
      }
      else {
        res.writeHead(200, {'Content-Type': contentType})
        res.write(data)
        res.end()
      }
    })
  },
}


function extractPostData(req) {
  let body = ''
  return new Promise(s => {
    req.on('data', function(chunk){
      body += chunk
    })
    req.on('end', () => {
      s(body)
    })
  })
}


function formatUrl(url){
  let prefix = null
  let prefixIndex = url.lastIndexOf('://')
  if (prefixIndex > -1) {
    prefix = url.slice(prefixIndex)
  } else prefix = 'http://'
  return {path: url, prefix}
}


const http = require('http')
const https = require('https')

function requestUrl(url){
  let adapter = null
  if (url.prefix == 'http://') adapter = http
  else if (url.prefix == 'https://') adapter = https
  return new Promise((s,f) => {
    adapter.get(url.prefix + url.path, res => {
      s(res)
    })
  })
}

function findTitleInResponse(res){
  const findTitleRegExp = "<title>(.*?)</title>"
  const findTitle = new RegExp( findTitleRegExp, "i")
  return new Promise ((s,f) => {
    try {
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        let str = chunk.toString()
        let match = findTitle.exec(str)
        if (match && match[1]) {
          let title = match[1]
          s(title)
        }
      })
    } catch(e) {
      f(e)
    }
  })
}

function requestTitle(url){
  return new Promise (async function(s,f){
    let res = await requestUrl(url)
    let title = await findTitleInResponse(res)
    s(title)
  })
}
