const fs = require('fs')
const path = require('path')

const db = require('../config/database')
 
function insertDataSeed(tableName, file) {
  let file_path = path.join(__dirname, './', file)

  let data = fs.readFileSync(file_path, 'utf8')
  data = JSON.parse(data)

  let keys = Object.keys(data[0])

  let values = []
  for(let i=0; i<keys.length; i++) {
    values.push('?')
  }

  values = values.join(',')

  db.serialize(function() {
    var stmt = db.prepare(`INSERT INTO ${tableName} VALUES (${values})`);
    for (let i = 0; i < data.length; i++) {
      stmt.run(Object.values(data[i]));
    }

    stmt.finalize();
  });
  console.log(`Table ${tableName} berhasil diinput!`)
}

function insertAllData() {
  insertDataSeed("Contacts", "./seedContact.json")
  insertDataSeed("Groups", "./seedGroup.json")
  insertDataSeed("ContactGroups", "./seedContactGroups.json")
  db.close();
}

module.exports = insertAllData