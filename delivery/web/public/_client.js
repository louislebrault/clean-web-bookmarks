function loadBookmarksPage(options, url, page){
  let req = new XMLHTTPRequest()
  req.open('POST', url, true)
  let postData = {
    page: page
  }
  if (options) Object.assign(postData, options)
  postData = JSON.stringify(postData)
  req.send(postData)
  return new Promise ((s, f) => {
    req.onloadend = e => {
      if (req.status === 200) {
        s(req.response ? JSON.parse(req.response) : null)
      } else {
        f(req.status)
      }
    }
  })
}

async function fillContainer({
  page = 0,
  scrollHeight = document.body.scrollHeight,
  clientHeight = document.body.clientHeight,
  loadBookmarksPage = this.loadBookmarksPage.bind({}, 'http://localhost:8080/load')
}) {
  while (scrollHeight >= clientHeight) {
    let bookmarks = await loadBookmarksPage(page)
    displayBookmarks(bookmarks)
    page++
    if (bookmarks.length < 30) return
  }
}

fillContainer({
  loadBookmarks: this.loadBookmarksPage.bind({
    searchString: 'test'
  }, 'http://localhost:8080/search')
})

function onContainerScroll({
  page,
  loadBookmarksPage = this.loadBookmarks.bind({}, 'http://localhost:8080/load')
}) {
  if (!isAllBookmarksLoaded) {
    if (document.body.clientHeight + window.scrollY >=
      document.body.scrollHeight - document.body.clientHeight / 4) {
      loadBookmarksPage(page)
    }
  }
}

function displayBookmarks(bookmarks) {
  for (let i = 0; i < bookmarks.length; i++) {
    appendHTML(bookmarkToHTML(bookmarks[i]))
  }
  initDeleteButtons()
}

// Si on fait comme ça ça veut dire qu'a chaque fois qu'on fait une
// recherche par exemple, va falloir réassigner les parametres de onContainerScroll.

// On a besoin qu'onContainerScroll trouve dans son contexte les paramètres de la
// requete qu'il doit faire

let appState = {
  lastPage: null,
  isSearch: false,
  sortByDate: -1,
  sortByTitle: false,
  sortByUrl: false
}

// A chaque fois qu'une fonction comme onContainerScroll doit lancer une requete,
// elle regarde le contexte et en déduie les paramètres de sa requete

function getLoadRequestOptions(){
  let options = {
    page = appState.lastPage
  }
  if (appState.isSearch) {
    options.seartchString = searchInput.value
  }
  if (appState.sortByDate && appState.sortByDate != -1) {
    options.sortByDate = appState.sortByDate
  }
  if (appState.sortByTitle) {
    options.sortByTitle = appState.sortByTitle
  }
  if (appState.sortByUrl) {
    options.sortByUrl = appState.sortByUrl
  }
  return options
}
