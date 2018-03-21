const model = require('./model.js');
const Contacts = model.Contacts
const ContactGroups = model.ContactGroups
const Groups = model.Groups
const View = require('./view.js');


class Controller {
  constructor() {

  }

  static processData(command, input){

    switch (command) {
      case 'showContact': {Contacts.showData(input, View.show); break;}
      case 'addContact': {Contacts.addContact(input, View.show); break;}
      case 'updateContact': {Contacts.updateData(input, View.show); break;}
      case 'deleteContact': {Contacts.deleteData(input, View.show); break;}
      case 'showDataGroups': {ContactGroups.showDataGroups(input, View.show); break;}
      case 'insertToGroup': {ContactGroups.insertToGroup(input, View.show); break;}
      case 'updateContactGroups': {ContactGroups.updateContactGroups(input, View.show); break;}
      case 'deleteContactGroups': {ContactGroups.deleteContactGroups(input, View.show); break;}
      case 'showGroups': {Groups.showGroups(input, View.show); break;}
      case 'addNewGroup': {Groups.addNewGroup(input, View.show); break;}
      case 'updateGroup': {Groups.updateGroup(input, View.show); break;}
      case 'deleteGroup': {Groups.deleteGroup(input, View.show); break;}

      default: {View.show(`

CREATE    # addContact           =>  'name' 'phone' 'email' 'address'
          # addNewGroup          =>  'GroupName'
          # insertToGroup        =>  'contactId' 'groupId'

READ      # showContact          =>  null || 'id'
          # showDataGroups       =>  null || 'id'
          # showGroups           =>  null || 'id'

UPDATE    # updateContact        =>  'contact id' 'columnName' 'updateTo'
          # updateContactGroups  =>  'id' 'contactId' 'groupId'
          # updateGroup          =>  'id' 'updateTo'

DELETE    # deleteContact        =>  'id'
          # deleteContactGroups  =>  'id'
          # deleteGroup          =>  'id'

      `)}

    }

  }

}



module.exports = Controller;
