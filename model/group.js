const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class Group{
  static saveTableGroups(callback){
      db.run(`CREATE TABLE IF NOT EXISTS groups(
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name VARCHAR
        );`,(err)=>{
          if(err){
            callback('table sudah dibuat')
          }else{
            callback('table created successfully')
          }
        });
  }
  static saveAddGroup(name,callback){
      db.run(`INSERT INTO groups(name)
              VALUES ('${name}'
        );`,(err)=>{
          if(err){
            callback('group gagal diinput')
          }else{
            callback('group berhasil diinput')
          }
        });
  }
  static saveUpdateGroup(name,id,callback){
      db.run(`UPDATE groups SET
              name = '${name}'
              WHERE id = '${id}'`,
              (err)=>{
                if(err){
                  callback('group gagal diupdate')
                }else{
                  callback('group berhasil diupdate')
                }
              });
  }
  static deletGroupDB(id){
      db.run(`DELETE FROM groups
            WHERE
            id = '${id}';`,(err) => {
              if(err){
                callback('group gagal dihapus')
              }else{
                db.run(`DELETE FROM contacts_group
                      WHERE
                      groupId = '${id}';`,(err)=>{
                        if(err){
                          callback('group berhasil dihapus tapi contact masih ke-asign')
                        }else{
                          callback('group berhasil dihapus')
                        }
                      });
              }
            });
  }
}
db.close();
module.exports = Group
