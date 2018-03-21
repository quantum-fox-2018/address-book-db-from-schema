const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');
class ContactsGroup{
  static saveTableConj(){
      db.run(`CREATE TABLE IF NOT EXISTS contacts_group (
                contactId INTEGER NOT NULL ,
                groupId INTEGER NOT NULL,
                FOREIGN KEY(contactId) REFERENCES contacts(Id),
                FOREIGN KEY(groupId) REFERENCES groups(Id)
              );`);
  }
  static saveContactToGroup(contactId, groupId,callback){
      db.run(`INSERT INTO contacts_group(contactId, groupId)
              VALUES ('${contactId}', '${groupId}'
        );`,(err)=>{
          if(err){
            callback('gagal register contact ke group')
          }else{
            callback('contack berhasil diinput ke group')
          }
        });
  }
  static removeContactFromGroup(contactId,groupId,callback){
    db.run(`DELETE FROM contacts_group
            where contacts_group.contactId = 6
            AND contacts_group.groupId = 3;`,(err)=>{
              if(err){
                callback('gagal add contact ke group')
              }else{
                callback('contact berhasil di add ke group')
              }
            })
  }
  static getList(callback){
    db.all(`SELECT contacts.id,contacts.name, contacts.address,contacts.phone,contacts.email,groups.name AS groupName
            FROM contacts
            LEFT JOIN contacts_group
            ON contacts_group.contactId = contacts.id
            LEFT JOIN groups
            ON contacts_group.groupId = groups.id`,(err,dataList)=>{
              if(err){
                callback(err)
              }else{
                console.log('test output', dataList)
                callback(dataList)
              }
            })
  }
}
// db.close();
module.exports = ContactsGroup
