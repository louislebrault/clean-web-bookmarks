
exports.loadBookmarks = async (plug) => {
  let bookmarks = await plug.loadBookmarks()
  if (bookmarks.length) return bookmarks
  else return null
  }
