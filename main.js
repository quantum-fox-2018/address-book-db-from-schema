var fs = require('fs')
var Controller = require('./controller.js')

var argv = process.argv
var command = argv[2];

if(command === 'addContact') {
  Controller.addContact(argv[3], argv[4], argv[5]);
} else if(command === 'updateContact') {
  Controller.updateContact(argv[3], argv[4], argv[5], argv[6]);
} else if(command === 'showList') {
  Controller.viewListContact();
} else if(command === 'delete') {
  Controller.deleteContact(argv[3], argv[4]);
} else if(command === 'addGroup') {
  Controller.addGroup(argv[3]);
} else if(command === 'showGroupList') {
  Controller.showGroups();
} else if(command === 'updateGroup') {
  Controller.groupUpdate(argv[3], argv[4], argv[5], argv[6]);
} else if(command === 'addMemberToGroup') {
  Controller.addContactToGroup(argv[3], argv[4]);
} else if(command === 'deleteGroup') {
  Controller.deleteGroupFromGroups(argv[3]);
  Controller.deleteGroupFromContactGroups(argv[3]);
}
