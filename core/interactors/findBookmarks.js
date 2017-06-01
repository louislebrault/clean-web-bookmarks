exports.findBookmarks = async function(searchString, plug) {
  let results = await plug.findBookmarks(searchString)
  if (results) return results
  else return false
}
