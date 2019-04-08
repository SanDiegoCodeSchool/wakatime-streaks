'use strict';

const axios = require('axios');
const moment = require('moment');
const CODING_MINIMUM = process.env.CODING_MINIMUM || 1;

module.exports = function(Student) {
    function getHoursCoding(apiKey, day) {
        return axios.get(`https://wakatime.com/api/v1/users/current/durations?api_key=${apiKey}&date=${day}`)
        .then(function(response) {       
            let { data } = response.data;
            let duration = 0;
            for(let i = 0; i < data.length; i++){
                duration += data[i].duration;
            }
            return duration / (60 * 60);
        })
        .catch(error => null);//console.log(error));
    }

    function getApiKey(id) {
        return Student.findOne({"where":{"id": id}})
        .then(data => data.wakatimekey)
        .catch(error => console.log(error));
    }
    /**
     * id is student id, 
     */
    Student.getStreaks = function(studentId, cb) { 
        let yesterday = moment().subtract(1, 'days').format('MM-DD-YYYY');
        let dayBefore = moment().subtract(2, 'days').format('MM-DD-YYYY');
        
        getApiKey(studentId)
        .then(apiKey =>
            Promise.all([getHoursCoding(apiKey, yesterday), getHoursCoding(apiKey, dayBefore)])
            .then(function(results) {
                if (results[0] <= CODING_MINIMUM || results[1] <= CODING_MINIMUM ) return cb(null, 0);
                let getDays = [];
                for (let i = 3; i < 8; i++) {
                    getDays.push(getHoursCoding(apiKey, moment().subtract(i, 'days').format('MM-DD-YYYY')));
                }
                Promise.all(getDays)
                .then(function(dailyTotals) {
                    let days = 1;
                    for(let i = 0; i < dailyTotals.length; i++) {
                        if(dailyTotals[i] < CODING_MINIMUM) return cb(null, days);
                        days++;
                    }
                    return cb(null, days);
                })
            })
            .catch(error => cb(error, null))
        )
      }
  
      Student.remoteMethod('getStreaks', {
        description: 'Checks wakatime and returns a streak.',  
        accepts: {arg: 'studentId', type: 'string'},
        returns: {arg: 'days', type: 'string'},
        http: {path: '/getStreaks', verb: 'get'}
      });
};
