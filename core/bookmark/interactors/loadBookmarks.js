exports.loadBookmarks = async function(page, plug) {
  let bookmarks = await plug.loadBookmarks(page)
  if (bookmarks.length) return bookmarks
  else return null
}
