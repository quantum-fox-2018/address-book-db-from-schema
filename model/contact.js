var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('address_book_database.db');

class Contact{
  static addContact(name, phoneNumber, address, cb) {
    let query  = `INSERT INTO contacts (id, name, phoneNumber, address) VALUES (NULL, '${name}', '${phoneNumber}', '${address}')`
    db.run(query, function(err) {
      if(err) {
        cb(err);
      } else {
        cb({name: name, phoneNumber: phoneNumber, address: address})
      }
    })
  }

  static updateContact(set, setData, where, whereData, cb) {
    let query = `UPDATE contacts SET ${set} = ? WHERE ${where} = ?`
    db.run(query, setData, whereData, function(err) {
      if(err) {
        cb(err)
      } else {
        cb("sukses");
      }
    })
  }

  static viewList(cb) {
    let query = 'SELECT * FROM contacts'
    db.all(query, function(err, rows) {
      if(err) {
        cb(err);
      } else {
        cb(rows)
      }
    })
  }

  static deleteContact(where, value, cb) {
    let query = `DELETE FROM contacts WHERE ${where} = ?`
    db.run(query, value, function(err) {
      if(err) {
        cb(err)
      } else {
        cb('delete success')
      }
    })
  }
}

module.exports = Contact
