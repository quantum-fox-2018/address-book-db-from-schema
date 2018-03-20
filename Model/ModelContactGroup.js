const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class ModelContactGroup {
  constructor(objContactGroup = {}) {
    this.id = null;
    this.contact_id = objContactGroup.contact_id;
    this.group_id = objContactGroup.group_id;
  }

  static listContactGroup(callback) {
    db.all(`SELECT cg.id, g.name as "group", c.name as "member" FROM contact_groups cg JOIN contacts c ON cg.contact_id = c.id JOIN groups g ON cg.group_id = g.id`, (err, datas) => {
      if(err) console.log(err);
      callback(datas);
    });
  }

  addContactGroup(callback) {
    let thisModel = this;
    db.run(`INSERT INTO contact_groups VALUES (NULL, ${this.contact_id}, ${this.group_id})`, function() {
      thisModel.id = this.lastID;
      callback(thisModel.contact_id);
    });
  }

  updateData(objUpdate, callback) {
    let key = Object.keys(objUpdate);
    for(let i in key) {
      this[key[i]] = objUpdate[key[i]];
    }
    db.run(`UPDATE contact_groups SET contact_id = '${this.contact_id}', group_id = '${this.group_id}' WHERE id = ${this.id}`);
    callback(this.name);
  }

  findById(id, callback) {
    let thisModel = this;
    db.each(`SELECT * FROM contact_groups WHERE id = ${id}`, (err, data) => {
      if(err) console.log(err);
      thisModel.id = data.id;
      thisModel.contact_id = data.contact_id;
      thisModel.group_id = data.group_id;
      callback();
    });
  }

  deleteContactGroup(callback) {
    let thisModel = this;
    db.run(`DELETE FROM contact_groups WHERE id = ${thisModel.id}`);
    db.close();
    callback(thisModel.id);
  }
}

module.exports = ModelContactGroup;
