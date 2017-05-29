self = module.exports = {
  // On devrait peut etre être moins strict sur les verifs. Le titre est pas
  // indispensable, si on le trouve pas on peut quand meme accepter l'ajout.
  // De plus, est ce qu'on devrait pas verifier tous les paramètres de l'objet,
  // meme ceux qui ne sont pas lié à un input comme la Date ?
  // Parce que la date on appelle simplement un new Date(), ça peut pas foirer
  validateUrl: function(url) {
    self.validateUrlShape(url)
    self.validateUrlPath(url.path)
    self.validateUrlPrefix(url.prefix)
    return true
  },

  validateUrlShape: function(url) {
    if (Object.keys(url).length === 2) {
      if (url.hasOwnProperty('path') && url.hasOwnProperty('prefix')) {
        return true
      } else throw 'ShapeError: wrong url object property'
    } else throw 'ShapeError: url object keys length != 2'
  },

  validateUrlPath: function(path) {
    if (typeof path === 'string') {
      if (path.length <= 300) {
        return true
      } else throw 'ValueError: url path length over 300'
    } else throw 'TypeError: url path is not a string'
  },

  validateUrlPrefix: function(prefix) {
    if (typeof prefix === 'string') {
      if (prefix.length <= 30) {
        return true
      } else throw 'ValueError: url prefix length over 30'
    } else throw 'TypeError: url prefix is not a string'
  },

  validateTitle: function(title) {
    if (typeof title === 'string') {
      if (title.length <= 150) {
        return true
      } else throw 'ValueError: title length over 150'
    } else throw 'TypeError: title is not a string'
  }
}
