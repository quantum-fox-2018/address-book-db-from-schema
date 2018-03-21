const argv = process.argv;
const Controller = require('./controller.js').Controller;

switch (argv[2]) {
  case "setup": Controller.setup();break;
  case "save": let new_contact = JSON.parse(argv[3]); Controller.save(new_contact);break;
  case "show": Controller.show();break;
  case "update": Controller.update(argv[3],argv[4],argv[5]);break;
  case "createGroup": Controller.createGroup(argv[3]);break;
  case "addContact": Controller.addGroup(argv[3],argv[4]);break;
  case "updateGroup": Controller.updateGroup(argv[3],argv[4]);break;
  case "deleteGroup": Controller.deleteGroup(argv[3]);break;

  default:

}
