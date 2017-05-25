let addButton = document.getElementById('addButton')
let addInput = document.getElementById('addInput')
let container = document.getElementById('container')

let bookmarks = []
loadBookmarks()

addButton.onclick = e => {
  let req = new XMLHttpRequest();
  req.onloadend = e => {
    let bookmark = JSON.parse(req.response)
    bookmarks.push(bookmark)
    html = bookmarkToHTML(bookmark)
    prependHTML(html)
  }
  req.open('POST', 'http://localhost:8080/add', true);
  let val = addInput.value
  req.send(val);
}

function prependHTML(res){
  container.innerHTML = res + container.innerHTML
  // pas terrible de reinit tous les boutons a chaque fois qu'on ajoute un bookmark
  initDeleteButtons()
}

function bookmarkToHTML(bookmark){
  let html = '<tr class="bookmark" id="' + bookmark.id + '">'+
  '<td><img src="' + bookmark.favIcon + '"></td>' +
    '<td><a href="' + bookmark.url.prefix + bookmark.url.path +'">' + bookmark.url.path + '</a></td>' +
    '<td>' + bookmark.title + '</td>' +
    '<td>' + bookmark.date + '</td>' +
    '<td><button class="deleteButton">Delete</button></td>' +
  '</a></tr>'
  return html
}

function loadBookmarks(){
  let req = new XMLHttpRequest()
  req.onloadend = e => {
    bookmarks = JSON.parse(req.response)
    console.log(bookmarks)
    for (let i = 0; i < bookmarks.length; i++){
      prependHTML(bookmarkToHTML(bookmarks[i]))
    }
    initDeleteButtons()
  }
  req.open('GET', 'http://localhost:8080/load', true);
  req.send();
}

function deleteBookmark(id){
  document.getElementById(id).remove()
  let req = new XMLHttpRequest()
  req.onloadend = e => {
    console.log(id + ' deleted correctly')
  }
  req.open('POST', 'http://localhost:8080/delete', true)
  req.send(id);
}

function initDeleteButtons(){
  let deleteButtons = document.getElementsByClassName('deleteButton')
  for(let i=0; i < deleteButtons.length; i++){
    let id = findContainerId(deleteButtons[i], 'bookmark')
    deleteButtons[i].onclick = e => {
      deleteBookmark(id)
    }
  }
}

// Va chercher le parent le plus proche avec une classe donnée et renvoit son id
function findContainerId(el, cls){
  while((el = el.parentElement) && !el.classList.contains(cls));
  return el.id
}
