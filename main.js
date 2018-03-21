const argv = process.argv
const Setup = require('./setup')
const ContactController = require('./controller/ContactController');
const HelpController = require('./controller/HelpController');

switch (argv[2]) {
  case undefined :
    HelpController.retriveHelp();break;
  case 'setup':
    Setup.createTable();break;
  case 'uploadData' :
    Setup.uploadTable();break;
  case 'addContact':
    if(argv[3] === undefined || argv[4] === undefined){
      console.log(`name atau phone number tidak boleh kosong...!`);
    }
    else {
      ContactController.tambahKontak(argv[3], argv[4]);
    }
    break;
  case 'deleteContact':
    ContactController.hapusKontak(argv[3]);break;
  case 'showContact':
    ContactController.tampilkanKontak();break;
  case 'updateContact':
    ContactController.rubahKontak(argv[4],argv[5],argv[3]);break
  default:
    HelpController.retriveHelp();
}
