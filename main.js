const ControllerContact = require('./Controller/Controller_Contact.js');
const ControllerGroup = require('./Controller/Controller_Group.js');
const ControllerContactGroup = require('./Controller/Controller_ContactGroup.js');

let input = process.argv;
let command = input[2];
// Controller.menu(input);
switch (command) {
  // CONTACT
  case 'addContact':
    ControllerContact.add(input[3], input[4], input[5], input[6]);
    break;
  case 'updateContact':
    ControllerContact.update(input[3], input[4], input[5], input[6], input[7]);
    break;
  case 'deleteContact':
    ControllerContact.delete(input[3]);
    break;
  case 'showContacts':
    ControllerContact.show();
    break;

  // GROUP
  case 'addGroup':
    ControllerGroup.add(input[3]);
    break;
  case 'updateGroup':
    ControllerGroup.update(input[3], input[4]);
    break;
  case 'deleteGroup':
    ControllerGroup.delete(input[3]);
    break;
  case 'showGroups':
    ControllerGroup.show();
    break;

  // CONTACT-GROUP
  case 'addToGroup':
    ControllerContactGroup.add(input[3], input[4]);
    break;
  case 'deleteFromGroup':
    ControllerContactGroup.delete(input[3], input[4]);
    break;
  case 'showContactGroups':
    ControllerContactGroup.show();
    break;

  default:
}
