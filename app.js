const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
        console.log(JSON.stringify(results,undefined,2));
    }
});