const Controller = require('./controller');
const argv= process.argv;

switch (argv[2]) {
  case 'addContact':
    Controller.addContact(argv[3])
    break;

  case 'listContact':
    Controller.listContact()
    break;

  case 'updateContact':
    Controller.updateContact(argv[3])
    break;

  case 'deleteContact':
    Controller.deleteContact(argv[3])
    break;

///////////////////////

  case 'addGroup':
    Controller.addGroup(argv[3])
    break;

  case 'listGroup':
    Controller.listGroup()
    break;

  case 'updateGroup':
    Controller.updateGroup(argv[3])
    // console.log(argv[3]);
    break;

  case 'deleteGroup':
    Controller.deleteGroup(argv[3])
    break;

//////////////////////
  case 'listContactGroup':
    Controller.readContactGroup(argv[3])
    break;

  case 'addContactGroup':
  // console.log(argv[3]);
    Controller.addContactGroup(argv[3])
    break;

  case 'deleteContactGroup':
    Controller.deleteContactGroup(argv[3])
    break;

  default: console.log('Command not found');

}

/*
Driver Code
---add Contact to Group---
1. node main.js addContactGroup idContact,idGroup
2. node main.js deleteContactGroup idContact,idGroup

---CONTACT---
1. addContact = node main.js addContact name,company,phone,email
2. listContact = node main.js listContact
3. updateContact = node main.js updateContact column,value,id
4. deleteContact = node main.js deleteContact id
---GROUP---
1. addGroup = node main.js addGroup name
2. listGroup = node main.js listGroup
3. updateGroup = node main.js updateGroup value,id
4. deleteGroup = node main.js deleteGroup id

*/
