function createBookmarkHttpAdapterCustoms(action, data){
  switch(action){
    case 'incoming':
      data = JSON.parse(data)
      validateIncomingData(data)
      return data
      break

    case 'outgoing':
      break
  }

  function validateIncomingData(data){
    console.log(data)
    if(typeof data === "object"){
      if(data.hasOwnProperty('url')){
        validateIncomingDataUrl(data)
        if(Object.keys(data).length <= 2) {
          if(Object.keys(data).length === 2){
            if(data.hasOwnProperty('title')){
              validateIncomingDataTitle(data)
              return true
            } else throw 'ShapeError : data has no title property'
          } else return true
        } else throw 'ShapeError : data has more than 2 properties'
      } else throw 'ShapeError : data has no url property'
    } else throw 'TypeError : data is not an object'
  }

  function validateIncomingDataUrl(data) {
    if(typeof data.url === "string") {
      if(data.url.length < 3000) {
        return true
      } else throw 'ValueError : data.url length over 2999'
    } else throw 'TypeError : data.url is not a string'
  }

  function validateIncomingDataTitle(data){
    if(typeof data.title === "string") {
      if(data.title.length < 1024) {
        return true
      } else throw 'ValueError : data.title length over 1023'
    } else throw 'TypeError : data.title is not a string'
  }
}

function deteBookmarkHttpAdapterCustoms(action, data){
  switch(action){
    case 'incoming':
    // Find a way to detect if the string from post request is a regular string
    // or a json stringified
      break

    case 'outgoing':
      break
  }
}

function findBookmarksHttpAdapterCustoms(action, data){
  switch(action){
    case 'incoming':
      break

    case 'outgoing':
      break
  }
}

module.exports = {
  createBookmarkHttpAdapterCustoms,
  deteBookmarkHttpAdapterCustoms,
  findBookmarksHttpAdapterCustoms
}
