const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

db.serialize(function(){
  db.run(`DROP TABLE IF EXISTS Contacts`)

  db.run(`DROP TABLE IF EXISTS Groups`)

  db.run(`DROP TABLE IF EXISTS GroupContacts`)

  db.run(`DROP TABLE IF EXISTS Platforms`)

  db.run(`CREATE TABLE Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
    address TEXT, phoneNumber INTEGER NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE)`)

  db.run(`CREATE TABLE Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE)`)

  db.run(`CREATE TABLE GroupContacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contactId INTEGER
    NOT NULL, groupId INTEGER NOT NULL, FOREIGN KEY (contactId) REFERENCES Contacts(id),
    FOREIGN KEY (groupId) REFERENCES Groups(id))`)
})

db.close()
