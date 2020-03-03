// 'require', aka install, express, handlebars and bodyparser for this app
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');
var path = require('path');

// The app can process both urlencoded and json object data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Make the efault file type .handlebars
app.engine('handlebars', handlebars.engine);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');

// Set port
app.set('port', 3000)
//app.set('port', process.argv[2]);

// Set up MongoDB (code from MongoDB docs)
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// // Connection URL
const url = 'mongodb://localhost:27017';

// // Database Name
const dbName = 'OSU-MidwestBestVotes';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the server
// client.connect(function (err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

// insertVotes(db, function () {
//   client.close();
// });

// updateVotes(db, stateSelection, function() {
//   client.close();
// })

// addVote(db, stateSelection, function () {
//   client.close();
// })

// findVotes(db, function () {
//   client.close();
// });

//});


// Insert original data into collection
const insertVotes = function (db, callback) {
  // Get state vote collection
  const collection = db.collection('StateVotes');

  // Check if collection is empty
  collection.count(function (err, count) {
    console.dir(err);
    console.dir(count);

    if (count == 0) {
      // Insert some votes into collection
      collection.insertMany([
        { state: "IA", votes: 0 , fullname : "Iowa"},
        { state: "IL", votes: 0 , fullname : "Illinois"},
        { state: "IN", votes: 0 , fullname : "Indiana"},
        { state: "OH", votes: 0 , fullname : "Ohio"},
        { state: "KS", votes: 0 , fullname : "Kansas"},
        { state: "MO", votes: 0 , fullname : "Missouri"},
        { state: "MN", votes: 0 , fullname : "Minnesota"},
        { state: "WI", votes: 0 , fullname : "Wisconsin"},
        { state: "SD", votes: 0 , fullname : "South Dakota"},
        { state: "ND", votes: 0 , fullname : "North Dakota"},
        { state: "MI", votes: 0 , fullname : "Michigan"},
        { state: "NE", votes: 0 , fullname : "Nebraska"}
      ], function (err, result) {
        assert.equal(err, null);
        assert.equal(12, result.result.n);
        assert.equal(12, result.ops.length);
        console.log("Inserted 12 states into the collection");
        callback(result);
      });

    }
  });
};

// FIND ALL
const findVotes = function (db, callback) {
  // Get state vote collection
  const collection = db.collection('StateVotes');

  collection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
  });
};

var async_Voting = function(db, stateSelection){
  addVote(db, stateSelection, console.log("Vote added"));
  findVotes(db, console.log(""));
};

// Add Vote to DB
const addVote = function (db, stateSelection, callback) {
    // Find current number of votes
    db.collection('StateVotes').find({ state: stateSelection }).toArray(function (err, result) {
      if (err) throw err;
      result = result[0];
      console.log(result.votes);

      // Add vote to state
      updateVotes(db, stateSelection, result.votes, function () {
        client.close();
      })
    })
};

// UPDATE DB
const updateVotes = function (db, stateSelection, stateVotes, callback) {
  var addToVotes = stateVotes + 1;
  var myquery = { state: stateSelection };
  var newvalues = { $set: { votes: addToVotes } };

  db.collection('StateVotes').updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
  });
};



// ROUTES //
// Home
app.get('/', function (req, res) {
  res.render('home');
});

// Vote
app.post('/vote', function(req, res){
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    async_Voting(db, req.body.State);
  });

  return res.redirect('/vote');
});


app.get('/vote', function (req, res) {
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('StateVotes');

    collection.find({}).toArray(function (err, result) {
      if (err) {
        throw err;
      } else {
        var voteMax = 0;
        for( var v=0; v < 12; v++){
          if(result[v].votes > voteMax ){
            voteMax = result[v].votes;
          }
        }

        var dataObj = {
          iowa : parseInt((result[0].votes/voteMax)*100,10),
          illinois : parseInt((result[1].votes/voteMax)*100,10),
          indiana : parseInt((result[2].votes/voteMax)*100,10),
          ohio : parseInt((result[3].votes/voteMax)*100,10),
          kansas : parseInt((result[4].votes/voteMax)*100,10),
          missouri : parseInt((result[5].votes/voteMax)*100,10),
          minnesota : parseInt((result[6].votes/voteMax)*100,10),
          wisconsin : parseInt((result[7].votes/voteMax)*100,10),
          southDakota : parseInt((result[8].votes/voteMax)*100,10),
          northDakota : parseInt((result[9].votes/voteMax)*100,10),
          michigan : parseInt((result[10].votes/voteMax)*100,10),
          nebraska : parseInt((result[11].votes/voteMax)*100,10),

          ia : result[0].votes,
          il : result[1].votes,
          in : result[2].votes,
          oh : result[3].votes,
          ks : result[4].votes,
          mo : result[5].votes,
          mn : result[6].votes,
          wi : result[7].votes,
          sd : result[8].votes,
          nd : result[9].votes,
          mi : result[10].votes,
          ne : result[11].votes,
        };

        res.render('vote', dataObj);
      }
    });
  });
});

// Fame
app.get('/fame', function (req, res) {
  res.render('fame');
});

// Fun
app.get('/fun', function (req, res) {
  res.render('fun');
});


// Status 404 & 500 code copied from learning material examples
// based on the permission given in the assignment instructions
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate.');
});


