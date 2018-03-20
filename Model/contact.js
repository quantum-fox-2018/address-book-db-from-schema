const Database = require('../setup.js');
const database = new Database('Address Book');
const db = database.db;

class Contact{
  constructor(id, name, address, phone_number, email){
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone_number = phone_number;
    this.email = email;
    this.queryInsertNewContact = `INSERT INTO contacts VALUES (null,${this.name},${this.address},${this.phone_number},${this.email})`;
    this.queryUpdateContact = `UPDATE contacts SET `;
    this.queryDeleteContact = `DELETE FROM contacts WHERE phone_number = ${this.phone_number}`;
    this.queryGetContactId = `SELECT id FROM contacts WHERE phone_number = ${this.phone_number}`;
  }

  createNewContact(callback){
    db.run(this.queryInsertNewContact, (err)=>{
      (err) ? callback(true) : callback(false);
    });
  }

  updateContactByPhone(phone_number, column_name, update_value, callback){
    let query = this.queryUpdateContact + `${column_name} = "${update_value}" WHERE phone_number = ${phone_number}`;

    db.run(query, (err)=>{
      (err) ? callback(true) : callback(false);
    });
  }

  deleteContactByPhone(callback){
    db.run(this.queryDeleteContact, (err)=>{
      (err) ? callback(true) : callback(false);
    });
  }

  getContactIdByPhone(callback){
    db.get(this.queryGetContactId, (err, data)=>{
      (err) ? callback(true) : callback(false, data);
    });
  }

  showAllContact(callback){

  }
}

module.exports = Contact;
