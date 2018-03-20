/*jshint esversion:6*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/address_book.db');

class ContactGroup {
  static add(contact_id, group_id, cb) {
    db.run(`INSERT INTO contacts_groups (id, contact_id, group_id) VALUES (
             null, ?, ?)`, contact_id, group_id, (err) => {
      if (err) throw err;
      else {
        cb('Table contacts_groups created successfully');
      }
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
}

module.exports = ContactGroup;
