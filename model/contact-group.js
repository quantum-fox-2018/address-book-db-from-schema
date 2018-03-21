const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');
const controller = require('./controller.js')
class ContactsGroup{
  static saveTableConj(){
    db.serialize(function() {
      db.run(`CREATE TABLE IF NOT EXISTS contacts_group (
                contactId INTEGER NOT NULL ,
                groupId INTEGER NOT NULL,
                FOREIGN KEY(contactId) REFERENCES contacts(Id),
                FOREIGN KEY(groupId) REFERENCES groups(Id)
              );`);
    });
  }
  static saveContactToGroup(contactId, groupId){
    db.serialize(function() {
      db.run(`INSERT INTO contacts_group(contactId, groupId)
              VALUES ('${contactId}', '${groupId}'
        );`);
    });
  }
}
db.close();
module.exports = ContactsGroup
