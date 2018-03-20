const View = require('../view/view.js');
const Contact = require('../model/contact.js');
const Group = require('../model/group.js');
const {Database} = require('../config/setup.js');

class Controller {
  static menu(input) {
    let command = input[2];

    switch (command) {
      case 'setup':
        Database.setup(result => {
          View.setupDbSuccess(result);
        })
        break;

      case 'addContact':
        Contact.add(input[3], input[4], input[5], input[6], data => {
          View.addContactSuccess(data);
        })
        break;

      case 'updateContact':
        Contact.update(input[3], input[4], input[5], input[6], input[7], data => {
          View.updateContactSuccess(data);
        })
        break;

      case 'deleteContact':
        Contact.delete(input[3], result => {
          View.deleteContactSuccess(result);
        })
        break;

      case 'showContacts':
        Contact.show(data => {
          View.showContacts(data);
        })
        break;
      default:

    }
  }
}

module.exports = Controller;
