const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

const Contact = require('./contact.js')
const Group = require('./group.js')
const GroupContact = require('./contact-group.js')

class Model {
  static readData(input,callback){
    if(input=='contacts' || input=='contact'){
      db.all(`SELECT * FROM Contacts`,function(err,contactsData){
        if (err) throw err
        callback(input,contactsData)
      })
    } else if(input=='groups' || input=='group'){
      db.all(`SELECT * FROM Groups`,function(err,groupsData){
        if (err) throw err
        callback(input,groupsData)
      })
    }
  }

  static insertData(input,callback){
    if(input[0]=='contact' || input[0]=='contacts'){
      let newContact = new Contact(input[1],input[2],input[3],input[4])
      newContact.save()
    } else if(input[0]=='groups' || input[0]=='group'){
      let newGroup = new Group(input[1])
      newGroup.save()
    }
    callback(input[0])
  }

  static updateData(input,callback){
    if(input[0]=='contact' || input[0]=='contacts'){
      Contact.update(input)
    } else if(input[0]=='groups' || input[0]=='group'){
      Group.update(input)
    }
    callback(input[0],input[1])
  }

  static deleteData(input,callback){
    if(input[0]=='contact' || input[0]=='contacts'){
      Contact.delete(input)
    } else if(input[0]=='groups' || input[0]=='group'){
      Group.delete(input)
    } else if(input[0]=='groupcontacts' || input[0]=='groupcontact'){
      GroupContact.delete(input)
    }
    callback(input[0],input[1])
  }

  static assign(input,callback){
    GroupContact.assign(input)
    callback(input[0],input[2])
  }
}

module.exports = Model
