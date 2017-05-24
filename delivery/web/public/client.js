let addButton = document.getElementById('addButton')
let addInput = document.getElementById('addInput')
let container = document.getElementById('container')

loadBookmarks()

addButton.onclick = e => {
  let req = new XMLHttpRequest();
  req.onloadend = e => {
    html = bookmarkToHTML(JSON.parse(req.response))
    prependHTML(html)
  }
  req.open('POST', 'http://localhost:8080/add', true);
  let val = addInput.value
  req.send(val);
}

function prependHTML(res){
  container.innerHTML = res + container.innerHTML
}

function bookmarkToHTML(bookmark){
  let html = '<tr>'+
  '<td><img src="' + bookmark.favIcon + '"></td>' +
    '<td><a href="' + bookmark.url.prefix + bookmark.url.path +'">' + bookmark.url.path + '</a></td>' +
    '<td>' + bookmark.title + '</td>' +
    '<td>' + bookmark.date + '</td>' +
  '</a></tr>'
  return html
}

function loadBookmarks(){
  let req = new XMLHttpRequest()
  req.onloadend = e => {
    bookmarks = JSON.parse(req.response)
    for (let i = 0; i < bookmarks.length; i++){
      prependHTML(bookmarkToHTML(bookmarks[i]))
    }
  }
  req.open('GET', 'http://localhost:8080/load', true);
  req.send();
}
