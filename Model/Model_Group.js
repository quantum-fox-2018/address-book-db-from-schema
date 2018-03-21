const {db} = require('../Config/Setup.js');

class Group {
  constructor(name) {
    this.id      = null;
    this.name    = name;
  }

  static add(prop, callback) {
    let query = `INSERT INTO Groups VALUES (NULL, ?)`;

    db.run(query, [prop.name], function(err) {
      if (err) {
        console.log(`${err}`);
      } else {
        prop.id = this.lastID;
        callback(prop);
      }
    });
  }

  static update(id, prop, callback) {
    Group.checkID(id, checkResult => {
      if (checkResult == true) {
        let query = `UPDATE Groups name = WHERE id = ?`;
        db.run(query, [prop.name, id], (err) => {
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
    Group.checkID(id, checkResult => {
      if (checkResult == true) {
        let query = `DELETE FROM Groups WHERE id = ?`;
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
    let query = `SELECT id FROM Groups WHERE id = ?`;
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
    let query = `SELECT * FROM Groups`;
    db.all(query, (err, data) => {
      if (err) {
        console.log(`${err}`);
      } else {
        callback(data);
      }
    });
  }
}

module.exports = Group
