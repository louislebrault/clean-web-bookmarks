const Bookmark = require('../entities/bookmark')

const validateRequest = require('../customs/CreateBookmarkCustoms')
  .validateRequest
  
const validatePlug = require('../customs/CreateBookmarkCustoms')
  .validatePlug


exports.createBookmark = function(request, plug) {
  validateRequest(request)
  validatePlug(plug)
  let bookmark = new Bookmark(request)
  return new Promise(async(s, f) => {
    try {
      let bookmarkId = await plug.createBookmark(bookmark)
      bookmark.id = bookmarkId
      s(bookmark)
    } catch(e) {
      f(e)
    }
  })
}
