var fs = require('fs')
var Controller = require('./controller.js')

var argv = process.argv
var command = argv[2];

if(command === 'addContact') {
  Controller.addContact(argv[3], argv[4], argv[5]);
} else if(command === 'updateContact') {
  Controller.updateContact(argv[3], argv[4], argv[5], argv[6]);
} else if(command === 'showList') {
  Controller.viewList();
} else if(command === 'delete') {
  Controller.deleteContact(argv[3])
}
