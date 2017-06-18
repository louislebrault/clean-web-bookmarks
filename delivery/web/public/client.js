let container = document.getElementById('container')
let addButton = document.getElementById('addButton')
let addInput = document.getElementById('addInput')
let searchButton = document.getElementById('searchButton')
let searchInput = document.getElementById('searchInput')
let resetButton = document.getElementById('resetButton')

// trying injection dependencies
// do injection depencies make sens in the context of a function that
// interact with the document ? Look hard to unit test
function fillContainer({
  page = 0,
  scrollHeight = document.body.scrollHeight,
  clientHeight = document.body.clientHeight,
  loadBookmarks = this.loadBookmarks
}) {
  isAllBookmarksLoaded = false
  loadBookmarks(page).then((bookmarks) => {
    if (scrollHeight >= clientHeight && bookmarks.length >= 30) {
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
  // if document is scrolled to the bottom of the page, minus a margin
  if (!isAllBookmarksLoaded) {
    if (document.body.clientHeight + window.scrollY >=
      document.body.scrollHeight - document.body.clientHeight / 4) {
      loadBookmarks(page)
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




let isAllBookmarksLoaded = false
let nextPage = null

fillContainer({})


document.onscroll = e => {
  getNextPage({
    page: nextPage
  })
}

addButton.onclick = e => {
  addBookmark(e)
}

searchButton.onclick = e => {
  searchBookmarks(0)
}

resetButton.onclick = e => {
  onResetButtonClick(e)
}
