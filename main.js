const Controller = require('./controllers')

let argv = process.argv
let syntax = argv[2]
let table = argv[3]
let value = argv.slice(4)
let value1 = value[0]
let value2 = value[1]
let value3 = value[2]
let value4 = value[3]

Controller.checkSyntax(syntax, table, value1, value2, value3)