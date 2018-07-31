const request = require('request');

var geocodeAddress = (address) => {
    console.log(address);
    
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