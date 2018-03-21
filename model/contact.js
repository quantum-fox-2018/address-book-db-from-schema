const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');
const controller = require('./controller.js')

class Contact{
  static saveTableContacts(){
    db.serialize(function() {
      db.run(`CREATE TABLE IF NOT EXISTS contacts(
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name VARCHAR,
          address VARCHAR,
          phone VARCHAR,
          email VARCHAR
        );`);
    });
  }
  static saveContact(name, address, phone, email){
    let angka = '0123456789'

    if(phone.length > 13){
      return 'maksimal phone 13 digit'
    }
    for(let i = 0; i < phone.length;i++){
        let checker = 0
        for(let j = 0; j < angka.length;j++){
          if(phone[i] === angka[j]){
            checker++
          }
        }
        if(checker === 0){
            return 'input phone salah'
        }
    }
    db.serialize(function() {
      db.run(`INSERT INTO contacts(name, address, phone, email)
              VALUES('${name}','${address}','${phone}','${email}');`
      );
    });
  }
  static saveupdateContact(name, address, phone, email,id){
    db.serialize(function() {
      db.run(`UPDATE contacts SET
              name = '${name}',
              address = '${address}',
              phone = '${phone}',
              email = '${email}'
              WHERE id = '${id}'`);
    });
  }
  static deleteContactDB(id){
    db.serialize(function() {
      db.run(`DELETE FROM contacts
            WHERE
            id = '${id}';`);
    });
  }
}
db.close();
module.exports = Contact
