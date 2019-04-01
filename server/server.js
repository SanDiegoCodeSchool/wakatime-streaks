'use strict';
const ejs = require('ejs');
const morgan = require('morgan');
const loopback = require('loopback');
const boot = require('loopback-boot');
const path = require('path');

require('dotenv').config();

const app = module.exports = loopback();

app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  let ids = app.models.Student.find()
  .then(function(studentData){
    // todo loop over all students pass the student id, get their streaks
    // pass all that data to leader board
    app.models.Student.getStreaks("3", function(err, streak){
      res.render('leaderboard', {});
    })
  })
});

app.get('/login', function(req, res){
  res.render('login', {});
});



app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
