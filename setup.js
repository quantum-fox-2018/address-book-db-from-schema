/*jshint esversion:6*/

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/address_book.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
class Database {
  static setup() {
    db.serialize(() => {
      let queryTableContacts = `CREATE TABLE IF NOT EXISTS contacts (
            contact_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name VARCHAR NOT NULL,
            phone_number VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            address TEXT NOT NULL
          )`;
      let queryTableGroups = `CREATE TABLE IF NOT EXISTS groups (
                group_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name VARCHAR NOT NULL
              )`;
      let queryTableContactsGroups = `CREATE TABLE IF NOT EXISTS contacts_groups (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            contact_id INTEGER NOT NULL,
            group_id INTEGER NOT NULL,
            FOREIGN KEY (contact_id) REFERENCES contacts(contact_id),
            FOREIGN KEY (group_id) REFERENCES groups(group_id)
          )`;

      db.run(queryTableContacts, (err) => {
        if (err) throw err;
        else {
          console.log('Table contacts created successfully.');
        }
      });

      db.run(queryTableGroups, (err) => {
        if (err) throw err;
        else {
          console.log('Table groups created successfully.');
        }
      });

      db.run(queryTableContactsGroups, (err) => {
        if (err) throw err;
        else {
          console.log('Table contacts_groups created successfully.');
        }
      });

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
    });
  }

  static uploadData() {
    fs.readFile('./database/database-contacts.csv', 'utf8', (err, data) => {
      let dataContacts = data.trim().split('\n').map(x => x.split(',')).splice(1);
      for (let i = 0; i < dataContacts.length; i++) {

        let name = dataContacts[i][0];
        let phone_number = dataContacts[i][1];
        let email = dataContacts[i][2];
        let address = dataContacts[i][3];
        db.run(`INSERT INTO contacts (contact_id, name, phone_number, email, address) VALUES (
             null, ?, ?, ?, ?)`, name, phone_number, email, address, (err) => {
          if (err) throw err;
          else {
            console.log('Table contacts created successfully');
          }
        });
      }
    });

    fs.readFile('./database/database-groups.csv', 'utf8', (err, data) => {
      let dataGroups = data.trim().split('\n').map(x => x.split(',')).splice(1);
      for (let i = 0; i < dataGroups.length; i++) {

        let valueData1 = dataGroups[i][0];
        db.run(`INSERT INTO groups (group_id, name) VALUES (
               null, ?)`, valueData1, (err) => {
          if (err) throw err;
          else {
            console.log('Table groups created successfully');
          }
        });
      }
    });
  }
}

module.exports = Database;
