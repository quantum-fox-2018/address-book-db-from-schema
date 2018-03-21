const createTable = require('./setupTable')
const seedTable = require('./seed-data')

function setup() {
  createTable()
  seedTable()
}

module.exports = setup