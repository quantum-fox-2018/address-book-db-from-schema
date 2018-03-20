const Database = require('../setup.js');
const database = new Database('Address Book');
const db = database.db;

class ContactGroup{
  constructor(id, contact_id, group_id){
    this.id = id;
    this.contact_id = contact_id;
    this.group_id = group_id;
  }

}

module.exports = ContactGroup;
