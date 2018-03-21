const ModelGroup = require('../Model/ModelGroup.js');
const ModelContact = require('../Model/ModelContact.js');
const ViewGroup = require('../View/ViewGroup.js');

class ControllerGroup {
  static listGroup() {
    ModelGroup.listGroup(ViewGroup.listGroup);
  }

  static listContactGroup(id) {
    let group = new ModelGroup();
    //group.contacts
    group.findById(id, function() {
      ViewGroup.listContactGroup(group);
    });
  }

  // get contacts(){
  //   this.findById(this.id, (){
  //     ViewGroup.listContactGroup(this)
  //   })
  // }

  // let group = Group.findById(1)
  // group.contacts

  static addGroup(attributesGroup) {
    let group = new ModelGroup(attributesGroup);
    group.save();
    ViewGroup.addGroup(group);
  }

  static updateGroup(id, objUpdate) {
    let group = new ModelGroup();
    group.findById(id, function() {
      group.updateData(objUpdate, ViewGroup.updateGroup);
    });
  }

  static addContactToGroup(idGroup, idContact) {
    let group = new ModelGroup();
    group.findById(idGroup, function() {
      let contact = new ModelContact();
      contact.findById(idContact, function() {
        group.addContact(contact);
      });
    });
    ViewGroup.addContact();
  }

  static deleteContactFromGroup(idGroup, idContact) {
    let group = new ModelGroup();
    group.findById(idGroup, function() {
      let contact = new ModelContact();
      contact.findById(idContact, function() {
        group.deleteContact(contact);
      });
    });
    ViewGroup.removeContact();
  }

  static deleteGroup(id) {
    let group = new ModelGroup();
    group.findById(id, function() {
      group.deleteGroup(ViewGroup.deleteGroup);
    });
  }
}

module.exports = ControllerGroup;
