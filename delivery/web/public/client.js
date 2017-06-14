let container = document.getElementById('container')
let addButton = document.getElementById('addButton')
let addInput = document.getElementById('addInput')
let searchButton = document.getElementById('searchButton')
let searchInput = document.getElementById('searchInput')
let resetButton = document.getElementById('resetButton')

function onAddButtonClick(e) {
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
}

function onSearchButtonClick(e) {
  let req = new XMLHttpRequest();
  req.onloadend = e => {
    let bookmarks = JSON.parse(req.response)
    console.log(bookmarks)
    emptyContainer()
    displayBookmarks(bookmarks)
  }
  req.open('POST', 'http://localhost:8080/search', true);
  req.send(searchInput.value);
}

function onResetButtonClick(e) {
  emptyContainer()
  loadBookmarks()
}

function loadBookmarks(page) {
  let req = new XMLHttpRequest()
  req.open('POST', 'http://localhost:8080/load', true);
  req.send(page);
  return new Promise((s,f) => {
    req.onloadend = e => {
      bookmarks = JSON.parse(req.response)
      displayBookmarks(bookmarks)
      initDeleteButtons()
      s(bookmarks)
    }
  })
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

function constrainTitleLength(title) {
  let titleLength = title.length
  let maxLength = 60
  if (titleLength > maxLength) {
    let newTitle = title.slice(0, maxLength) + '...'
    return newTitle
  } else return title
}

function prependHTML(res) {
  container.innerHTML = res + container.innerHTML
  // bad practice to init all buttons here, need improvements
  initDeleteButtons()
}

function appendHTML(res) {
  container.innerHTML += res
  // bad practice to init all buttons here, need improvements
  initDeleteButtons()
}

function findContainerId(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el.id
}

function addZeroUnderTen(value) {
  if (value < 10) return '0' + value
  else return value
}

function initDeleteButtons() {
  let deleteButtons = document.getElementsByClassName('deleteButton')
  for (let i = 0; i < deleteButtons.length; i++) {
    let id = findContainerId(deleteButtons[i], 'bookmark')
    deleteButtons[i].onclick = e => {
      deleteBookmark(id)
    }
  }
}

function fillContainer(page){
  let scrollHeight = document.body.scrollHeight
  let clientHeight = document.body.clientHeight
  // got an error using let instead of var here
  var page = page || 0
  loadBookmarks(page).then((bookmarks) => {
    if (scrollHeight >= clientHeight && bookmarks.length >= 30) {
      fillContainer(page + 1)
    }
  })
}

// trying injection dependencies
function fillContainer2({
  page = 0,
  scrollHeight = document.body.scrollHeight,
  clientHeight = document.body.clientHeight,
  loadBookmarks = this.loadBookmarks
}){
  loadBookmarks(page).then((bookmarks) => {
    if (scrollHeight >= clientHeight && bookmarks.length >= 30) {
      fillContainer2({
        page: page + 1
      })
    }
  })
}

fillContainer2({})

addButton.onclick = e => {
  onAddButtonClick(e)
}

searchButton.onclick = e => {
  onSearchButtonClick(e)
}

resetButton.onclick = e => {
  onResetButtonClick(e)
}

module.exports = {
  fillContainer2
}
