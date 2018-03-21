const contact = require('./model/contact.js')
const group = require('./model/group.js')
const contactGroup = require('./model/contact-group.js')
const view = require('./view.js')
class Controller {
  static createTableContacts(){
      contact.saveTableContacts()
  }
  static insertContact(name, address, phone, email){
      var valueInsert = contact.saveContact(name, address, phone, email)
      if(valueInsert !== undefined){
          view.print(valueInsert)
      }
  }
  static updateContact(name, address, phone, email,id){
      contact.saveUpdateContact(name, address, phone, email,id)
  }
  static deleteContact(id){
      contact.deleteContactDB(id)
  }
  static createTableGroup(){
      group.saveTableGroups()
  }
  static insertGroups(name){
      group.saveAddGroup(name)
  }
  static updateGroup(name,id){
      group.saveUpdateGroup()
  }
  static deleteGroup(id){
      group.deletGroupDB(id)
  }
  static createTableConj(){
      model.saveTableConj()
  }
  static insertContactToGroup(contactId, groupId){
      model.saveContactToGroup(contactId, groupId)
  }
}




module.exports = Controller
