const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./groupX.db');

db.serialize(function() {
    db.run(`DROP TABLE IF EXISTS Contacts`);
    db.run(`DROP TABLE IF EXISTS Groups`);
    db.run(`DROP TABLE IF EXISTS ContactGroups`);

    db.run(`CREATE TABLE Contacts (contactId INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, company TEXT, phone TEXT, email TEXT)`);
    db.run(`CREATE TABLE Groups (groupId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`);
    db.run(`CREATE TABLE ContactGroups (CGId INTEGER PRIMARY KEY AUTOINCREMENT, contactId INTEGER, groupId INTEGER, FOREIGN KEY (contactId) REFERENCES Contacts(contactId), FOREIGN KEY (groupId) REFERENCES Groups(groupId))`);
    console.log(`Tabel sudah berhasil dibuat ke dalam database !`);
})

db.close();