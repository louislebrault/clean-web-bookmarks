const fs = require('fs')

const Bookmark = require('../core/Entity/Bookmark')
const Bookmarks = require('../core/Entity/Bookmarks')
const Utility = require('../core/Entity/Utility')
const u = new Utility()

const self = module.exports = {
  accessAppHttpAdapter: (res, currentUser) => {

    return {
      user: currentUser,
      userHasBookmarks: (user) => {
        if (user.bookmarks) return true
        else return false
      },
      respondUserBookmarks: () => {
        data = loadBookmarks(user.bookmarks).then( data => {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write(data)
          res.end()
        }).catch( e => {
          console.log(e)
        })
      },
      respondWelcome: () => {
        self.sendFileContent(res, './public/index.html', 'text/html')
      },
    }
  },

  submitBookmarkHttpAdapter: async (req, res, user) => {
    let url = await extractPostData(req)
    console.log(url)
    url = u.addHttp(url)
    console.log(url)
    const bookmark = new Bookmark({url: url})

    return {
      url: url,
      bookmark: bookmark,
      isUrlValid: u.isUrlValid,
      addBookmark: () => {
        if (user.bookmarks) user.bookmarks.push(bookmark)
        else user.bookmarks = new Bookmarks([bookmark])
      },
      requestTitle: u.requestTitle,
      respondSuccess: () => {
        res.writeHead(200)
        res.write(bookmark.toHTML())
        res.end()
      },
      respondFailure: () => {
        console.log('respondFailure')
        res.end()
      }
    }
  },

  sendFileContent: (res, fileName, contentType) => {
    fs.readFile(fileName, function(err, data){
      if(err){
        res.writeHead(404)
        res.write("Not Found!")
      }
      else{
        res.writeHead(200, {'Content-Type': contentType})
        res.write(data)
      }
      res.end()
    })
  }

}

function loadBookmarks (bookmarks) {
  return new Promise((s, f) => {
      fs.readFile('./public/index.html', {encoding: 'utf8'}, function(err, data){
        if(err){
          f(err)
        }
        else{
          let idx = data.indexOf('id="container">') + 15
          console.log(2,bookmarks)
          let html = bookmarks.getHTML()
          newData = data.slice(0, idx) + html + data.slice(idx)
          s(newData)
        }
      })
  })
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
