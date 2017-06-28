let container = document.getElementById('container')
let addButton = document.getElementById('addButton')
let addInput = document.getElementById('addInput')
let searchButton = document.getElementById('searchButton')
let searchInput = document.getElementById('searchInput')
let resetButton = document.getElementById('resetButton')

function addBookmark(e) {
  let req = new XMLHttpRequest();
  req.onloadend = e => {
    let bookmark = JSON.parse(req.response)
    html = bookmarkToHTML(bookmark)
    prependHTML(html)
  }
  req.open('POST', 'http://localhost:8080/add', true);
  let data = JSON.stringify({
    url: addInput.value
  })
  req.send(data);

  function prependHTML(res) {
    container.innerHTML = res + container.innerHTML
    // bad practice to init all buttons here, need improvements
    initDeleteButtons()
  }
}

function loadBookmarks(page) {
  let req = new XMLHttpRequest()
  req.open('POST', 'http://localhost:8080/load', true);
  req.send(page);
  return new Promise((s, f) => {
    req.onloadend = e => {
      if (req.response) {
        appState.page = page
        bookmarks = JSON.parse(req.response)
        displayBookmarks(bookmarks)
        initDeleteButtons()
        appState.page = page
        s(bookmarks)
      }
      else {
        isAllBookmarksLoaded = true
        s()
      }
    }
  })
}

function searchBookmarks(page) {
  isAllBookmarksLoaded = false
  let req = new XMLHttpRequest();
  req.onloadend = e => {
    let bookmarks = JSON.parse(req.response)
    console.log(bookmarks)
    emptyContainer()
    displayBookmarks(bookmarks)
  }
  req.open('POST', 'http://localhost:8080/search', true);
  let data = JSON.stringify({page, searchString: searchInput.value})
  req.send(data);
}

function deleteBookmark(id) {
  document.getElementById(id).remove()
  let req = new XMLHttpRequest()
  req.onloadend = e => {
    console.log(id + ' deleted correctly')
  }
  req.open('POST', 'http://localhost:8080/delete', true)
  req.send(id);
}

function emptyContainer() {
  container.innerHTML = ''
}

function displayBookmarks(bookmarks) {
  for (let i = 0; i < bookmarks.length; i++) {
    appendHTML(bookmarkToHTML(bookmarks[i]))
  }

  function appendHTML(res) {
    container.innerHTML += res
    // bad practice to init all buttons here, need improvements
    initDeleteButtons()
  }
}

function bookmarkToHTML(bookmark) {
  let html = '<tr class="bookmark" id="' + bookmark.id + '">' +
    '<td class="favIcon"><img src="' + bookmark.favIcon + '"></td>' +
    '<td class="title">' + constrainTitleLength(bookmark.title) + '</td>' +
    '<td class="url"><a target="_blank" href="' + bookmark.url.prefix +
    bookmark.url.path + '">' + constrainUrlLength(bookmark.url) + '</a></td>' +
    '<td>' + formatDateString(bookmark.date) + '</td>' +
    '<td><button class="deleteButton">Delete</button></td>' +
    '</a></tr>'
  return html

  function constrainTitleLength(title) {
    let titleLength = title.length
    let maxLength = 60
    if (titleLength > maxLength) {
      let newTitle = title.slice(0, maxLength) + '...'
      return newTitle
    } else return title
  }

  function constrainUrlLength(url) {
    let stringUrl = url.prefix + url.path
    let urlLength = stringUrl.length
    let maxLength = 30
    if (urlLength > maxLength) {
      let urlChunks = []
      urlChunks.push(stringUrl.substring(0, maxLength / 2))
      urlChunks.push(stringUrl.substring(urlLength - maxLength / 2))
      let newStringUrl = urlChunks[0] + '...' + urlChunks[1]
      return newStringUrl
    } else {
      return stringUrl
    }
  }

  function formatDateString(date) {
    let DateObject = new Date(date)
    let day = addZeroUnderTen(DateObject.getDay())
    let month = addZeroUnderTen(DateObject.getMonth())
    let year = addZeroUnderTen(DateObject.getFullYear())
    let hours = addZeroUnderTen(DateObject.getHours())
    let minutes = addZeroUnderTen(DateObject.getMinutes())
    let newDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes
  
    return newDate

    function addZeroUnderTen(value) {
      if (value < 10) return '0' + value
      else return value
    }
  }
}

let appState = {
  page: null,
  isSearch: false,
  searchString: '',
  sortByDate: -1,
  sortByTitle: false,
  sortByUrl: false,
  isAllPagesLoaded: false
}

// trying injection dependencies
// do injection depencies make sens in the context of a function that
// interact with the document ? Look hard to unit test
function fillContainer({
  page = 0,
  scrollHeight = document.body.scrollHeight,
  clientHeight = document.body.clientHeight,
  loadBookmarks = this.loadBookmarks
}) {
  loadBookmarks(page).then((bookmarks) => {
    if (scrollHeight <= clientHeight && bookmarks.length >= 30) {
      fillContainer({
        page: page + 1
      })
    }
  })
}


function getNextPage({
  page,
  loadBookmarks = this.loadBookmarks
}) {
  if (!appState.isAllPagesLoaded) {
    // if document is scrolled to the bottom of the page, minus a margin
    if (document.body.clientHeight + window.scrollY >=
      document.body.scrollHeight - document.body.clientHeight / 4) {
        loadBookmarks(page).then(bookmarks => {
          if (bookmarks.length < 30) {
            appState.isAllPagesLoaded = true
          }
        })
      }
  }
}

function initDeleteButtons() {
  let deleteButtons = document.getElementsByClassName('deleteButton')
  for (let i = 0; i < deleteButtons.length; i++) {
    let id = findContainerId(deleteButtons[i], 'bookmark')
    deleteButtons[i].onclick = e => {
      deleteBookmark(id)
    }
  }

  function findContainerId(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el.id
  }
}

function reset() {
  emptyContainer()
  appState = {
    page: null,
    isSearch: false,
    searchString: '',
    sortByDate: -1,
    sortByTitle: false,
    sortByUrl: false,
    isAllPagesLoaded: false
  }
  fillContainer({})
}



fillContainer({})


document.onscroll = e => {
  getNextPage({
    page: appState.page + 1
  })
}

addButton.onclick = e => {
  addBookmark(e)
}

searchButton.onclick = e => {
  searchBookmarks(0)
}

resetButton.onclick = e => {
  reset(e)
}
