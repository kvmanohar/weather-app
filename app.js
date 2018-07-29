const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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
console.log('Input address :', argv.address);   

geocode.geocodeAddress(argv.address,(errorMessage, results) => {
    if (errorMessage){
        console.log(errorMessage);
    } else {
        // console.log(JSON.stringify(results,undefined,2));
        console.log('Location: ', results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log('It\'s currently : ', weatherResults.temperature, 
                            'It feels like :', weatherResults.apparentTemperature);
            }
        });

    }
});

// weather.getWeather("37.8267", "-122.4233", (errorMessage, results) => {
//     if(errorMessage){
//         console.log(errorMessage);
//     } else {
//         console.log('Temperature: ', results);
//     }
// });