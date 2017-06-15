const mongo = require('mongodb')
const MongoClient = mongo.MongoClient,
  assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/clean-web-bookmarks'

let MongoPlug = {
  db: null,
  bookmarks: null,
  connectDB: function() {
    MongoClient.connect(url, (err, db) => {
      try {
        MongoPlug.db = db
        MongoPlug.bookmarks = MongoPlug.db.collection('bookmarks')
        assert.equal(null, err);
        console.log("Connected successfully to mongo db");
      } catch (e) {
        console.log(e)
      }
    })
  },

  createBookmark: function(bookmark) {
    return new Promise((s, f) => {
      MongoPlug.bookmarks.insert(bookmark, (err, result) => {
        assert.equal(err, null);
        console.log("Inserted a bookmark into the collection");
        s(result.insertedIds[0])
      });
    })
  },

  loadBookmarks: function(page) {
    let limit = 30
    let skip = page * limit
    return new Promise((s, f) => {
      MongoPlug.bookmarks.find().sort({
        date: -1
      }).skip(skip).limit(limit).toArray((err, docs) => {
        if (err) {
          f('Error on loadBookmarks')
        }
        console.log("Found records");
        const bookmarks = formatFromPlugToApp(docs)
        s(bookmarks)
      });
    })
  },

  deleteBookmark: function(id) {
    let objectId = new mongo.ObjectID(id)
    MongoPlug.bookmarks.findAndRemove({
      _id: objectId
    }).then((v) => {
      console.log('Bookmark removed', v)
    })
  },

  findBookmarks: function(page, searchString) {
    let limit = 30
    let skip = page * limit
    let regex = new RegExp(searchString, 'i')
    let query = {
      $or: [{
        'url.path': regex
      }, {
        title: regex
      }]
    }
    return new Promise((s, f) => {
      MongoPlug.bookmarks.find(query).skip(skip).limit(limit).
      toArray((err, docs) => {
        if (err) f('Error on findBookmarks')
        s(docs)
      })
    })
  }
}

function formatFromPlugToApp(data) {
  let newBookmarks = []
  for (var ii = 0; ii < data.length; ii++) {
    let newBookmark = {
      url: data[ii].url,
      title: data[ii].title,
      id: data[ii]._id,
      date: data[ii].date,
      favIcon: data[ii].favIcon
    }
    newBookmarks.push(newBookmark)
  }
  return newBookmarks
}


module.exports = MongoPlug
