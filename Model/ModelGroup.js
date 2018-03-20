const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class ModelGroup {
  constructor(objGroup = {}) {
    this.id = null;
    this.name = objGroup.name;
  }

  static listGroup(callback) {
    db.all(`SELECT * FROM groups`, (err, datas) => {
      if(err) console.log(err);
      callback(datas);
    });
  }

  addGroup(callback) {
    let thisModel = this;
    db.run(`INSERT INTO groups VALUES (NULL, '${this.name}')`, function() {
      thisModel.id = this.lastID;
      callback(thisModel.name);
    });
  }

  updateGroup() {

  }

  updateData(objUpdate, callback) {
    let key = Object.keys(objUpdate);
    for(let i in key) {
      this[key[i]] = objUpdate[key[i]];
    }
    db.run(`UPDATE groups SET name = '${this.name}' WHERE id = ${this.id}`);
    callback(this.name);
  }

  findById(id, callback) {
    let thisModel = this;
    db.each(`SELECT * FROM groups WHERE id = ${id}`, (err, data) => {
      if(err) console.log(err);
      thisModel.id = data.id;
      thisModel.name = data.name;
      thisModel.phone_number = data.phone_number;
      callback();
    });
  }

  deleteGroup(callback) {
    let thisModel = this;
    db.run(`DELETE FROM groups WHERE id = ${thisModel.id}`);
    db.close();
    callback(thisModel.name);
  }
}

module.exports = ModelGroup;
