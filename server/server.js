'use strict';

const morgan = require('morgan');
const loopback = require('loopback');
const boot = require('loopback-boot');
const axios = require('axios');
const moment = require('moment');

require('dotenv').config();

const app = module.exports = loopback();

app.use(morgan('dev'));
const CODING_MINIMUM = process.env.CODING_MINIMUM || 1;

function getHoursCoding(day) {
  return axios.get(`https://wakatime.com/api/v1/users/current/durations?api_key=${process.env.WAKATIME_KEY}&date=${day}`)
  .then(function(response) {       
      let { data } = response.data;
      let duration = 0;
      for(let i = 0; i < data.length; i++){
          duration += data[i].duration;
      }
      return duration / (60 * 60);
  })
  .catch(error => console.log(error));
}

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


app.get("/streaks", function(req, res){
  let yesterday = moment().subtract(1, 'days').format('MM-DD-YYYY');
  let dayBefore = moment().subtract(2, 'days').format('MM-DD-YYYY');
  
  Promise.all([getHoursCoding(yesterday), getHoursCoding(dayBefore)])
  .then(function(results) {
      if (results[0] <= CODING_MINIMUM || results[1] <= CODING_MINIMUM ) return res.json({ days: 0 });
      let getDays = [];
      for (let i = 3; i < 8; i++) {
          getDays.push(getHoursCoding(moment().subtract(i, 'days').format('MM-DD-YYYY')));
      }
      Promise.all(getDays)
      .then(function(dailyTotals) {
          let days = 1;
          for(let i = 0; i < dailyTotals.length; i++) {
              if(dailyTotals[i] < CODING_MINIMUM) return days;
              days++;
          }
          return res.json({ days });
      })
  })
  .catch(error => console.log(error));
});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
