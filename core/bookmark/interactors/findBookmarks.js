exports.findBookmarks = async function(request, plug) {
  let results = await plug.findBookmarks(request.page, request.searchString)
  if (results) return results
  else return false
}
