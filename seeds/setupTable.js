const db = require('../config/database')
 
function createTable() {
  db.serialize(function() {
    
    db.run("DROP TABLE IF EXISTS Contacts");
    db.run("DROP TABLE IF EXISTS Groups");
    db.run("DROP TABLE IF EXISTS ContactGroups");
  
    db.run(`
    CREATE TABLE Contacts (
    contactId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    company TEXT,
    phone TEXT,
    email TEXT
    );
    `)
    console.log('Berhasil membuat table Contacts')
  
    db.run(`
    CREATE TABLE Groups (
    groupId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
    );
    `)
    console.log('Berhasil membuat table Groups')
  
    db.run(`
    CREATE TABLE ContactGroups (
    contactGroupId INTEGER PRIMARY KEY AUTOINCREMENT,
    contactId INTEGER,
    groupId INTEGER,
  
    FOREIGN KEY(contactId) REFERENCES Contacts(contactId)
    FOREIGN KEY(groupId) REFERENCES Groups(groupId)
    );
    `)
    console.log('Berhasil membuat table ContactGroups')
  });
  // db.close();
}

module.exports = createTable

