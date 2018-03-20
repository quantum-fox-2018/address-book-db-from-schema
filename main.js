const Controller = require('./0.controllers');

const argv = process.argv;
const argv_data = argv.splice(2);
// console.log(argv_data)

Controller.routes(argv_data);