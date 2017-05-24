const Bookmark = require('../Entity/Bookmark')
const validateUrl = require('../Customs/bookmarkCustoms').validateUrl
const validateTitle = require('../Customs/bookmarkCustoms').validateTitle

exports.createBookmark = async function (request, plug) {
    validateRequest(request)
    validatePlug(plug)
    let bookmark = new Bookmark(request)
    plug.createBookmark(bookmark)
    return bookmark
}

function validateRequest(request){
  validateRequestShape(request)
  validateUrl(request.url)
  validateTitle(request.title)
}

function validateRequestShape(request){
  if (Object.keys(request).length === 2){
    if (request.hasOwnProperty('url') && request.hasOwnProperty('title')){
      return true
    } else throw 'ShapeError: wrong request object property'
  } else throw 'ShapeError: request object keys length != 2'
}

function validatePlug(plug){
  if (plug.hasOwnProperty('createBookmark')) return true
  else throw 'ShapeError: plug object has no createBookmark property'
}
