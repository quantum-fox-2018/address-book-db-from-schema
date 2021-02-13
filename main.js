const controller = require('./controller')
//console.log('hh');
let argv = process.argv

switch (argv[2]) {
  case 'createTableContacts':
    controller.createTableContacts()
    break;
  case 'insertContact':
    controller.insertContact(argv[3],argv[4],argv[5],argv[6])
    break;
  case 'updateContact':
    controller.updateContact(argv[3],argv[4],argv[5],argv[6],argv[7])
    break;
  case 'deleteContact':
    controller.deleteContact(argv[3])
    break;
  case 'createTableGroup':
    controller.createTableGroup()
    break;
  case 'insertGroup':
    controller.insertGroup(argv[3])
    break;
  case 'updateGroup':
    controller.updateGroup(argv[3],argv[4])
    break;
  case 'deleteGroup':
    controller.deleteGroup(argv[3])
    break;
  case 'createTableConj':
    controller.createTableConj()
    break;
  case 'insertContactToGroup':
    controller.insertContactToGroup(argv[3],argv[4])
    break;
  case 'deletContactFromGroup':
    controller.deletContactFromGroup(argv[3],argv[4])
    break;
  case 'show':
    controller.show()
    break;
}
