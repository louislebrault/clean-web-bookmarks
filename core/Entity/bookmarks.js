class Bookmarks extends Array {
  constructor(){
    super()
  }

  getHTML() {
    var rows = '<table>'
  	for(let ii = 0; ii < this.length; ii++){
  		rows += this[ii].getHTML()
  	}
    rows += '</table>'
  	return rows
  }

  sortByDate() {
    this.sort((a, b) => {
      return a.date.getTime() - b.date.getTime()
    })
  }

  sortByDomain() {
    this.sort((a, b) => {
      if(a.title < b.title) return -1
      if(a.title > b.title) return 1
      return 0
    })
  }
}

module.exports = Bookmarks
