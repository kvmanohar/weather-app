// https://darksky.net/dev/account
// Dark-Sky API Key: 4a3b0f98e7f107c734925d8f8ba04154

// API KEY Export Environment variables
// export WEATHER_APP_KEY="AIzaSyAPpiUQFlX4mTC39-jDPgEnPtb0Cfbn7ng"
// export DARKSKY_APIKEY="4a3b0f98e7f107c734925d8f8ba04154"
// 
const request = require('request');

var geocodeAddress = (address, callback) => {
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) +
            '&key=' + process.env.WEATHER_APP_KEY,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google service');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        } else if (body.status === 'OK') {
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
        // console.log(JSON.stringify(body,undefined,2));
    });
};

module.exports = {
    geocodeAddress
};

