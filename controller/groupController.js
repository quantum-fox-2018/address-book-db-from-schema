const Group = require('../model/group.js');
const Contact = require('../model/contact.js');
//const View = require('../view.js');

class GroupController{
  static Command(param_command, cbResult){
    let command = param_command[3];

    if(param_command[4] != undefined && param_command[4] != ''){
      let groupObj = JSON.parse(param_command[4]);
      var group = new Group(groupObj); // pake var biar bisa di akses di bawah
      // console.log(contact);
      if(param_command[5] != undefined && param_command[5] != ''){
        let contactObj = JSON.parse(param_command[5]);
        var contact = new Contact(contactObj);
      }

    }

    switch (command) {
      case 'show':
      case 'Show':
      case undefined:
        Group.show((results) => {
          cbResult(results);
        })
        break;

      case 'add':
        group.save((results) =>{
          cbResult(results);
        })

        break;

      case 'addContact':
        group.addContact(contact, (results) =>{
          cbResult(results);
        })
        break;

      case 'deleteContact':
      case 'delContact':
        group.deleteContact(contact, (results) =>{
          cbResult(results);
        })
        break;

      case 'showContact':
        group.showContact((results) => {
          cbResult(results);
        })
        break;

      case 'update':
        group.update((results) => {
          cbResult(results);
        })
        break;

      case 'delete':
        group.delete((results) => {
          cbResult(results);
        })
        break;

      default:
        cbResult(`${command} is not in the Program`)
    }
  }
}

module.exports = GroupController;

//'{"name":"Bekasi"}'
