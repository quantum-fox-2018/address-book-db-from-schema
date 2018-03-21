const Controller = require('./controller/controller')

let argv = process.argv
Controller.routes(argv)