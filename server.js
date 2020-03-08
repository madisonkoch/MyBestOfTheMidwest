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
app.listen(process.env.PORT || 3000);
// app.set('port', process.argv[2]);

// Connect to MySQL database
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user  : 'mc85gdvobt6hg0wf',
  password: 'z0qw5rsrnoa2cuj1',
  database: 'xkllsej1hmyxpxce'
});

// Database table [BestOfTheMidwest_Votes] was created on OSU web platform
// Columns: state, votes

// ROUTES //
// Home
app.get('/', function (req, res) {
  res.render('home');
});

// Vote
app.post('/vote', function(req, res){
  console.log("hit post vote");
  var voteData = {};
  pool.query("UPDATE BestOfTheMidwest_Votes SET votes=? WHERE state=? ",
    [req.body.votes, req.body.state],
    function(err, result){
    if(err){
      console.log(err);
      return;
    }
    console.log(req.body);
    voteData.results = "Updated " + result.changedRows + " rows.";
    res.redirect('/vote');
  });
});


app.get('/vote', function (req, res) {

  // For all states get # of votes and % of total votes
  var dataObj = {};
    var queryAsString = "SELECT	*,(SELECT MAX(votes) FROM BestOfTheMidwest_Votes) AS maxVotes, CASE WHEN (SELECT MAX(votes) FROM BestOfTheMidwest_Votes) <> 0 THEN CAST(((votes / (SELECT MAX(votes) FROM BestOfTheMidwest_Votes))*100) as unsigned) ELSE 0 END AS percent FROM BestOfTheMidwest_Votes";
    pool.query(queryAsString, function(err, rows, fields){
      if(err){
        console.log("Location app.get('/vote'): " + err);
        return;
      }
      dataObj.results = JSON.stringify(rows);
      dataObj.results = JSON.parse(dataObj.results);
      //console.log(dataObj);
      //console.log(dataObj.results);

      //console.log(dataObj.results[0]);
      res.render('./vote', dataObj);
    })
});

// Fame
app.get('/fame', function (req, res) {
  res.render('./fame');
});

// Fun
app.get('/fun', function (req, res) {
  res.render('./fun');
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


