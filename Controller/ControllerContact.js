const ModelContact = require('../Model/ModelContact.js');
const ViewContact = require('../View/ViewContact.js');

class ControllerContact {
  static listContact() {
    ModelContact.listContact(ViewContact.listContact);
  }

  static addContact(attributesContact) {
    let newContact = new ModelContact(attributesContact);
    newContact.addContact(ViewContact.addContact);
  }

  static updateContact(id, objUpdate) {
    let newContact = new ModelContact();
    newContact.findById(id, function() {
      newContact.updateData(objUpdate, ViewContact.updateContact);
    });
  }

  static deleteContact(id) {
    let newContact = new ModelContact();
    newContact.findById(id, function() {
      newContact.deleteContact(ViewContact.deleteContact);
    });
  }
}

module.exports = ControllerContact;
