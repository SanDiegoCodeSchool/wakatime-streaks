const express = require('express');
const axios = require('axios');
const moment = require('moment');
require('dotenv').config();

const CODING_MINIMUM = process.env.CODING_MINIMUM || 1;
const app = express();

app.use(express.static('public'));

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

module.exports = app;
