const readline = require('readline');
const r1 = readline.createInterface({
    input: process. stdin,
    output: process.stdout
});

var controller = require('./src/atm_controller');

console.log(controller.runTests);