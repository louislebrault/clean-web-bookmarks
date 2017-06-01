console.log('TEEEEST')
chrome.tabs.getCurrent(result => {
  console.log(result)
})
// var title = document.getElementsByTagName("title")[0].innerHTML;
// var location = window.location;

// var divTitle = document.getElementsById('title')
// var divUrl = document.getElementsById('url')



// console.log(title, location)
// document.addEventListener('DOMContentLoaded', function() {
//   console.log('CHROME WEB BOOKMARKS')
//   console.log(title, location)
//   divTitle.innerHTML = title
//   divUrl.innerHTML = divUrl
// });
