const contact = require('./model/contact')
const group = require('./model/group.js')
const contactGroup = require('./model/contact-group.js')
const view = require('./view.js')
class Controller {
  static createTableContacts(){
      contact.saveTableContacts(resultTable => {
        view.print(resultTable)
      })

  }
  static insertContact(name, address, phone, email,call){
      var valueInsert = contact.saveContact(name, address, phone, email, statInsert =>{
        view.print(statInsert)
      })

  }
  static updateContact(name, address, phone, email,id){
      contact.saveUpdateContact(name, address, phone, email,id,statUpdate=>{
        view.print(statUpdate)
      })
  }
  static deleteContact(id){
      contact.deleteContactDB(id,statDel=>{
        view.print(statDel)
      })
  }
  static createTableGroup(){
      group.saveTableGroups(statTableGroup=>{
        view.print(statTableGroup)
      })
  }
  static insertGroups(name){
      group.saveAddGroup(name, statInsert=>{
        view.print(statInsert)
      })
  }
  static updateGroup(name,id){
      group.saveUpdateGroup(name,id, statUpdateGroup=>{
        view.print(statUpdateGroup)
      })
  }
  static deleteGroup(id){
      group.deletGroupDB(id, statDel=>{
        view.print(statDel)
      })
  }
  static createTableConj(){
      contactGroup.saveTableConj(statCreateContactToGroup=>{
        view.print(statCreateContactToGroup)
      })
  }
  static insertContactToGroup(contactId, groupId){
      contactGroup.saveContactToGroup(contactId, groupId,statInConGroup=>{
        view.print(statCreateContactToGroup)
      })
  }
  static deletContactFromGroup(contactId, groupId){
      contactGroup.removeContactFromGroup(contactId, groupId,statDelet =>{
        view.print(statDelet)
      })
  }
  static show(){
    contactGroup.getList(listContact=>{
        view.print(listContact)
    })
  }
}

module.exports = Controller
