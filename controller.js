const Contact = require('./Model/contact');
const Group = require('./Model/group');
const ContactGroup = require('./Model/contact-group.js');
const View = require('./view');
var dataContact;

class Controller {

  static listContact(){
    Contact.listContact(View.contact);
  }

  static addContact(data){
    dataContact = data.split(",");
    // console.log(dataContact);
    Contact.save(dataContact, View.saveContact)
  }

  static updateContact(data){
    dataContact = data.split(",");
    Contact.edit(dataContact, View.editContact)
  }

  static deleteContact(id){
    Contact.delete(id, View.deleteContact)
  }

////////////////////////////

  static listGroup(){
    Group.listGroup(View.listGroup);
  }

  static addGroup(data){
    // console.log(dataContact);
    Group.save(data, View.saveGroup)
  }

  static updateGroup(data){
    let dataGroup = data.split(",");
    Group.edit(dataGroup, View.editGroup)
  }

  static deleteGroup(id){
    Group.delete(id, View.deleteGroup)
  }

/////////////////////////////

  static readContactGroup(idGroup){
    let idInput = idGroup.split()
    ContactGroup.read(idInput, View.readContactGroup)
  }
  static addContactGroup(idInput){
    let input = idInput.split(",")
    ContactGroup.add(input, View.addContactGroup)
  }

  static deleteContactGroup(idDelete){
    let id = idDelete.split(",")
    ContactGroup.delete(id, View.deleteContactGroup)
  }
}

module.exports = Controller;
