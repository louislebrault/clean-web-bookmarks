const GOOGLE_FAVICON_SERVICE = "https://www.google.com/s2/favicons?domain_url="

class Bookmark {
  constructor(config) {
    this.url = {
        path: '',
        prefix: 'http://'
      },
    this.title = '',
    Object.assign(this, config)
    this.date = new Date(),
    this.favIcon = GOOGLE_FAVICON_SERVICE + this.url.path
  }
}

module.exports = Bookmark
