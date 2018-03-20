const Database = require('../setup.js');
const database = new Database('Address Book');
const db = database.db;

class Group{
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.queryInsertNewGroup = 'INSERT INTO groups VALUES (null, ${this.name})';
    this.queryUpdateGroup = `UPDATE groups SET `;
    this.queryDeleteGroup = `DELETE FROM groups WHERE name = ${this.name}`;
    this.queryGetGroupId = `SELECT id FROM groups WHERE name = ${this.name}`;
  }

  createNewGroup(callback){
    db.run(this.queryInsertNewGroup, (err)=>{
      (err) ? callback(true) : callback(false);
    });
  }

  updateGroupByName(name, column_name, update_value, callback){
    let query = this.queryUpdateGroup + `${column_name} = "${update_value}" WHERE name = ${name}`;

    db.run(query, (err)=>{
      (err) ? callback(true) : callback(false);
    });
  }

  deleteGroupByName(callback){
    db.run(this.queryDeleteGroup, (err)=>{
      (err) ? callback(true) : callback(false);
    });
  }

  addToGroup(contact, callback){
    contact.getContactIdByPhone((err, data)=>{
      if(err){
        callback(true);
        return;
      }
      let contact_id = data.id;
      db.get(queryGetGroupId,(err, data)=>{
        
      });
    });
  }

  showAllGroup(callback){

  }
}

module.exports = Group;
