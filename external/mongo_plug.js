const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/clean-web-bookmarks'

let MongoPlug = {
  db: null,
  connectDB: () => {
      MongoClient.connect(url, (err, db) => {
        try {
          MongoPlug.db = db
          assert.equal(null, err);
          console.log("Connected successfully to mongo db");
        } catch(e){
          console.log(e)
        }
      })
  },

  createBookmark: (bookmark) => {
    let collection = MongoPlug.db.collection('bookmarks');
    return new Promise ((s,f) => {
      collection.insert(bookmark, (err, result) => {
        assert.equal(err, null);
        console.log("Inserted a bookmark into the collection");
        s(result.insertedIds[0])
      });
    })
  },

  loadBookmarks: () => {
    let collection = MongoPlug.db.collection('bookmarks');
    return new Promise ((s,f) => {
      collection.find().toArray(function(err, docs) {
        if (err) {
          f(null)
        }
        console.log("Found records");
        const bookmarks = formatFromPlugToApp(docs)
        s(bookmarks)
      });
    })
  },

  deleteBookmark: (id) => {
    let collection = MongoPlug.db.collection('bookmarks');
    let objectId = new mongo.ObjectID(id)
    collection.findAndRemove({_id:objectId}).then((v) => {
      console.log('Bookmark removed', v)
    })
  }
}

function formatFromPlugToApp(data){
  let newBookmarks = []
  for(var ii = 0; ii < data.length; ii++){
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
