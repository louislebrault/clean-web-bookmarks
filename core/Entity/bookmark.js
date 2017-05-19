const URL = require('url').URL
const http = require('http')
const https = require('https')

class Bookmark {
  constructor(url, title, comment, tags){
    this.url = url ? url : 'www.lemonde.fr'
    this.title = title ? title : 'Titre'
    this.comment = comment ? comment : 'comment'
    this.tags = tags ? tags : []
    this.date = new Date()
    this.favIcon = "https://www.google.com/s2/favicons?domain_url=" + this.url
  }

  toHTML () {
    let html = '<tr>' +
    '<td><img src="' + this.favIcon + '"></td>' +
      '<td>' + this.url + '</td>' +
      '<td>' + this.title + '</td>' +
      '<td>' + this.comment + '</td>' +
      '<td>' + this.tags + '</td>' +
      '<td>' + this.date.toString() + '</td>' +
    '</tr>'
    return html
  }
}

module.exports = Bookmark
