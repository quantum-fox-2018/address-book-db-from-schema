const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

db.serialize(function(){

  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR,
            address VARCHAR,
            phone VARCHAR);`
        );
  db.run(`CREATE TABLE IF NOT EXISTS Groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_name VARCHAR);`
        );
  db.run(`CREATE TABLE IF NOT EXISTS ContactGroups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contactId INTEGER,
            groupId INTEGER,
            FOREIGN KEY (contactId) REFERENCES Contacts(id),
            FOREIGN KEY (groupId) REFERENCES Groups(id));`
        );
})

db.close();
