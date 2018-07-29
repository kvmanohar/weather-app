const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: 'https://api.darksky.net/forecast/' +
            process.env.DARKSKY_APIKEY + '/' + lat + ',' + lng,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
            // console.log(body.currently.temperature);
        } else {
            console.log(response);
            callback('Unable to fetch weather');
        }
    });
};

module.exports = {
    getWeather
};