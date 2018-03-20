const Controller = require('./controller.js');

const argv = process.argv;
const command = argv[2];

let id;
let name;
let address;
let phone_number;
let email;
let column_name;
let update_value;

switch(command){

  case 'createContact':
    name = argv[3];
    address = argv[4];
    phone_number = argv[5];
    email = argv[6];

    Controller.createContact(name, address, phone_number, email);
    break;

  case 'createGroup':
    name = argv[3];

    Controller.createGroup(name);
    break;

  case 'updateContact':
    phone_number = argv[3];
    column_name = argv[4];
    update_value = argv[5];

    Controller.updateContact(phone_number, column_name, update_value);
    break;
  case 'updateGroup':
    name = argv[3];
    column_name = argv[4];
    update_value = argv[5];

    Controller.updateGroup(name, column_name, update_value);
    break;
  case 'deleteContact':
    phone_number = argv[3];

    Controller.deleteContact(phone_number);
    break;
  case 'deleteGroup':
    name = argv[3];

    Controller.deleteGroup(name);
    break;
  case 'addToGroup':
    phone_number = argv[3];
    name = argv[4];

    Controller.addToGroup(phone_number, name);
    break;
  case 'showContact':

    Controller.showContact();
    break;
  case 'showGroup':

    Controller.showGroup();
    break;
}
