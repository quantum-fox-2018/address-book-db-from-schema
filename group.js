var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');
const Contact_Group = require('./contact-group.js').Contact_Group;

class Group {

  constructor(){
    this.name = null;
  }

  static show(cbDatabaseGroups){

    let showQuery = "SELECT * FROM groups";
    db.all(showQuery,function(err,database_groups){
      cbDatabaseGroups(database_groups)
    })
  }

  create(name,cbTotalGroups){

    this.name = name;
    let createQuery = `INSERT INTO groups (id, groupName) VALUES (NULL, ?)`;
    db.run(createQuery, this.name);

    let selectQuery = `SELECT COUNT(*) AS totalGroups FROM groups`;
    db.all(selectQuery,function (err,totalGroups) {
      cbTotalGroups(totalGroups)
    })
  }

  addContact(groupName, contact_id,cbAddedData){
    this.name = groupName;
    let searchIdQuery = `SELECT id FROM groups WHERE groupName = ?`
    db.all(searchIdQuery,function (err,group_id) {

      let addContactQuery = `INSERT INTO group_contacts (id,groupId,contactId) VALUES (NULL,?,?)`
      db.run(addContactQuery,group_id,contact_id);
    })

    let selectQuery = `SELECT name FROM contacts WHERE contacts.id = contactId`;
    db.all(selectQuery,function(err,addedName){
      cbAddedData(addedName);
    })

  }
}

module.exports = {Group:Group};
