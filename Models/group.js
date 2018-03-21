var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');
const Contact_Group = require('../contact-group.js').Contact_Group;

class Group {

  constructor(name){
    this.name = name;
  }

  create(cbTotalGroups){

    let createQuery = `INSERT INTO groups (id, groupName) VALUES (NULL, ?)`;
    db.run(createQuery, this.name,function (err) {
      if(err){
        cbTotalGroups(err);
      }
      else{
        let selectQuery = `SELECT groupName FROM groups`;
        db.all(selectQuery, function (err,Groups) {
          cbTotalGroups(Groups)
        })
      }
    });
  }

  static search(group_name,cbGetId){

    let searchQuery = `SELECT id FROM groups WHERE groupName = ?`;
    db.all(searchQuery, group_name ,function(err,searchId){
      cbGetId(searchId);
    })

  }

  addContact(contact_id, cbAddedData){

    let group_name = this.name
    Group.search(group_name, function(groupObj){
      let addContactQuery = `INSERT INTO group_contacts (id,groupId,contactId) VALUES (NULL,?,?)`;
      db.run(addContactQuery,groupObj[0].id,contact_id,function (err){
        if(err){
          let message = false;
          cbAddedData(message);
        }
        else{
          let selectQuery = `SELECT name FROM contacts LEFT JOIN group_contacts ON contacts.id = group_contacts.contactId WHERE contacts.id = ?`;
          db.all(selectQuery, contact_id, function(err,addedNameObj){
            let message = true;
              let addedName = addedNameObj[0].name;
              cbAddedData(true, addedName);
          })
        }
      });
    })
  }

  //tinggal view untuk nampilin yang error belom berhasil
  update(contact_id, cbUpdatedData){
    let groupName = this.name;
    Group.search(groupName, function(getIdObj){
      let queryUpdate = `UPDATE group_contacts SET groupId = ? WHERE contactId = ?`;
      db.run(queryUpdate, getIdObj[0].id, contact_id,function(err){

        if(err == null){
          let errorMsg = `Contacts ID or Groups Name are wrong`
          cbUpdatedData(errorMsg)
        }
        else{
          let message = `Data has been updated`;
          cbUpdatedData(message)
        }
      })
    })
  }

  delete(cbDeleteData){

    let group_name = this.name;
    Group.search(group_name,function(getObjId){

      let getId = getObjId[0].id;
      let deleteQueryGroup = `DELETE FROM groups WHERE id = ?`;
      let deleteQueryMember = `DELETE FROM group_contacts WHERE groupId = ?`
      db.run(deleteQueryMember,getId,function(err){
        if(err){
          let messageWrong1 = `Wrong input`;
          cbDeleteData(messageWrong1);
        }
        else{
          db.run(deleteQueryGroup,getId,function(err){
            if(err){
              let messageWrong2 = `Wrong input`;
              cbDeleteData(messageWrong2)
            }
            else{
              let message = "A group has been deleted from address book";
              cbDeleteData(message);
            }
          })
        }
      })

    })
  }
}

module.exports = {Group:Group};
