const GOOGLE_FAVICON_SERVICE = "https://www.google.com/s2/favicons?domain_url="

class Bookmark {
  constructor(config){
    this.url = 'http://www.lequipe.fr',
    this.title = 'Title',
    this.date = new Date(),
    // Have to check and format url before save favIcon, because if there is a
    // prefix it wont work
    // favIcon: GOOGLE_FAVICON_SERVICE + config.url
    this.favIcon = '',
    Object.assign(this, config)
  }

  toHTML () {
    let html = '<tr>' +
    '<td><img src="' + this.favIcon + '"></td>' +
      '<td>' + this.url + '</td>' +
      '<td>' + this.title + '</td>' +
      '<td>' + this.date.toString() + '</td>' +
    '</tr>'
    return html
  }

}

module.exports = Bookmark
