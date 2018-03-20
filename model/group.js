const {db} = require('../config/setup.js');

class Group {
  constructor(name) {
    this.id = id;
    this.name = name;
  }

  static add(name, address, email, phone, callback) {
    let query = `INSERT INTO Groups VALUES (NULL, ?)`;
    let group = new Group(name);
    db.run(query, [name], (err) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback(group);
      }
    })
  }

  static update(id, name) {
    let query = `UPDATE Groups SET
      name = ?
      WHERE id = ?
    `;
    let Group = new Group(id, name);
    db.run(query, [], (err) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback(Group);
      }
    })
  }

  static delete(id, callback) {
    let query = `DELETE FROM Groups WHERE id = ?`;
    db.run(query, [id], (err) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback('Delete data successfull!');
      }
    })
  }

  static show(callback) {
    let query = `SELECT * FROM Groups`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback(data);
      }
    })
  }
}
