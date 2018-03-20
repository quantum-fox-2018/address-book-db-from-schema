const {db} = require('../config/setup.js');

class Contact {
  constructor(name, address, email, phone) {
    this.id      = null;
    this.name    = name;
    this.address = address;
    this.email   = email;
    this.phone   = phone;
  }

  static add(name, address, email, phone, callback) {
    let query = `INSERT INTO Contacts VALUES (NULL, ?, ?, ?, ?)`;
    let contact = new Contact(name, address, email, phone);
    db.run(query, [name, address, email, phone], (err) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback(contact);
      }
    })
  }

  static update(id, name, address, email, phone, callback) {
    let query = `UPDATE Contacts SET
      name = ?, address = ?, email = ?, phone =?
      WHERE id = ?
    `;
    let contact = new Contact(id, name, address, email, phone);
    db.run(query, [], (err) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback(contact);
      }
    })
  }

  static delete(id, callback) {
    let query = `DELETE FROM Contacts WHERE id = ?`;
    db.run(query, [id], (err) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback('Delete data successfull!');
      }
    })
  }

  static show(callback) {
    let query = `SELECT * FROM Contacts`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback(data);
      }
    })
  }
}

module.exports = Contact
