const GOOGLE_FAVICON_SERVICE = "https://www.google.com/s2/favicons?domain_url="

class Bookmark {
  constructor(config) {
    this.url = {
        path: 'www.lequipe.fr',
        prefix: 'http://'
      },
      this.title = '',
      this.date = new Date(),
      Object.assign(this, config)
    this.favIcon = GOOGLE_FAVICON_SERVICE + this.url.path
  }
}

module.exports = Bookmark
