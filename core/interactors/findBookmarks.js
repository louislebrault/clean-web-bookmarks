// On récupére une string
// On recherche tous les bookmarks dont l'url.path ou le title contiennent
// cette string
// On renvoit le résultat

// On peut soit récupéré tous les bookmarks dans la request,
// soit les demander ici à la BDD.
// Pour l'instant on peut gérer ça à partir de la requête
exports.findBookmarks = function(request) {
  let results = []
  let bookmarks = request.bookmarks
  let searchString = request.searchString
  for (let ii = 0 ; ii < bookmarks.length ; ii++){
    console.log(bookmarks[ii], searchString)
    if (bookmarks[ii].url.path.indexOf(searchString) > -1 ||
     bookmarks[ii].title.indexOf(searchString) > -1){
      results.push(bookmarks[ii])
    }
  }
  if (bookmarks.length > 0) return results
  else return false
}
