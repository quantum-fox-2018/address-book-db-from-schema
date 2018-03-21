var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');

class Database{

  static setup(cbSetupMessage){

    db.serialize(function() {

      let createTableGroup = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT,groupName VARCHAR(20), CONSTRAINT group_unique UNIQUE (groupName))"
      let createTableGroupContact = "CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,groupId INTEGER REFERENCES groups(id), contactId INTEGER REFERENCES contacts(id), CONSTRAINT contact_unique UNIQUE (contactId))"
      let createTableContact = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), company VARCHAR(20), phone_number VARCHAR(20), email VARCHAR(20))"
      db.run(createTableGroup);
      db.run(createTableGroupContact);
      db.run(createTableContact)


    });

    let setupMessage = "Table has been successfully created"
    cbSetupMessage(setupMessage)
    db.close();

  }
}

module.exports = {Database:Database};
