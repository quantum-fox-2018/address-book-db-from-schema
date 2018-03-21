const {db} = require('../Config/Setup.js');

class Contact {
  constructor(name, address, email, phone) {
    this.id      = null;
    this.name    = name;
    this.address = address;
    this.email   = email;
    this.phone   = phone;
  }

  static add(prop, callback) {
    let query = `INSERT INTO Contacts VALUES (NULL, ?, ?, ?, ?)`;

    db.run(query, [prop.name, prop.address, prop.email, prop.phone], function(err) {
      if (err) {
        console.log(`${err}`);
      } else {
        prop.id = this.lastID;
        callback(prop);
      }
    });
  }

  static update(id, prop, callback) {
    Contact.checkID(id, checkResult => {
      if (checkResult == true) {
        let query = `UPDATE Contacts SET
        name = ?, address = ?, email = ?, phone =?
        WHERE id = ?`;
        db.run(query, [prop.name, prop.address, prop.email, prop.phone, id], (err) => {
          if (err) {
            console.log(`${err}`);
          } else {
            prop.id = id;
            callback(prop)
          }
        });
      } else {
        callback(`ID doesn't exist!`);
      }
    });
  }

  static delete(id, callback) {
    Contact.checkID(id, checkResult => {
      if (checkResult == true) {
        let query = `DELETE FROM Contacts WHERE id = ?`;
        db.run(query, [id], (err) => {
          if (err) {
            console.log(`${err}`);
          } else {
            callback('Delete data successfull!');
          }
        });
      } else {
        callback(`ID doesn't exist!`)
      }
    })
  }

  static checkID(id, callback) {
    let result = false;
    let query = `SELECT id FROM Contacts WHERE id = ?`;
    db.all(query, [id], (err, data) => {
      if (err) {
        console.log(`${err}`);;
      } else if (data.length > 0) {
        result = true;
      }
      callback(result);
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
    });
  }
}

module.exports = Contact
