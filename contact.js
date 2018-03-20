var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');

class Contact {

  constructor(){
    this.name = null;
    this.company = null;
    this.phone_number = null;
    this.email = null;
  }

  save(new_data,cbNewContact){

    let new_contact = JSON.parse(new_data);
    this.name = new_contact.name;
    this.company = new_contact.company;
    this.phone_number = new_contact.phone_number;
    this.email = new_contact.email;
    let contact_data = [this.name, this.company, this.phone_number, this.email];
    let addQuery = `INSERT INTO contacts (id, name, company, phone_number, email) VALUES (NULL,?,?,?,?)`
    db.run(addQuery, contact_data);

    let selectQuery = "SELECT * FROM contacts WHERE id = ?";
    let newDataQuery = "SELECT id FROM contacts WHERE name = ? AND company = ? AND phone_number = ? AND email = ?"

    db.all(newDataQuery,contact_data,function(err,newId){
      db.all(selectQuery,newId[0].id,function(err,newAddedContact){
        cbNewContact(newAddedContact);
      })
    })
    db.close();

  }

  update(commands,update_data,update_id,cbOldData){

    let new_data = null;
    let query = '';
    switch (commands) {
      case "name": this.name = update_data; new_data = this.name; query = `UPDATE contacts SET name = ? WHERE id = ?`;break;
      case "company": this.company = update_data; new_data = this.company; query = `UPDATE contacts SET company = ? WHERE id = ?`;break;
      case "phone_number": this.phone_number = update_data; new_data = this.phone_number; query = `UPDATE contacts SET phone_number = ? WHERE id = ?`; break;
      case "email": this.email = update_data; new_data = this.email; query = `UPDATE contacts SET email = ? WHERE id = ?`; break;
      default:break;
    }

    let beforeUpdateQuery = `SELECT * FROM contacts WHERE id = ?`;

    db.all(beforeUpdateQuery,update_id,function(err,oldData){
      cbOldData(oldData);
      let contact_data = [new_data, update_id];
      let updateQuery = query;
      db.run(updateQuery, contact_data);

    })

    db.close();
  }

  delete(){

  }

  static show(cbDatabaseContacts){

    let showQuery = "SELECT * FROM contacts";
    db.all(showQuery,function(err,database_contacs){
      cbDatabaseContacts(database_contacs)
    })
  }
}

module.exports = {Contact:Contact};
