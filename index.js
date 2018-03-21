const argv = process.argv
const Controller = require('./controller.js');

let command = argv[2]
let input = argv.slice(3)

Controller.processData(command, input)
