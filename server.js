const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.get("/streaks", function(req, res){
    axios.get(`https://wakatime.com/api/v1/users/current/durations?api_key=${process.env.WAKATIME_KEY}&date=03-03-2019`)
    .then(function(response) {       
        console.log(response.data);
        res.json({ days: 4 });
    })
    .catch(error => console.log(error));
});


module.exports = app;