const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/clean-web-bookmarks'

let MongoPlug = {
  db: null,
  connectDB: () => {
    MongoClient.connect(url, (err, db) => {
      MongoPlug.db = db
      assert.equal(null, err);
      console.log("Connected successfully to mongo db");
    })
  },

  createBookmark: (bookmark) => {
    let collection = MongoPlug.db.collection('bookmarks');
    collection.insert(bookmark, (err, result) => {
      assert.equal(err, null);
      console.log("Inserted a bookmark into the collection");
    });
  },

  loadBookmarks: () => {
    let collection = MongoPlug.db.collection('bookmarks');
    return new Promise ((s,f) => {
      collection.find({}).toArray(function(err, docs) {
        if (err) {
          f(null)
        }
        console.log("Found the following records");
        console.log(docs)
        s(docs)
      });
    })
  }
}


module.exports = MongoPlug
