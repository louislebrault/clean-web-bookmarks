function validatePlug(plug) {
  if (plug.hasOwnProperty('createBookmark')) return true
  else throw 'ShapeError: plug object has no createBookmark property'
}

function validateRequest(request) {
    validateRequestShape(request)
    validateRequestParameters(request)

  function validateRequestShape(request){
    if (typeof(request) === "object"){
      if (Object.keys(request).length <= 2){
        return true
      } else throw 'ShapeError: request parameters are more than 2'
    } else throw 'TypeError: request is not an object'
  }

  function validateRequestParameters(request){
    for (let ii = 0; ii < Object.keys(request).length; ii++) {
      if (Object.keys(request)[ii] === 'url') {
        validateUrl(request.url)
      } else if (Object.keys(request)[ii] === 'title') {
        validateTitle(request.title)
      } else throw 'Request parameters are not valid'
    }
    return true
  }
}

function validateUrl(url){
  validateUrlShape(url)
  validateUrlPrefix(url.prefix)
  validateUrlPath(url.path)

  function validateUrlShape(url) {
      if (Object.keys(url).length === 2) {
        if (url.hasOwnProperty('path') && url.hasOwnProperty('prefix')) {
          return true
        } else throw 'ShapeError: wrong url object property'
      } else throw 'ShapeError: url object keys length != 2'
    }

  function validateUrlPrefix(prefix) {
    if (typeof prefix === 'string') {
      if (prefix.length <= 100) {
        return true
      } else throw 'ValueError: url prefix length over 100'
    } else throw 'TypeError: url prefix is not a string'
  }

  function validateUrlPath(path) {
    if (typeof path === 'string') {
      if (path.length < 3000) {
        return true
      } else throw 'ValueError: url path length over 2999'
    } else throw 'TypeError: url path is not a string'
  }
}

function validateTitle(title) {
  if (typeof title === 'string') {
    if (title.length <= 1024) {
      return true
    } else throw 'ValueError: title length over 1023'
  } else throw 'TypeError: title is not a string'
}

module.exports = {
  validatePlug,
  validateRequest
}
