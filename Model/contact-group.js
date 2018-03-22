const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class ContactGroup {
  constructor() {

  }
  static add(idInput, cb){
    let insertContact = "INSERT INTO contact_groups VALUES (Null, ?, ?)";
    db.run(insertContact, [idInput[0], idInput[1]], (err) => {
      cb(err)
    });
  }
  static delete(id, cb){

    let deleteId = `DELETE FROM contact_groups WHERE contactId = ? AND groupId = ? `;
    db.run(deleteId, [id[0], id[1]], (err) => {
      cb(err)
    })
  }

  static read(id, cb){
    let selectCon = `SELECT contacts.name, contacts.phone, contacts.email, contacts.company
                     FROM contacts
                     JOIN contact_groups cg
                     ON contacts.Id = cg.contactId AND cg.groupId = ? ; `;
    db.all(selectCon, id, (err, rows) => {
      if(err){
        cb(err)
      }else{
        cb(rows)
      }
    })
  }

}

module.exports = ContactGroup;
