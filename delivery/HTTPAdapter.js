const fs = require('fs')

module.exports = {
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
        sendFileContent(res, './public/index.html', 'text/html')
      },
    }
  },

  // submitBookmarkHttpAdapter: () => {
  //   const url = ''
  //   const bookmark = ''
  //
  //   return {
  //     url:'',
  //     bookmark: '',
  //     isUrlValid: 0,
  //     addBookmark: 0,
  //     requestTitle: 0,
  //     respondSuccess: 0,
  //     respondFailure: 0
  //   }
  // }

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
