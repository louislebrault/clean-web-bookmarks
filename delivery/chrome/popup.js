let url = ''
let title = ''
const LOADING_MESSAGE = 'Waiting for the server to respond...'
const URL_NOT_VALID = 'URL seems empty'

document.addEventListener('DOMContentLoaded', function() {
  const yesButton = document.getElementById('yesButton')
  const noButton = document.getElementById('noButton')
  const urlContainer = document.getElementById('urlContainer')
  const titleContainer = document.getElementById('titleContainer')
  const infoContainer = document.getElementById('infoContainer')

  chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true
  }, function(tabs) {
    url = tabs[0].url
    title = tabs[0].title
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
  let data = JSON.stringify({
    url,
    title
  })
  if (url.length > 0) {
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8080/add', true);
    req.send(data);
    infoContainer.innerHTML = LOADING_MESSAGE
    req.onloadend = e => {
      console.log(req.status)
      if (req.status !== 200) onFailResponse(req.response)
      else onSuccessResponse(req.response)
    }
  } else infoContainer.innerHTML = URL_NOT_VALID
}

function onSuccessResponse(res) {
  infoContainer.innerHTML = 'Bookmark added with success !'
  setTimeout(() => {
    window.close()
  }, 500)
}

function onFailResponse(res) {
  infoContainer.innerHTML = 'Bookmark NOT saved. Error : ' + res
}
