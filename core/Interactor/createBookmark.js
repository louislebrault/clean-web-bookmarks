const Bookmark = require('../Entity/Bookmark')

  exports.createBookmark = async (request, plug) => {
    console.log(request)
    if (validate(request)) {
      let bookmark = new Bookmark(request)
      plug.createBookmark(bookmark)
      return bookmark
    } else {
      return {
        error: 'Validation error'
      }
    }

  }


// faudrait regarder sur le framework obvious comment sont fait les tests de
// validation, j'aime pas ces imbrications de if.
// faut que le taf soit fait sur le prefix aussi
const validate = request => {
  if (request.url) {
    if (request.url.path && request.url.prefix){
      if (typeof request.url.path === "string" && request.url.path.length <= 300) {
        return true
      }
    }
  }
  return false
}
