const argv = process.argv
const Setup = require('./setup')
const ContactController = require('./controller/ContactController');
const HelpController = require('./controller/HelpController');

switch (argv[2]) {
  case undefined :
    HelpController.retriveHelp();
    break;
  case 'setup':
    Setup.createTable();
    break;
  case 'uploadData' :
    Setup.uploadTable();
    break;
  case 'addContact':
    ContactController.tambahKontak(argv[3], argv[4]);
    break;
  case 'deleteContact':
    ContactController.hapusKontak(argv[3]);
    break;
  default:
    HelpController.retriveHelp();
}
