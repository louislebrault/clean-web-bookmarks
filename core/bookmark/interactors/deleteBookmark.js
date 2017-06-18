exports.deleteBookmark = async function(id, plug) {
  plug.deleteBookmark(id)
  return true
}
