const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class Group {
  static listGroup(cb){
    db.all("SELECT * FROM groups", (err, rows) => {
      if(err){
        cb(err)
      }else{
        cb(rows)
      }
    });
  }

  static save(groupName, cb){
    let createContact = `INSERT INTO groups (id, group_name) VALUES (Null, ?);`
    db.run(createContact, groupName, (err) =>{
      cb(err);
    });
    db.close()

  }

  static edit(updContact,cb){
    let updateData = "UPDATE groups SET group_name = ? WHERE id = ?";
    db.run(updateData, [updContact[0], updContact[1]], (err)=>{
        cb(err)
    });
  }

  static delete(idGroup, cb){
    let deletedata = "DELETE FROM groups WHERE id = ?;";
    db.run(deletedata, idGroup, (err) => {
      cb(err)
    })
    db.run("DELETE FROM contact_groups WHERE groupId = ?",idGroup);
  }

}

module.exports = Group;
