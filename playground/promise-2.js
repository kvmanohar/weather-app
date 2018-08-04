const request = require('request');

var geocodeAddress = (address) => {
    console.log(encodeURI(address));
    
    return new Promise((resolve, reject) => {        
        request({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + 
            '&key=' + process.env.WEATHER_APP_KEY,
            json: true
        },(error, response, body)=>{
            if (error) {
                reject('Unable to connecto to Google Service');
            } else if (body.status === 'ZERO_RESULTS'){
                reject('Unable to find the address');
            } else if (body.status === 'OK'){
                var location = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                };
                resolve(location);
            }
        });
    });
};

geocodeAddress('SS142FA').then((location)=>{
    console.log(JSON.stringify(location,undefined,2));
}, (errorMessage)=>{
    console.log(errorMessage);
});

//***********************************************************//
//***** geocodeAddress Function with Callback framework *****//
//***********************************************************//

// var geocodeAddress = (address, callback) => {
//     request({
//         url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) +
//             '&key=' + process.env.WEATHER_APP_KEY,
//         json: true
//     }, (error, response, body) => {
//         if (error) {
//             callback('Unable to connect to Google service');
//         } else if (body.status === 'ZERO_RESULTS') {
//             callback('Unable to find that address');
//         } else if (body.status === 'OK') {
//             callback(undefined, {
//                 address: body.results[0].formatted_address,
//                 latitude: body.results[0].geometry.location.lat,
//                 longitude: body.results[0].geometry.location.lng
//             });
//         }
//         // console.log(JSON.stringify(body,undefined,2));
//     });
// };

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         // console.log(JSON.stringify(results,undefined,2));
//         console.log('Location: ', results.address);
//         weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//             if (errorMessage) {
//                 console.log(errorMessage);
//             } else {
//                 console.log('It\'s currently : ', weatherResults.temperature,
//                     'It feels like :', weatherResults.apparentTemperature);
//             }
//         });

//     }
// });
