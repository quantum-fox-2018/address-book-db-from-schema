const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class ModelContact {
  constructor(objContact = {}) {
    this.id = null;
    this.name = objContact.name;
    this.phone_number = objContact.phone_number;
  }

  static listContact(callback) {
    db.all(`SELECT * FROM contacts`, (err, datas) => {
      if(err) console.log(err);
      callback(datas);
    });
  }

  addContact(callback) {
    let thisModel = this;
    db.run(`INSERT INTO contacts VALUES (NULL, '${this.name}', '${this.phone_number}')`, function() {
      thisModel.id = this.lastID;
      callback(thisModel.name);
    });
  }

  updateData(objUpdate, callback) {
    let key = Object.keys(objUpdate);
    for(let i in key) {
      this[key[i]] = objUpdate[key[i]];
    }
    db.run(`UPDATE contacts SET name = '${this.name}', phone_number = '${this.phone_number}' WHERE id = ${this.id}`);
    callback(this.name);
  }

  findById(id, callback) {
    let thisModel = this;
    db.each(`SELECT * FROM contacts WHERE id = ${id}`, (err, data) => {
      if(err) console.log(err);
      thisModel.id = data.id;
      thisModel.name = data.name;
      thisModel.phone_number = data.phone_number;
      callback();
    });
  }

  deleteContact(callback) {
    let thisModel = this;
    db.run(`DELETE FROM contacts WHERE id = ${thisModel.id}`);
    db.close();
    callback(thisModel.name);
  }
}

module.exports = ModelContact;
