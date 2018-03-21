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
    ContactController.cekTambahKontak(argv[3],argv[4]);break;
  case 'deleteContact':
    ContactController.hapusKontak(argv[3]);break;
  case 'showContact':
    ContactController.tampilkanKontak();break;
  case 'updateContact':
    ContactController.rubahKontak(argv[4],argv[5],argv[3]);break;
  case 'showGroup':
    ContactController.tampilkanGrup();break;
  case 'assignContactToGroup':
    let ContactName = argv[3]
    let GroupName = argv.slice(4,6).join(' ')
    ContactController.tambahKontakKeGrup(ContactName,GroupName)
    // console.log(`${ContactName} ${GroupName}`)
    break;
  default:
    HelpController.retriveHelp();
}
// comment biar bisa ke push
