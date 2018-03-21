const db = require('../config/database')

class Group {
  constructor(objGroup) {
    this.groupId = objGroup.no
    this.name = objGroup.name
    this.contacts = []
  }

  static show(cb) {
    db.all(`
    SELECT
    Groups.groupId AS no,
    Groups.name AS name,
    Contacts.name AS contact
    FROM Groups
    LEFT JOIN ContactGroups
    ON Groups.groupId = ContactGroups.groupId
    LEFT JOIN Contacts
    ON ContactGroups.contactId = Contacts.contactId
    `, function(err, row) {
      // console.log(row);
      let groups = []
      let counter = 0
      for(let i=0; i<row.length; i++) {
        if(i > 0) {
          if(row[i].no == row[i-1].no) {
            counter++
            groups[i-counter].contacts.push(row[i].contact)
          } else {
            groups.push(new Group(row[i]))
            groups[i-counter].contacts.push(row[i].contact)
          }
        } else {
          groups.push(new Group(row[i]))
          groups[i].contacts.push(row[i].contact)
        }
      }
      cb(groups)
    });
  }

  static create(data, cb) {
    let group = {
      name: data[0],
    }

    let tableName = 'Groups'
    let keys = Object.keys(group).join(', ')
    let value = Object.values(group)
    
    var value2 = value.map(text => text = "'" + text + "'")
    value2 = value2.join(',')

    db.run(`
    INSERT INTO ${tableName} (${keys})
    VALUES (${value2});
    `)
    cb(`Data ${group.name} berhasil ditambah ke dalam ${tableName}!`)
  }

  static update(id, update, cb) {
    let tableName = 'Groups'
    db.run(`
    UPDATE ${tableName}
    SET ${update[0]} = '${update[1]}'
    WHERE groupId = ${id};
    `)
    cb(`Data berhasil diupdate!`)
  }

  static delete(id, cb) {
    let tableName = 'Groups'
    let tableConjunction = 'ContactGroups'
    db.run(`
    DELETE FROM ${tableConjunction}
    WHERE groupId = ${id};
    `)
    db.run(`
    DELETE FROM ${tableName}
    WHERE groupId = ${id};
    `)
    cb(`Data berhasil dihapus`)
  }
}

module.exports = Group