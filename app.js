const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=42%20braodhurst%20place%20Basildon' +
    '&key=' + process.env.WEATHER_APP_KEY,
    json: true
},(error,response, body) => {
    // console.log(JSON.stringify(body,undefined,2));
    console.log('Address: ', body.results[0].formatted_address);
    console.log('Latitude: ', body.results[0].geometry.location.lat);
    console.log('Longitude: ', body.results[0].geometry.location.lng);
});