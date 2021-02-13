const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class Contact{
  static saveTableContacts(callback){
      db.run(`CREATE TABLE IF NOT EXISTS contacts(
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name VARCHAR,
          address VARCHAR,
          phone VARCHAR,
          email VARCHAR
        );`,(err)=>{
          if(err){
            callback('tabel sudah dibuat');
          }else{
            callback('table contact created successfully')
          }
      });
  }
  static saveContact(name, address, phone, email,callback){
    let angka = '0123456789'
    if(phone.length > 17){
      callback('maksimal phone 17 digit')
    }
    for(let i = 0; i < phone.length;i++){
        let checker = 0
        for(let j = 0; j < angka.length;j++){
          if(phone[i] === angka[j]){
            checker++
          }
        }
        if(checker === 0){
            callback('input phone salah')
        }
    }
      db.run(`INSERT INTO contacts(name, address, phone, email)
              VALUES('${name}','${address}','${phone}','${email}');`,
              (err)=>{
                if(err){
                  callback('data gagal diinput')
                }else{
                  callback('data berhasil diinput')
                }
              }
      );
  }
  static saveupdateContact(name, address, phone, email,id, callback){
      db.run(`UPDATE contacts SET
              name = '${name}',
              address = '${address}',
              phone = '${phone}',
              email = '${email}'
              WHERE id = '${id}'`,(err)=>{
                if(err){
                  callback('data gagal diupdate')
                }else{
                  callback('data berhasil diupdate')
                }
              });
  }
  static deleteContactDB(id){
      db.run(`DELETE FROM contacts
            WHERE
            id = '${id}';`,(err)=>{
              if(err){
                callback('data gagal dihapus')
              }else{
                callback('data berhasil dihapus')
              }
            });
  }
}
db.close();
module.exports = Contact
