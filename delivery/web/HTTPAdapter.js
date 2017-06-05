const fs = require('fs')

const createBookmark = require('../../core/interactors/createBookmark')
  .createBookmark
const loadBookmarks = require('../../core/interactors/loadBookmarks')
  .loadBookmarks
const deleteBookmark = require('../../core/interactors/deleteBookmark')
  .deleteBookmark
const findBookmarks = require('../../core/interactors/findBookmarks')
  .findBookmarks

const createBookmarkCustoms = require('./HTTPAdapterCustoms')
  .createBookmarkHttpAdapterCustoms


const self = module.exports = {
  loadBookmarksHttpAdapter: async function(req, res, plug) {
    try {
      let page = await extractPostData(req)
      let bookmarks = await loadBookmarks(page, plug)
      if (bookmarks) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.write(JSON.stringify(bookmarks))
      }
    } catch (err) {
      sendError(res, err)
    } finally {
      res.end()
    }
  },

  createBookmarkHttpAdapter: async function(req, res, plug) {
      try {
        let postData = await extractPostData(req)
        postData = createBookmarkCustoms('incoming', postData)
        console.log(postData)
        let url = formatUrl(postData.url)
        let title = postData.title ? postData.title : await requestTitle(url)
        let bookmark = await createBookmark({
          url,
          title
        }, plug)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.write(JSON.stringify(bookmark))
      } catch (err) {
        sendError(res, err)
      } finally {
        res.end()
      }
  },

  deleteBookmarkHttpAdapter: async function(req, res, plug) {
      try {
        let id = await extractPostData(req)

        deleteBookmark(id, plug)
        res.writeHead(200)
      } catch (err) {
        sendError(res, err)
      } finally {
        res.end()
      }
  },

  findBookmarksHttpAdapter: async function(req, res, plug) {
      try {
        let searchString = await extractPostData(req)

        let results = await findBookmarks(searchString, plug)
        if (results) {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          })
          res.write(JSON.stringify(results))
        }
      } catch(e) {
        sendError(res, err)
      } finally {
        res.end()
      }
  },

  sendFileContent: function(res, fileName, contentType) {
    fs.readFile(fileName, function(err, data) {
      if (err) {
        res.writeHead(404)
        res.write("Not Found!")
        res.end()
      } else {
        res.writeHead(200, {
          'Content-Type': contentType
        })
        res.write(data)
        res.end()
      }
    })
  },
}

function sendError(res, err){
  console.log(err)
  res.writeHead(500)
  res.write(err)
}

function extractPostData(req) {
  let body = ''
  return new Promise(s => {
    req.on('data', function(chunk) {
      body += chunk
    })
    req.on('end', () => {
      s(body)
    })
  })
}


function formatUrl(url) {
  let prefix = null
  let path = null
  let divider = '://'
  let prefixIndex = url.indexOf(divider)
  if (prefixIndex > -1) {
    prefixIndex += divider.length
    prefix = url.slice(0, prefixIndex)
    path = url.slice(prefixIndex)
  } else {
    prefix = 'http://'
    path = url
  }
  return {
    path,
    prefix
  }
}

function requestTitle(url) {
  return new Promise(async function(s, f) {
    try {
      let res = await requestUrl(url)
      let title = await findTitleInResponse(res)
      s(title)
    } catch (e) {
      // We failed to request Url but we want to continue to create bookmarks
      // so we send a success
      s('')
    }
  })
}

const http = require('http')
const https = require('https')

function requestUrl(url) {
  let adapter = null
  if (url.prefix == 'http://') adapter = http
  else if (url.prefix == 'https://') adapter = https
  return new Promise((s, f) => {
    adapter.get(url.prefix + url.path, res => {
      s(res)
    }).on('error', e => f(e))
  })
}

function findTitleInResponse(res) {
  const findTitleRegExp = "<title>(.*?)</title>"
  const findTitle = new RegExp(findTitleRegExp, "i")
  return new Promise((s, f) => {
    setTimeout(() => {
      f('Didnt find title in time')
    }, 3000)
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      let str = chunk.toString()
      let match = findTitle.exec(str)
      if (match && match[1]) {
        let title = match[1]
        s(title)
      }
    }).on('error', e => f(e))
  })
}
