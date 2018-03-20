/*jshint esversion:6*/

const Controller = require('./controller/controller.js');
const Database = require('./setup.js');
const argv = process.argv;

switch (argv[2]) {
  case 'setup':
    Database.setup();

    break;
  case 'upload':
    Database.uploadData();

    break;
  case 'addContact':
    Controller.addContact(argv[3], argv[4], argv[5], argv[6]);

    break;
  case 'updateContact':
    Controller.updateContact(argv[3], argv[4], argv[5], argv[6], argv[7]);

    break;
  case 'deleteContact':
    Controller.deleteContact(argv[3]);

    break;
    //===
    case 'addGroup':
      Controller.addGroup(argv[3]);

      break;
    case 'updateGroup':
      Controller.updateGroup(argv[3], argv[4]);

      break;
    case 'deleteGroup':
      Controller.deleteGroup(argv[3]);

      break;
  case 'addGroupContact':
    Controller.addGroupContact(argv[3], argv[4]);

    break;
    case 'showContact':
      Controller.showContact();

      break;
}
