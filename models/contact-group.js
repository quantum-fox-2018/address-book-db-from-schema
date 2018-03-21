const db = require('../config/database')

class ContactGroups {
  static assignContact(group) {
    let tableName = 'ContactGroups'
    let keys = Object.keys(group).join(', ')
    let value = Object.values(group)
    
    var value2 = value.map(text => text = "'" + text + "'")
    value2 = value2.join(',')

    db.run(`
    INSERT INTO ${tableName} (${keys})
    VALUES (${value2});
    `)
    console.log(`Data ${group.name} berhasil ditambah ke dalam ${tableName}!`)
  }

}

module.exports = ContactGroups