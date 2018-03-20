/*jshint esversion:6*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/address_book.db');

class Group {
  static add(name, cb) {
    db.run(`INSERT INTO contacts (group_id, name) VALUES (
           null, ?, ?, ?, ?)`, name, (err) => {
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
  static update(name, group_id, cb) {
    db.run(`UPDATE contacts SET name = '${name}'
            WHERE group_id = ${group_id};`, (err) => {
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
  static delete(group_id,cb) {
    db.run(`DELETE FROM contacts WHERE group_id = ${group_id};`, (err) => {
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
}

module.exports = Group;
