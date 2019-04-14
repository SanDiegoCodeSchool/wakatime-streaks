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
    // pass all that data to leader board
    const studentResults = [];
    for(let i = 0; i < studentData.length; i++){
      studentResults.push(
        new Promise((resolve, reject) => {
          app.models.Student.getStreaks(studentData[i].id, (error, data) => {
            if (error) return reject(null); 
            resolve(data);
          });
        })
      )
    }
    Promise.all(studentResults)
    .then(data => {
    })
    .catch(error => console.log(error));

    app.models.Student.getStreaks(studentData.id, function(err, streak){
      res.render('leaderboard', {});
    })
  })
});

app.get('/signup', function(req, res){
  res.render('signup', {});
});
app.get('/login', function(req, res){
  res.render('login', {});
});
app.get('/privacy', function(req, res){
  res.render('privacy', {});
});
app.get('/userEdit', function(req, res){
  res.render('userEdit', {});
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
