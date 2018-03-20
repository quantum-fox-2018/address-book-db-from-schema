const Contact = require('./Model/contact.js');
const Group = require('./Model/group.js');
const ContactGroup = require('./Model/contact-group.js');
const View = require('./view.js');

class Controller{
  static createContact(name, address, phone_number, email){
    let contact = new Contact(null, name, address, phone_number, email);
    contact.createNewContact((err)=>{
      (!err) ? View.showSuccess('createContact') : View.showFail('createContact');
    });
  }

  static createGroup(name){
    let group = new Group(null, name);
    group.createNewGroup((err)=>{
      (!err) ? View.showSuccess('createGroup') : View.showFail('createGroup');
    });
  }

  static updateContact(phone_number, column_name, update_value){
    let contact = new Contact();
    contact.updateContactByPhone(phone_number, column_name, update_value, (err)=>{
      (!err) ? View.showSuccess('updateContact') : View.showFail('updateContact');
    });
  }

  static updateGroup(name, column_name, update_value){
    let group = new Group();
    group.updateGroupByName(name, column_name, update_value, (err)=>{
      (!err) ? View.showSuccess('updateGroup') : View.showFail('updateGroup');
    });
  }

  static deleteContact(phone_number){
    let contact = new Contact(null, null, null, phone_number);
    contact.deleteContactByPhone((err)=>{
      (!err) ? View.showSuccess('deleteContact') : View.showFail('deleteContact');
    });
  }

  static deleteGroup(name){
    let group = new Group(null, name);
    group.deleteGroupByName((err)=>{
      (!err) ? View.showSuccess('deleteGroup') : View.showFail('deleteGroup');
    });
  }

  static addToGroup(phone_number, name){
    let group = new Group(null, name);
    let contact = new Contact(null, null, null, phone_number);
    group.addToGroup(contact, (err)=>{
      (!err) ? View.showSuccess('addToGroup') : View.showFail('addToGroup');
    });
  }

  static showContact(){
    let contact = new Contact();
    contact.showAllContact((err)=>{
      (!err) ? View.showSuccess('showContact') : View.showFail('showContact');
    });
  }

  static showGroup(){
    let group = new Group();
    group.showAllGroup((err)=>{
      (!err) ? View.showSuccess('showGroup') : View.showFail('showGroup');
    });
  }
}

module.exports = Controller;
