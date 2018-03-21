const db = require('../config/database')

class Contact {
  constructor(objContact) {
    this.contactId = objContact.no
    this.name = objContact.name
    this.company = objContact.company
    this.phone = objContact.phone
    this.email = objContact.email
    this.groups = []
  }

  static show(cb) {
    db.all(`
    SELECT
      Contacts.contactId AS no, 
      Contacts.name,
      Contacts.company,
      Contacts.phone,
      Contacts.email,
      Groups.name AS grup
    FROM Contacts
    LEFT JOIN ContactGroups
        ON Contacts.contactId = ContactGroups.contactId
    LEFT JOIN Groups
      ON Groups.groupId = ContactGroups.groupId
    `, function(err, row) {
      // console.log(row);
      let contacts = []
      let counter = 0
      for(let i=0; i<row.length; i++) {
        if(i > 0) {
          if(row[i].no == row[i-1].no) {
            counter++
            contacts[i-counter].groups.push(row[i].grup)
          } else {
            contacts.push(new Contact(row[i]))
            contacts[i-counter].groups.push(row[i].grup)
          }
        } else {
          contacts.push(new Contact(row[i]))
          contacts[i].groups.push(row[i].grup)
        }
      }
      cb(contacts)
    });
  }

  static create(data, cb) {
    if(data[2].length > 12) {
      cb(`No Telephone anda lebih dari 12 Digit, mohon cek kembali`)
    } else {
      let newFormat = data[3].split('')
      let atPos = newFormat.indexOf('@')
      let dotPos = newFormat.indexOf('.')
      // console.log(newFormat, atPos, dotPos)
      if(atPos > 0 && dotPos > 0 && dotPos < atPos || atPos < 0 || dotPos < 0){
        cb(`Format email anda kurang tepat, mohon cek kembali`)
      } else {
        let contact = {
          name: data[0],
          company: data[1],
          phone: data[2],
          email: data[3],
        }
    
        let tableName = 'Contacts'
        let keys = Object.keys(contact).join(', ')
        let value = Object.values(contact)
        
        var value2 = value.map(text => text = "'" + text + "'")
        value2 = value2.join(',')
    
        db.run(`
        INSERT INTO ${tableName} (${keys})
        VALUES (${value2});
        `)
        cb(`Data ${contact.name} berhasil ditambah ke dalam ${tableName}!`)
      }
    }
  }

  static update(id, update, cb) {
    let tableName = 'Contacts'
    db.run(`
    UPDATE ${tableName}
    SET ${update[0]} = '${update[1]}'
    WHERE contactId = ${id};
    `)
    cb(`Data berhasil diupdate!`)
  }

  static delete(id, cb) {
    let tableName = 'Contacts'
    let tableConjunction = 'ContactGroups'
    db.run(`
    DELETE FROM ${tableConjunction}
    WHERE contactId = ${id};
    `)
    db.run(`
    DELETE FROM ${tableName}
    WHERE contactId = ${id};
    `)
    cb(`Data berhasil dihapus`)
  }
}

module.exports = Contact