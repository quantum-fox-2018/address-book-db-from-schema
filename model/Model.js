const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('address_book.db')

const Contact = require('./contact.js')
const Group = require('./group.js')
const GroupContact = require('./contact-group.js')

class Model {
  static checkEmail(input){
    let newFormat = input.split('')
    let atPosition = newFormat.indexOf('@')
    let dotPosition = newFormat.indexOf('.')
    if(atPosition>0 && dotPosition>atPosition+1){
      return true
    } else {
      return false
    }
  }

  static readData(input,callback){
    if(input=='contacts' || input=='contact'){
      db.all(`SELECT Contacts.id,
        Contacts.name AS contactName,
        Contacts.address,
        Contacts.phoneNumber,
        Contacts.email,
        Groups.name AS groupName
        FROM Contacts
        JOIN GroupContacts
          ON Contacts.id = GroupContacts.contactId
        JOIN Groups
          ON GroupContacts.groupId = Groups.id`,function(err,contactsData){
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
    let status = false
    let check = Model.checkEmail(input[4])
    if(input[0]=='contact' || input[0]=='contacts'){
      if(input[3].length>12 || check==false){
        callback(status,input[0])
      } else {
        let newContact = new Contact(input[1],input[2],input[3],input[4])
        newContact.save()
        status = true
        callback(status,input[0])
      }
    } else if(input[0]=='groups' || input[0]=='group'){
      let newGroup = new Group(input[1])
      newGroup.save()
      status = true
      callback(status,input[0])
    }
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
