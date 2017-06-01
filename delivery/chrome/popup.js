let url = '';
let title = '';
document.addEventListener('DOMContentLoaded', function() {
  let yesButton = document.getElementById('yesButton')
  let noButton = document.getElementById('noButton')
  let urlContainer = document.getElementById('urlContainer')
  let titleContainer = document.getElementById('titleContainer')
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){
      url = tabs[0].url;
      title = tabs[0].title;
      urlContainer.innerHTML = url
      titleContainer.innerHTML = title
      yesButton.onclick = e => {
        onYesButtonClick(e)
      }
      noButton.onclick = e => {
        window.close()
      }
  })
})

function onYesButtonClick(e) {
  let data = JSON.stringify({url, title})
  if (url.length > 0){
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8080/add', true);
    req.send(data);
    window.close()
  }
}
