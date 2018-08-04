const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
    .option({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address to fetch the weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
console.log('Input address :', encodedAddress);
gecodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;
            // '&key=' + process.env.WEATHER_APP_KEY;

axios.get(gecodeURL).then((response)=>{
    if (response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find the address');
    }
    // console.log(response.data);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = 'https://api.darksky.net/forecast/' +
                    process.env.DARKSKY_APIKEY + '/' + lat + ',' + lng;
    console.log(weatherURL);
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response)=> {
    var temp = response.data.currently.temperature;
    var apparentTemperature =  response.data.currently.apparentTemperature;
    console.log('It\'s currenlty ' + temp + 'It feels like ' + apparentTemperature);
    
}).catch((error)=> {
    // console.log(error);    
    if (error.code === "ECONNREFUSED" || error.code === "ETIMEDOUT"){
        console.log('Unabler to connect to API service');
    }else {
        console.log(error.message);
    }
});