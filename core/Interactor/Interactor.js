module.exports = {
  submitBookmark: async function ({
    url,
    bookmark,
    isUrlValid,
    addBookmark,
    requestTitle,
    respondSuccess,
    respondFailure
  }){
    if(isUrlValid(url)){
      await addBookmark(bookmark)
      await requestTitle(bookmark)
      await respondSuccess()
    }
    else await respondFailure()
  },

  accessApp: async function  ({
    user,
    userHasBookmarks,
    respondUserBookmarks,
    respondWelcome
  }){
    if(userHasBookmarks(user)){
      await respondUserBookmarks()
    } else {
      await respondWelcome()
    }
  },

  // Sort bookmarks by date
  // Is there bookmarks to sort ?
  // If yes sort them
  // then send success response
  // If no send failure response
  sortBookmarksByDate: async function ({
    user,
    bookmarks,
    userHasBookmarks,
    sortBookmarksByDate,
    respondSortedBookmarks,
    respondFailure
  }){
    if(userHasBookmarks(user)){
      await sortBookmarksByDate(bookmarks)
      await respondSuccess()
    } else {
      await respondFailure();
    }

  })
}
