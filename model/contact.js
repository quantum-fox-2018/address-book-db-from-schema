/*jshint esversion:6*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/address_book.db');

class Contact {
  static add(name, phone_number, email, address, cb) {
    db.run(`INSERT INTO contacts (contact_id, name, phone_number, email, address) VALUES (
           null, ?, ?, ?, ?)`, name, phone_number, email, address, (err) => {
      if (err) throw err;
      else {
        cb('Table added successfully');
      }
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
  static update(name, phone_number, email, address, contact_id, cb) {
    db.run(`UPDATE contacts SET name = '${name}',
                                  phone_number = '${phone_number}',
                                  email = '${email}',
                                  address = '${address}'
                                  WHERE contact_id = ${contact_id};`, (err) => {
      if (err) throw err;
      else {
        cb('Table updated successfully');
      }
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
  static delete(contact_id,cb) {
    db.run(`DELETE FROM contacts WHERE contact_id = ${contact_id};`, (err) => {
      if (err) throw err;
      else {
        cb('Table deleted successfully');
      }
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
  static show(cb) {
    db.all(`SELECT contacts.name as ContactName, phone_number, email, address, gabung.name as groupName FROM contacts
            LEFT JOIN (SELECT groups.name, contacts_groups.contact_id FROM groups
            JOIN contacts_groups ON groups.group_id = contacts_groups.group_id) as gabung
            ON gabung.contact_id = contacts.contact_id;`, (err, dataRows) => {
      if (err) throw err;
      else {
        cb(dataRows);
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

module.exports = Contact;
