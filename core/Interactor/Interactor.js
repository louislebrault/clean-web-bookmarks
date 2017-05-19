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
      await respondOwnerBookmarks()
    } else {
      await respondWelcome()
    }
  }
}
