const argv = process.argv;
const Controller = require('./controller.js').Controller;

switch (argv[2]) {
  case "setup": Controller.setup();break;
  case "save": Controller.save(argv[3]);break;
  case "show": Controller.show();break;
  case "update": Controller.update(argv[3],argv[4],argv[5]);break;
  case "createGroup": Controller.createGroup(argv[3]);break;
  case "addContact": Controller.addContact(argv[3],argv[4]);break;
  default:

}
