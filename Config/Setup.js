const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class Database {
  static setup(callback) {
    let queryGroups = `CREATE TABLE IF NOT EXISTS Groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50)
    )`;
    let queryContacts = `CREATE TABLE IF NOT EXISTS Contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50),
      address TEXT,
      email VARCHAR(50),
      phone INTEGER
    )`;
    let queryContactGroups = `CREATE TABLE IF NOT EXISTS ContactGroups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupId INTEGER,
      contactId INTEGER,
        FOREIGN KEY (groupId) REFERENCES Groups(id),
        FOREIGN KEY (contactId) REFERENCES Contacts(id)
    )`;

    db.run(queryGroups, (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log('Create table Groups success!');
      }
    });

    db.run(queryContacts, (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log('Create table Contacts success!');
      }
    });

    db.run(queryContactGroups, (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log('Create table ContactGroups success!');
      }
    });
    callback('Setup database...');
  }
}

module.exports = {
  db,
  Database
}
